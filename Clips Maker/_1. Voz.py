import os
import wave
from io import BytesIO
from pydub import AudioSegment, effects
from pydub.effects import compress_dynamic_range
import google.generativeai as genai

genai.configure(api_key=os.environ["GEMINI_API_KEY"])
modelo_tts = genai.GenerativeModel('gemini-2.5-flash-preview-tts')

def generar_audio_desde_texto(guion: str) -> AudioSegment:
    configuracion_tts = {
        "response_modalities": ["AUDIO"],
        "speech_config": {
            "voice_config": {
                "prebuilt_voice_config": {
                    "voice_name": "Algieba"
                }
            }
        }
    }
    respuesta = modelo_tts.generate_content(
        contents="Lee en voz alta en español neutro con un tono cálido y amigable: " + guion,
        generation_config=configuracion_tts
    )
    datos = respuesta.candidates[0].content.parts[0].inline_data.data
    buffer = BytesIO()
    with wave.open(buffer, "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(24000)
        wf.writeframes(datos)
    buffer.seek(0)
    return AudioSegment.from_wav(buffer)

def procesar_audio(audio: AudioSegment) -> AudioSegment:
    audio = compress_dynamic_range(audio, threshold=-30.0, ratio=1.0, attack=5.0, release=100.0)
    return effects.normalize(audio, headroom=0.01).apply_gain(3)

ruta_guion_txt = "2. Guion.txt"
ruta_crudo_wav = "6. Crudo.wav"
ruta_crudo_mp3 = "6. Crudo.mp3"
ruta_voz_mp3 = "7. Voz.mp3"

audio = None

if os.path.exists(ruta_crudo_wav):
    audio = AudioSegment.from_wav(ruta_crudo_wav)
elif os.path.exists(ruta_crudo_mp3):
    audio = AudioSegment.from_mp3(ruta_crudo_mp3)
    audio.export(ruta_crudo_wav, format="wav", bitrate="128k")
elif os.path.exists(ruta_guion_txt):
    with open(ruta_guion_txt, encoding="utf-8") as f:
        guion = f.read().strip()
    audio = generar_audio_desde_texto(guion)
    audio.export(ruta_crudo_wav, format="wav", bitrate="128k")

if audio is None:
    audio = AudioSegment.from_wav(ruta_crudo_wav)

audio_procesado = procesar_audio(audio)
audio_procesado.export(ruta_voz_mp3, format="mp3", bitrate="128k")