import gc
import torch
import csv
import os
from transformers import pipeline
from openai import OpenAI

escena_prompt = open("_0. Prompts/4. Escena.txt", encoding="utf-8").read()

openai = OpenAI(base_url="http://localhost:11434/v1", api_key="temp")

def chat(mensaje, reemplazos):
    for k, v in reemplazos.items():
        mensaje = mensaje.replace(k, v)
    return openai.chat.completions.create(
        model="gemma3:4b-it-qat",
        messages=[{"role": "user", "content": mensaje}]
    ).choices[0].message.content.strip()

def convertir_a_formato_srt(t):
    ms = int(t * 1000)
    h = ms // 3600000
    ms %= 3600000
    m = ms // 60000
    ms %= 60000
    s = ms // 1000
    ms %= 1000
    return f"{h:02}:{m:02}:{s:02},{ms:03}"

def srt_a_segundos(t):
    h, m, s = t.split(":")
    s, ms = s.split(",")
    return int(h) * 3600 + int(m) * 60 + int(s) + int(ms) / 1000

def generar_subtitulos_srt(palabras, ruta_srt):
    with open(ruta_srt, "w", encoding="utf-8") as f:
        i = 1
        for p in palabras:
            inicio = convertir_a_formato_srt(p["start"])
            fin = convertir_a_formato_srt(p["end"])
            f.write(f"{i}\n{inicio} --> {fin}\n{p['word']}\n\n")
            i += 1

def extraer_palabras(audio_path):
    device = "cuda:0" if torch.cuda.is_available() else "cpu"
    dtype = torch.float16 if torch.cuda.is_available() else torch.float32
    asr = pipeline(
        "automatic-speech-recognition",
        model="openai/whisper-large-v3",
        torch_dtype=dtype,
        device=device
    )
    resp = asr(audio_path, return_timestamps="word", generate_kwargs={"language": "es"})
    palabras = []
    for c in resp.get("chunks", []):
        text = c.get("text", "").strip()
        ts = c.get("timestamp")
        if not text or not ts:
            continue
        start, end = ts
        palabras.append({"word": text, "start": float(start), "end": float(end)})
    del asr
    if torch.cuda.is_available():
        torch.cuda.empty_cache()
    gc.collect()
    return palabras

def leer_palabras_de_srt(ruta_srt):
    palabras = []
    with open(ruta_srt, encoding="utf-8") as f:
        lineas = f.readlines()
    i = 0
    while i < len(lineas):
        if lineas[i].strip().isdigit():
            tiempo = lineas[i+1].strip()
            texto = lineas[i+2].strip()
            inicio_str, fin_str = tiempo.split(" --> ")
            inicio = srt_a_segundos(inicio_str)
            fin = srt_a_segundos(fin_str)
            palabras.append({"word": texto, "start": inicio, "end": fin})
            i += 4
        else:
            i += 1
    return palabras

def generar_segmentos_desde_palabras(palabras, dur_seg=6.5):
    segmentos = []
    temp = []
    inicio = 0.0
    for idx, p in enumerate(palabras):
        if idx == 0:
            inicio = 0.0
        elif not temp:
            inicio = p["start"]
        temp.append(p)
        if p["end"] - inicio >= dur_seg:
            txt = " ".join(w["word"] for w in temp)
            segmentos.append((inicio, p["end"], txt))
            temp = []
    if temp:
        txt = " ".join(w["word"] for w in temp)
        fin = temp[-1]["end"]
        segmentos.append((inicio, fin, txt))
    return segmentos

ruta_guion = "2. Guion.txt"
ruta_titulo = "3. Titulo.txt"
ruta_audio = "7. Voz.mp3"
ruta_srt = "8. Subtitulos.srt"
ruta_escenas = "9. Escenas.csv"

with open(ruta_guion, encoding="utf-8") as f: guion = f.read().strip()
with open(ruta_titulo, encoding="utf-8") as f: titulo = f.read().strip()

if os.path.exists(ruta_srt):
    palabras = leer_palabras_de_srt(ruta_srt)
else:
    palabras = extraer_palabras(ruta_audio)
    generar_subtitulos_srt(palabras, ruta_srt)

segmentos = generar_segmentos_desde_palabras(palabras)

filas_escenas = []
for ini, fin, sub in segmentos:
    variables = {"{subtitulos}": sub.strip(), "{titulo}": titulo, "{guion}": guion}
    escena_a = chat(escena_prompt, variables)
    escena_b = chat(escena_prompt, variables)
    escena_c = chat(escena_prompt, variables)
    escena_d = chat(escena_prompt, variables)
    filas_escenas.append({
        "Inicio": round(ini, 3),
        "Final": round(fin, 3),
        "Subtitulos": sub.strip(),
        "Escena A": escena_a,
        "Escena B": escena_b,
        "Escena C": escena_c,
        "Escena D": escena_d
    })

with open(ruta_escenas, "w", encoding="utf-8", newline="") as f:
    fieldnames = ["Inicio", "Final", "Subtitulos", "Escena A", "Escena B", "Escena C", "Escena D"]
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(filas_escenas)