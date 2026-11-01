#!/usr/bin/env python3
"""python3 build.py [config.js] [out.html]  -> inlines assets/logos + assets/icons as JS maps and the video config into engine.tpl.html"""
import sys, os, re, json, glob
cfg = sys.argv[1] if len(sys.argv) > 1 else 'config.js'; out = sys.argv[2] if len(sys.argv) > 2 else 'scene.html'
def clean(s): return re.sub(r'\s+', ' ', re.sub(r'<\?xml.*?\?>', '', s)).strip()
def svg(p, mono_stroke=False):
    s = clean(open(p).read()); root = re.search(r'<svg\b[^>]*>', s).group(0)
    new = re.sub(r'\s(width|height|style|class)="[^"]*"', '', root); return s.replace(root, new, 1)
logos = {os.path.basename(p)[:-4]: svg(p) for p in glob.glob('assets/logos/*.svg')}
icons = {os.path.basename(p)[:-4]: svg(p) for p in glob.glob('assets/icons/*.svg')}
tpl = open('engine.tpl.html').read().replace('/*__ASSETS__*/', json.dumps({'logos': logos, 'icons': icons}))
here = os.path.dirname(os.path.abspath(__file__)); bp = os.path.join(here, 'builders.js'); mp = os.path.join(here, 'motion.js'); bp2 = os.path.join(here, 'builders2.js')
tpl = tpl.replace('/*__MOTION__*/', open(mp).read() if os.path.exists(mp) else '')
tpl = tpl.replace('/*__BUILDERS__*/', (open(bp).read() if os.path.exists(bp) else '') + '\n' + (open(bp2).read() if os.path.exists(bp2) else ''))
tpl = tpl.replace('/*__CONFIG__*/', open(cfg).read()); open(out, 'w').write(tpl); print('built', out, len(tpl), 'logos', len(logos), 'icons', len(icons))
