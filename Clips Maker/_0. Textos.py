import re
from openai import OpenAI

guion_prompt = open("_0. Prompts/0. Guion.txt", encoding="utf-8").read()
prompt_titulo = open("_0. Prompts/1. Titulo.txt", encoding="utf-8").read()
prompt_descripcion = open("_0. Prompts/2. Descripcion.txt", encoding="utf-8").read()
prompt_etiquetas = open("_0. Prompts/3. Etiquetas.txt", encoding="utf-8").read()

openai = OpenAI(base_url="http://localhost:11434/v1", api_key="temp")

def chat(mensaje, reemplazos):
    for k, v in reemplazos.items():
        mensaje = mensaje.replace(k, v)
    return openai.chat.completions.create(
        model="gemma3:4b-it-qat",
        messages=[{"role": "user", "content": mensaje}]
    ).choices[0].message.content.strip()

def limpiar_linea(texto):
    texto = re.sub(r'["\'`´¨\n\*]', '', ' '.join(texto.split())).rstrip('.').strip()
    return texto

tema = open("1. Tema.txt", encoding="utf-8").read().strip()

guion = chat(guion_prompt, {"{tema}": tema}).replace("*", "")
with open("2. Guion.txt", "w", encoding="utf-8") as f:
    f.write(guion)

titulo = chat(prompt_titulo, {"{guion}": guion})
titulo = limpiar_linea(titulo)
with open("3. Titulo.txt", "w", encoding="utf-8") as f:
    f.write(titulo)

descripcion = chat(prompt_descripcion, {"{titulo}": titulo, "{guion}": guion}).replace("*", "")
with open("4. Descripción.txt", "w", encoding="utf-8") as f:
    f.write(descripcion)

etiquetas = chat(prompt_etiquetas, {"{titulo}": titulo, "{guion}": guion})
etiquetas = limpiar_linea(etiquetas)
with open("5. Etiquetas.txt", "w", encoding="utf-8") as f:
    f.write(etiquetas)