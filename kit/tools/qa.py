#!/usr/bin/env python3
"""python3 tools/qa.py out.mp4 -> checks: size 1080x1920, no audio, bottom half is flat bg, static holds longer than 4 s (this format holds ~2-4 s while the narrator talks; longer needs an idle move), and writes pv/final.png (1 frame / 2 s, top half)."""
import subprocess, sys, os, numpy as np, json
v = sys.argv[1]; os.makedirs('pv', exist_ok=True)
pr = json.loads(subprocess.run(['ffprobe', '-v', 'error', '-show_streams', '-of', 'json', v], capture_output=True, text=True).stdout)
vs = [s for s in pr['streams'] if s['codec_type'] == 'video'][0]; au = [s for s in pr['streams'] if s['codec_type'] == 'audio']
print('size', vs['width'], 'x', vs['height'], '| audio streams:', len(au), '(must be 0)')
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', v, '-vf', 'fps=10,scale=270:480,format=gray', '-f', 'rawvideo', '-'], capture_output=True).stdout
f = np.frombuffer(raw, np.uint8).reshape(-1, 480, 270).astype(float)
bot = f[:, 240:, :]; print('bottom half: min %.0f max %.0f (flat if equal)' % (bot.min(), bot.max()))
d = np.abs(np.diff(f[:, :240, :], axis=0)).mean(axis=(1, 2)); still = 0; flagged = []
for i, x in enumerate(d):
    still = still + 1 if x < 0.02 else 0
    if still == 41: flagged.append(round((i - 40) / 10, 1))
print('static holds > 4 s start at (s):', flagged or 'none')
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', v, '-vf', 'fps=1/2,crop=1080:960:0:0,scale=270:240,tile=6x4', '-frames:v', '1', 'pv/final.png'])
