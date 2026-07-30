import os
import re
import shutil
from collections import defaultdict
from flask import Flask, request, jsonify, render_template_string, redirect, url_for, send_from_directory

app = Flask(__name__)
app.config['SECRET_KEY'] = 'una-clave-secreta-muy-segura'

CLIPS_DIR = '0. Clips'
OTROS_DIR = '1. Otros'
app_data = {
    'final_selections': {'stage1': {}, 'stage2': {}},
    'clips_data': defaultdict(lambda: defaultdict(list)),
    'all_groups': []
}

def prepare_data():
    if not os.path.exists(CLIPS_DIR):
        app_data['clips_data'] = defaultdict(lambda: defaultdict(list))
        app_data['all_groups'] = []
        return False
    pattern = re.compile(r'(\d{3})_(\d+\.\d+)_(\d+\.\d+)_([A-D])([1-4])\.mp4')
    files = sorted(os.listdir(CLIPS_DIR))
    clips_by_time = defaultdict(lambda: defaultdict(list))
    for filename in files:
        match = pattern.match(filename)
        if match:
            scene, inicio, fin, letter, version = match.groups()
            group_id = f"{scene}_{inicio}_{fin}"
            clips_by_time[group_id][letter].append(filename)
    clips_data = defaultdict(lambda: defaultdict(list))
    all_groups = []
    for group_id in sorted(clips_by_time.keys()):
        for letter in sorted(clips_by_time[group_id].keys()):
            clips_data[group_id][letter] = sorted(clips_by_time[group_id][letter])
            all_groups.append(f"{group_id}_{letter}")
    app_data['clips_data'] = clips_data
    app_data['all_groups'] = all_groups
    return True

@app.route('/')
def index():
    if not prepare_data():
        return render_template_string(HTML_TEMPLATE, stage='empty')
    clips_data = app_data['clips_data']
    all_groups = app_data['all_groups']
    final_selections = app_data['final_selections']
    stage1_selections = final_selections['stage1']
    current_group_idx = 0
    while current_group_idx < len(all_groups):
        group_key = all_groups[current_group_idx]
        if group_key not in stage1_selections:
            break
        current_group_idx += 1
    else:
        return redirect(url_for('review'))
    if not all_groups:
        return render_template_string(HTML_TEMPLATE, stage='empty')
    parts = all_groups[current_group_idx].split('_')
    scene = parts[0]
    inicio = parts[1]
    fin = parts[2]
    letter = parts[3]
    group_id = f"{scene}_{inicio}_{fin}"
    current_clips = clips_data.get(group_id, {}).get(letter, [])
    return render_template_string(HTML_TEMPLATE, 
        stage='stage1',
        group_key=f"{scene}_{inicio}_{fin}_{letter}",
        clips=current_clips,
        progress_current=current_group_idx + 1,
        progress_total=len(all_groups)
    )

@app.route('/review')
def review():
    if not prepare_data():
        return redirect(url_for('index'))
    final_selections = app_data['final_selections']
    stage1_selections = final_selections['stage1']
    scenes_for_review = set()
    for group_key in stage1_selections.keys():
        parts = group_key.split('_')
        if len(parts) >= 4:
            scene_id = f"{parts[0]}_{parts[1]}_{parts[2]}"
            scenes_for_review.add(scene_id)
    groups_for_review = sorted(list(scenes_for_review))
    current_review_idx = 0
    while current_review_idx < len(groups_for_review):
        group_key = groups_for_review[current_review_idx]
        if group_key not in final_selections['stage2']:
            break
        current_review_idx += 1
    else:
        return redirect(url_for('summary'))
    if not groups_for_review:
        return redirect(url_for('index'))
    scene_key = groups_for_review[current_review_idx]
    clips_to_review = []
    for selection_key, selected_clip in stage1_selections.items():
        if selection_key.startswith(scene_key):
            clips_to_review.append(selected_clip)
    return render_template_string(HTML_TEMPLATE, 
        stage='stage2',
        group_key=scene_key,
        clips=clips_to_review,
        progress_current=current_review_idx + 1,
        progress_total=len(groups_for_review)
    )

@app.route('/summary')
def summary():
    final_selections = app_data['final_selections']
    stage2_selections = final_selections['stage2']
    stage1 = final_selections['stage1']
    scene_count = len({'_'.join(key.split('_')[:3]) for key in stage1.keys()})
    if len(stage2_selections) != scene_count and scene_count > 0:
        return redirect(url_for('index'))
    selected_clips = sorted(list(stage2_selections.values()))
    return render_template_string(HTML_TEMPLATE, 
        stage='summary',
        clips=selected_clips
    )

@app.route('/clips/<path:filename>')
def serve_clip(filename):
    clips_dir_abs = os.path.abspath(CLIPS_DIR)
    return send_from_directory(clips_dir_abs, filename)

@app.route('/select', methods=['POST'])
def select_clip():
    data = request.json
    stage = data.get('stage')
    group = data.get('group')
    clip = data.get('clip')
    final_selections = app_data['final_selections']
    if stage not in final_selections:
        final_selections[stage] = {}
    final_selections[stage][group] = clip
    return jsonify({'status': 'ok'})

@app.route('/move_others', methods=['POST'])
def move_others():
    if not os.path.exists(CLIPS_DIR):
        return jsonify({'status': 'error', 'message': 'No hay clips.'}), 400
    stage2_selections = app_data['final_selections']['stage2']
    if not stage2_selections:
        return jsonify({'status': 'error', 'message': 'No hay selecciones finales.'}), 400
    os.makedirs(OTROS_DIR, exist_ok=True)
    all_clips_in_dir = {f for f in os.listdir(CLIPS_DIR) if f.endswith('.mp4')}
    selected_clips = set(stage2_selections.values())
    clips_to_move = all_clips_in_dir - selected_clips
    moved_count = 0
    for clip in clips_to_move:
        try:
            shutil.move(os.path.join(CLIPS_DIR, clip), os.path.join(OTROS_DIR, clip))
            moved_count += 1
        except Exception:
            pass
    return jsonify({'status': 'ok', 'message': f'Se movieron {moved_count} archivos a la carpeta "{OTROS_DIR}".'})

@app.route('/restart', methods=['POST'])
def restart():
    final_selections = app_data['final_selections']
    final_selections['stage1'].clear()
    final_selections['stage2'].clear()
    return redirect(url_for('index'))

HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Selección de Clips</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; background-color: #121212; color: #e0e0e0; margin: 0; padding: 2em; text-align: center; }
        h1, h2 { font-weight: 300; }
        .progress-bar { width: 80%; max-width: 800px; background-color: #444; border-radius: 5px; margin: 1em auto; overflow: hidden; }
        .progress-bar-inner { height: 10px; width: 0; background-color: #4CAF50; transition: width 0.3s ease; }
        .container { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-top: 2em; }
        .video-wrapper { border: 4px solid transparent; cursor: pointer; transition: all 0.2s ease-in-out; border-radius: 10px; overflow: hidden; background-color: #222; }
        .video-wrapper:hover { border-color: #03a9f4; transform: scale(1.05); }
        video { display: block; width: 240px; height: 426px; object-fit: cover; }
        .info { margin-top: 1em; font-size: 1.2em; color: #aaa; }
        .button { background-color: #f44336; color: white; border: none; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 20px 2px; cursor: pointer; border-radius: 8px; transition: background-color 0.3s; }
        .button:hover { background-color: #d32f2f; }
        .restart-button { background-color: #ff9800; }
        .restart-button:hover { background-color: #f57c00; }
        .summary-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; }
        .summary-wrapper { border: 2px solid #4CAF50; border-radius: 10px; overflow: hidden; }
        .topnav { text-align: right; margin-bottom: 10px; }
        .link { color: #03a9f4; text-decoration: none; }
        .link:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="topnav"></div>
    <h1>Selector de Clips de Video</h1>
    {% if stage == 'stage1' %}
        <h2>Fase 1: Selecciona la mejor versión para el grupo {{ group_key }}</h2>
        <div class="progress-bar">
            <div class="progress-bar-inner" style="width: {{ (progress_current / progress_total) * 100 }}%;"></div>
        </div>
        <p class="info">Progreso: {{ progress_current }} de {{ progress_total }}</p>
        <div class="container">
            {% for clip in clips %}
            <div class="video-wrapper" onclick="selectClip('{{ clip }}', '{{ group_key }}', 'stage1')">
                <video src="{{ url_for('serve_clip', filename=clip) }}" autoplay muted loop playsinline></video>
            </div>
            {% endfor %}
        </div>
        <form action="{{ url_for('restart') }}" method="post" style="margin-top: 3em;">
            <button type="submit" class="button restart-button">Reiniciar Selección</button>
        </form>
    {% elif stage == 'stage2' %}
        <h2>Fase 2: Selecciona el mejor clip para la escena {{ group_key }}</h2>
        <div class="progress-bar">
            <div class="progress-bar-inner" style="width: {{ (progress_current / progress_total) * 100 }}%;"></div>
        </div>
        <p class="info">Progreso: {{ progress_current }} de {{ progress_total }}</p>
        <div class="container">
            {% for clip in clips %}
            <div class="video-wrapper" onclick="selectClip('{{ clip }}', '{{ group_key }}', 'stage2')">
                <video src="{{ url_for('serve_clip', filename=clip) }}" autoplay muted loop playsinline></video>
            </div>
            {% endfor %}
        </div>
        <form action="{{ url_for('restart') }}" method="post" style="margin-top: 3em;">
            <button type="submit" class="button restart-button">Reiniciar Selección</button>
        </form>
    {% elif stage == 'summary' %}
        <h2>Resumen Final: Clips Seleccionados</h2>
        <div class="container summary-grid">
            {% for clip in clips %}
            <div class="summary-wrapper">
                <video src="{{ url_for('serve_clip', filename=clip) }}" controls loop></video>
            </div>
            {% endfor %}
        </div>
        <button class="button" onclick="moveFiles()">Mover Clips No Seleccionados</button>
        <form action="{{ url_for('restart') }}" method="post" style="margin-top: 3em;">
            <button type="submit" class="button restart-button">Reiniciar Selección</button>
        </form>
    {% elif stage == 'empty' %}
        <h2>No se encontraron clips</h2>
        <p>Asegúrate de que los clips generados estén en "0. Clips" y vuelve a intentarlo.</p>
        <form action="{{ url_for('restart') }}" method="post" style="margin-top: 3em;">
            <button type="submit" class="button restart-button">Reiniciar Selección</button>
        </form>
    {% endif %}
    <script>
        function selectClip(clipName, groupKey, stage) {
            fetch('/select', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ clip: clipName, group: groupKey, stage: stage })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    window.location.reload();
                }
            });
        }
        function moveFiles() {
            if (confirm('¿Estás seguro de que quieres mover todos los videos no seleccionados a la carpeta "1. Otros"? Esta acción no se puede deshacer.')) {
                fetch('/move_others', { method: 'POST' })
                .then(response => response.json())
                .then(data => {
                    alert(data.message);
                    window.location.reload();
                });
            }
        }
    </script>
</body>
</html>
"""

if __name__ == '__main__':
    if not os.path.exists(CLIPS_DIR):
        os.makedirs(CLIPS_DIR)
    print("Servidor iniciado. Abre http://127.0.0.1:5000 en tu navegador.")
    app.run(debug=True, host='0.0.0.0', port=5000)