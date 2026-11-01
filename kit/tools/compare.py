#!/usr/bin/env python3
"""Side-by-side fidelity check against a reference video.
usage: python3 tools/compare.py reference.mp4 out.png  ref_t:our_t [ref_t:our_t ...]   (run inside the project dir that has scene.html)
Left = reference top half (720x640), right = our render of the same moment. Look at box edges, shadow, label size, icon style."""
import sys, os, glob, subprocess
from playwright.sync_api import sync_playwright
from PIL import Image, ImageDraw
ref, out = sys.argv[1], sys.argv[2]; pairs = [tuple(map(float, x.split(':'))) for x in sys.argv[3:]]
def launch(p):
    for pat in ('/opt/pw-browsers/chromium-*/chrome-linux/chrome', '/opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell'):
        g = glob.glob(pat)
        if g: return p.chromium.launch(executable_path=g[0])
    return p.chromium.launch()
rows = []
with sync_playwright() as p:
    b = launch(p); pg = b.new_page(viewport={'width': 1080, 'height': 960}); pg.goto('file://' + os.path.abspath('scene.html'))
    pg.evaluate('Promise.all([...document.fonts].map(f=>f.load()))'); os.makedirs('pv', exist_ok=True)
    for rt, ot in pairs:
        subprocess.run(['ffmpeg', '-y', '-v', 'error', '-ss', str(rt), '-i', ref, '-frames:v', '1', '-vf', 'crop=iw:ih/2:0:0,scale=540:480', 'pv/ref.png'], check=True)
        pg.evaluate('t=>window.seek(t)', ot); pg.screenshot(path='pv/our.png')
        a = Image.open('pv/ref.png').convert('RGB'); o = Image.open('pv/our.png').convert('RGB').resize((540, 480))
        row = Image.new('RGB', (1090, 480), 'white'); row.paste(a, (0, 0)); row.paste(o, (550, 0)); ImageDraw.Draw(row).text((6, 462), f'ref {rt}  |  ours {ot}', fill=(255, 0, 0)); rows.append(row)
    b.close()
sheet = Image.new('RGB', (1090, 480 * len(rows)), 'white')
for i, r in enumerate(rows): sheet.paste(r, (0, i * 480))
sheet.save(out)
