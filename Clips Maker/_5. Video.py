import re
import subprocess
from pathlib import Path
import tempfile
import os

def segundos_a_ass(t: float) -> str:
    horas = int(t // 3600)
    minutos = int((t % 3600) // 60)
    segundos = int(t % 60)
    centesimas = int((t - int(t)) * 100)
    return f"{horas:d}:{minutos:02d}:{segundos:02d}.{centesimas:02d}"

def limpiar_texto(texto: str) -> str:
    limpio = re.sub(r'[^\w\s]', '', texto)
    return limpio.upper()

def convertir_srt_a_segundos(t_srt: str) -> float:
    t_srt = t_srt.replace(',', '.')
    h, m, s_ms = t_srt.split(':')
    s, ms = s_ms.split('.')
    return int(h) * 3600 + int(m) * 60 + int(s) + int(ms) / 1000

def leer_srt(ruta_srt: Path):
    subtitulos = []
    if not ruta_srt.exists():
        return subtitulos
    texto = ruta_srt.read_text(encoding='utf-8').strip()
    bloques = texto.split('\n\n')
    for bloque in bloques:
        lineas = bloque.splitlines()
        if len(lineas) >= 3:
            try:
                tiempos = lineas[1].split(' --> ')
                ini = convertir_srt_a_segundos(tiempos[0])
                fin = convertir_srt_a_segundos(tiempos[1])
                txt = lineas[2]
                subtitulos.append((ini, fin, txt))
            except Exception:
                continue
    return subtitulos

def evitar_solapamientos(subs):
    subs_sorted = sorted(subs, key=lambda x: x[0])
    for i in range(len(subs_sorted) - 1):
        fin_actual = subs_sorted[i][1]
        inicio_siguiente = subs_sorted[i + 1][0]
        if fin_actual > inicio_siguiente:
            aux = inicio_siguiente - 0.1
            if aux > subs_sorted[i][0]:
                subs_sorted[i] = (subs_sorted[i][0], aux, subs_sorted[i][2])
    return subs_sorted

def generar_ass(srt_path: Path, ass_path: Path):
    width, height = 1080, 1920
    pos_x = width // 2
    pos_y = int(height * 0.70)
    ass_header = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {width}
PlayResY: {height}

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Impact,110,&H0000FFFF,&H000000FF,&H00000000,&H00000000,0,0,0,0,125,100,0,0,1,8,0,5,10,10,10,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    subs = leer_srt(srt_path)
    subs_ajustados = evitar_solapamientos(subs)
    with open(ass_path, 'w', encoding='utf-8') as f:
        f.write(ass_header)
        for ini, fin, txt in subs_ajustados:
            txt_lim = limpiar_texto(txt)
            ini_ass = segundos_a_ass(ini)
            fin_ass = segundos_a_ass(fin)
            linea = f"Dialogue: 0,{ini_ass},{fin_ass},Default,,0,0,0,,{{\\pos({pos_x},{pos_y})}}{txt_lim}\n"
            f.write(linea)

def escapar_ruta_windows(ruta: Path) -> str:
    ruta_str = str(ruta.resolve())
    if os.name == 'nt':
        ruta_str = ruta_str.replace('\\', '\\\\').replace(':', '\\:')
    return ruta_str

def reescalar_clip(clip_path: Path, output_path: Path, width: int = 1080, height: int = 1920):
    comando = [
        "ffmpeg", "-y",
        "-i", str(clip_path),
        "-vf", f"scale={width}:{height}:force_original_aspect_ratio=decrease,pad={width}:{height}:(ow-iw)/2:(oh-ih)/2,format=yuv420p",
        "-c:v", "libx264",
        "-preset", "ultrafast",
        "-crf", "23",
        "-pix_fmt", "yuv420p",
        "-an",
        str(output_path)
    ]
    subprocess.run(comando, check=True, capture_output=True)

def procesar_video():
    clips_dir = Path("0. Clips")
    voz_mp3 = Path("7. Voz.mp3")
    srt_file = Path("8. Subtitulos.srt")
    output_video = Path("A. Video.mp4")
    
    clips_list = sorted(clips_dir.glob("*.mp4"))
    if not clips_list:
        return
        
    with tempfile.TemporaryDirectory() as temp_dir:
        temp_path = Path(temp_dir)
        clips_reescalados_dir = temp_path / "rescaled_clips"
        clips_reescalados_dir.mkdir()
        lista_txt = temp_path / "clips_list.txt"
        with open(lista_txt, 'w', encoding='utf-8') as f:
            for clip in clips_list:
                output_clip = clips_reescalados_dir / clip.name
                reescalar_clip(clip, output_clip)
                f.write(f"file '{output_clip.resolve().as_posix()}'\n")
        tmp_concat = temp_path / "tmp_concat.mp4"
        comando_concat = [
            "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(lista_txt),
            "-c", "copy", str(tmp_concat)
        ]
        subprocess.run(comando_concat, check=True, capture_output=True)
        ass_path = temp_path / "subtitles.ass"
        generar_ass(srt_file, ass_path)
        ass_ruta_escapada = escapar_ruta_windows(ass_path)
        texto_banner = "Suscríbete a nichonauta\ny crea gratis videos IA"
        font_path = Path("C:/Windows/Fonts/Impact.ttf")
        if not font_path.exists():
            font_path = Path("C:/Windows/Fonts/Arial.ttf")
        font_path_escapada = escapar_ruta_windows(font_path)
        drawtext_filter = (
            f"drawtext=fontfile='{font_path_escapada}':"
            f"text='{texto_banner}':fontcolor=white:fontsize=72:"
            f"box=1:boxcolor=red@0.9:boxborderw=25:x=25:y=25"
        )
        vf_filter = (
            f"fps=30,scale=1080:1920:force_original_aspect_ratio=decrease:flags=bicubic,"
            "crop=1080:1920:0:0,format=yuv420p,"
            f"{drawtext_filter},"
            f"subtitles='{ass_ruta_escapada}'"
        )
        comando_final = [
            "ffmpeg", "-y",
            "-i", str(tmp_concat),
            "-i", str(voz_mp3),
            "-vf", vf_filter,
            "-c:v", "libx264", "-r", "30",
            "-preset", "ultrafast",
            "-crf", "18",
            "-profile:v", "high", "-level:v", "4.2",
            "-c:a", "aac", "-b:a", "128k",
            "-map", "0:v:0", "-map", "1:a:0",
            "-threads", "12",
            "-shortest", str(output_video)
        ]
        subprocess.run(comando_final, check=True, capture_output=True)

def principal():
    clips_dir = Path("0. Clips")
    voz_mp3 = Path("7. Voz.mp3")
    srt_file = Path("8. Subtitulos.srt")
    output_video = Path("A. Video.mp4")
    
    if (not output_video.exists() and 
        clips_dir.is_dir() and 
        list(clips_dir.glob("*.mp4")) and
        voz_mp3.exists() and 
        srt_file.exists()):
        procesar_video()

if __name__ == "__main__":
    principal()