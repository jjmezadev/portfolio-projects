import os
import json
import uuid
import requests
import websocket
import random
from tqdm import tqdm
import concurrent.futures
import threading
import pandas as pd
import math

NODOS = {"pos": "4", "latent": "6", "sampler": "8", "combine": "11"}
ARCHIVO_API = "0. API.json"
SERVIDORES = [
    {"ws": "ws://127.0.0.1:8188/ws", "http": "http://127.0.0.1:8188"}
]
NUM_SERVIDORES = len(SERVIDORES)
servidor_actual = 0
lock_servidor = threading.Lock()

def obtener_servidor():
    global servidor_actual
    with lock_servidor:
        servidor = SERVIDORES[servidor_actual]
        servidor_actual = (servidor_actual + 1) % NUM_SERVIDORES
        return servidor

def generar_clip(prompt_pos, ruta_destino, fotogramas):
    if os.path.exists(ruta_destino) and os.path.getsize(ruta_destino) > 0:
        return True
    try:
        srv = obtener_servidor()
        with open(ARCHIVO_API, "r", encoding="utf-8") as f:
            flujo_trabajo = json.load(f)
        flujo_trabajo[NODOS["pos"]]["inputs"]["text"] = prompt_pos
        flujo_trabajo[NODOS["latent"]]["inputs"]["length"] = fotogramas
        flujo_trabajo[NODOS["sampler"]]["inputs"]["seed"] = random.randint(0, 2**64 - 1)
        flujo_trabajo[NODOS["combine"]]["inputs"]["filename_prefix"] = os.path.splitext(os.path.basename(ruta_destino))[0]
        id_cliente = str(uuid.uuid4())
        ws = websocket.WebSocket()
        ws.connect(f"{srv['ws']}?clientId={id_cliente}")
        requests.post(f"{srv['http']}/prompt", json={"prompt": flujo_trabajo, "client_id": id_cliente})
        while True:
            mensaje = json.loads(ws.recv())
            if mensaje.get("type") == "executed":
                id_prompt = mensaje["data"]["prompt_id"]
                ws.close()
                break
            elif mensaje.get("type") == "execution_error":
                ws.close()
                open(ruta_destino, "wb").write(b"")
                return False
        historial = requests.get(f"{srv['http']}/history/{id_prompt}").json()
        salidas_video = historial.get(id_prompt, {}).get("outputs", {}).get(NODOS["combine"], {})
        for lista_salida in salidas_video.values():
            for info_archivo in (f for f in lista_salida if isinstance(f, dict) and "filename" in f):
                datos = requests.get(f"{srv['http']}/view", params={
                    "filename": info_archivo["filename"],
                    "subfolder": info_archivo.get("subfolder", ""),
                    "type": "output"
                }).content
                with open(ruta_destino, "wb") as f:
                    f.write(datos)
                return True
    except Exception:
        open(ruta_destino, "wb").write(b"")
        return False

def principal():
    escenas_df = pd.read_csv("9. Escenas.csv", encoding="utf-8")
    carpeta_clips = "0. Clips"
    os.makedirs(carpeta_clips, exist_ok=True)
    tareas_pendientes = []
    
    for i, (idx, row) in enumerate(escenas_df.iterrows(), start=1):
        inicio = float(row['Inicio'])
        fin = float(row['Final'])
        fotogramas = max(1, math.ceil((0.5 + fin - inicio) * 12))
        base_nombre = f"{i:03d}_{inicio:.2f}_{fin:.2f}"
        for letra in ['A', 'B', 'C', 'D']:
            for j in ['1', '2', '3', '4']:
                nombre_video = f"{base_nombre}_{letra}{j}.mp4"
                ruta_destino_clip = os.path.join(carpeta_clips, nombre_video)
                if not os.path.exists(ruta_destino_clip) or os.path.getsize(ruta_destino_clip) == 0:
                    tareas_pendientes.append({
                        "prompt_pos": row[f"Escena {letra}"],
                        "ruta_destino": ruta_destino_clip,
                        "fotogramas": fotogramas
                    })
    
    if tareas_pendientes:
        with tqdm(total=len(tareas_pendientes), desc="Clips", leave=True) as barra_progreso:
            with concurrent.futures.ThreadPoolExecutor(max_workers=NUM_SERVIDORES) as ejecutor:
                futuros = [ejecutor.submit(generar_clip, t["prompt_pos"], t["ruta_destino"], t["fotogramas"]) for t in tareas_pendientes]
                for futuro in concurrent.futures.as_completed(futuros):
                    futuro.result()
                    barra_progreso.update(1)

if __name__ == "__main__":
    principal()