#!/usr/bin/env python3
"""python3 render.py scene.html out.mp4  -> top half only (1080x960 captured), padded to 1080x1920 with the bg colour; NO audio.
Resumable: existing frames/*.jpg are skipped. Launch detached:  (setsid nohup python3 render.py scene.html out.mp4 > render.log 2>&1 < /dev/null &)"""
import os, sys, glob, subprocess
from playwright.sync_api import sync_playwright
FPS = 30; HTML = os.path.abspath(sys.argv[1]); OUT = sys.argv[2]
def launch(p):
    for pat in ('/opt/pw-browsers/chromium-*/chrome-linux/chrome', '/opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell'):
        g = glob.glob(pat)
        if g: return p.chromium.launch(executable_path=g[0])
    return p.chromium.launch()
os.makedirs('frames', exist_ok=True)
with sync_playwright() as p:
    b = launch(p); pg = b.new_page(viewport={'width': 1080, 'height': 960}); pg.goto('file://' + HTML)
    pg.on('pageerror', lambda e: print('PAGE ERROR', e))
    pg.evaluate('Promise.all([...document.fonts].map(f=>f.load()))'); dur = pg.evaluate('window.DURATION'); n = round(dur * FPS)
    for i in range(n):
        f = f'frames/{i:05d}.jpg'
        if os.path.exists(f) and os.path.getsize(f) > 5000: continue
        pg.evaluate('t=>window.seek(t)', i / FPS); pg.screenshot(path=f, type='jpeg', quality=95)
        if i % 150 == 0: print('frame', i, '/', n, flush=True)
    b.close()
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-framerate', str(FPS), '-i', 'frames/%05d.jpg', '-vf', 'pad=1080:1920:0:0:color=0xF7F5EF,format=yuv420p',
                '-an', '-c:v', 'libx264', '-crf', '16', '-movflags', '+faststart', OUT], check=True)
print('done', OUT, n, 'frames', flush=True)
