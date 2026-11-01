#!/usr/bin/env python3
"""python3 preview.py out.png t1 t2 ...  -> contact sheet (3 columns) of the top half at the given times; prints page errors"""
import sys, glob, os
from playwright.sync_api import sync_playwright
from PIL import Image, ImageDraw
out = sys.argv[1]; times = [float(x) for x in sys.argv[2:]]
def launch(p):
    for pat in ('/opt/pw-browsers/chromium-*/chrome-linux/chrome', '/opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell'):
        g = glob.glob(pat)
        if g: return p.chromium.launch(executable_path=g[0])
    return p.chromium.launch()
os.makedirs('pv', exist_ok=True); ims = []
with sync_playwright() as p:
    b = launch(p); pg = b.new_page(viewport={'width': 1080, 'height': 960})
    pg.on('pageerror', lambda e: print('PAGE ERROR', e)); pg.on('console', lambda m: print('console:', m.text))
    pg.goto('file://' + os.path.abspath('scene.html')); pg.evaluate('Promise.all([...document.fonts].map(f=>f.load()))')
    for t in times:
        pg.evaluate('t=>window.seek(t)', t); pg.screenshot(path='pv/tmp.png')
        im = Image.open('pv/tmp.png').convert('RGB').resize((540, 480)); ImageDraw.Draw(im).text((6, 462), f't={t}', fill=(255, 0, 0)); ims.append(im)
    b.close()
cols = 3; rows = (len(ims) + cols - 1) // cols; sheet = Image.new('RGB', (540 * cols, 480 * rows), 'white')
for i, im in enumerate(ims): sheet.paste(im, ((i % cols) * 540, (i // cols) * 480))
sheet.save(out)
