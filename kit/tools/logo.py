#!/usr/bin/env python3
"""Pull ACCURATE official logos for tech tools.
usage: python3 tools/logo.py docker kubernetes terraform ... [--out assets/logos] [--cache ~/.cache/ttd-logos]
For every name it writes into --out:
  <slug>.svg        mono official mark, filled with the official brand hex (simple-icons, viewBox 0 0 24 24)
  <slug>.color.svg  multi-colour official mark when devicon has one (use for chrome, safari, firefox, grpc ...)
and prints one JSON line with: slug, title, hex, tile recommendation, source and guideline urls.
Sources (cloned sparse from GitHub, which the sandbox can reach): simple-icons (icons + data), devicon, lobe-icons.
Nothing is redrawn or edited; marks are the sources' own paths. Brand colours come from the source data, with the
TILE table below for tools whose official 'app icon' is a coloured square (measured from the reference video)."""
import sys, os, re, json, subprocess, difflib, argparse
ap = argparse.ArgumentParser(); ap.add_argument('names', nargs='+'); ap.add_argument('--out', default='assets/logos')
ap.add_argument('--cache', default=os.path.expanduser('~/.cache/ttd-logos')); a = ap.parse_args()
os.makedirs(a.cache, exist_ok=True); os.makedirs(a.out, exist_ok=True)
def clone(name, url, paths):
    d = os.path.join(a.cache, name)
    if not os.path.isdir(d):
        subprocess.run(['git', 'clone', '-q', '--depth', '1', '--filter=blob:none', '--sparse', url, d], check=True)
        subprocess.run(['git', '-C', d, 'sparse-checkout', 'set', *paths], check=True)
    return d
SI = clone('si', 'https://github.com/simple-icons/simple-icons.git', ['icons', 'data'])
DV = clone('dv', 'https://github.com/devicons/devicon.git', ['icons'])
LB = clone('lobe', 'https://github.com/lobehub/lobe-icons.git', ['packages/static-svg/icons'])
data = json.load(open(os.path.join(SI, 'data/simple-icons.json')))
def slugify(t): return re.sub(r'[^a-z0-9]', '', t.lower().replace('+', 'plus').replace('.', 'dot').replace('&', 'and'))
by_slug = {}
for e in data:
    s = e.get('slug') or slugify(e['title']); by_slug[s] = e
    for k in (e.get('aliases', {}).get('aka', []) or []): by_slug.setdefault(slugify(k), e)
ALIAS = {'k8s': 'kubernetes', 'postgres': 'postgresql', 'golang': 'go', 'chrome': 'googlechrome', 'mongo': 'mongodb', 'js': 'javascript',
         'ts': 'typescript', 'gcp': 'googlecloud', 'vscode': 'visualstudiocode', 'edge': 'microsoftedge', 'aws': 'amazonwebservices'}
# tile = how the logo sits in a 286u box. 'white': official-colour glyph on a white tile. 'brand': white glyph on a brand-colour tile.
TILE = {'docker': ('white', '#1D63ED'), 'kubernetes': ('white', '#326CE5'), 'terraform': ('brand', '#5C4EE5'),
        'ansible': ('brand', '#1A1918'), 'grpc': ('brand', '#244C5A')}
FIT = {'docker': .86, 'kubernetes': .75}   # glyph longest side as a fraction of the 286u box (measured in the reference); default .72
def lum(h):
    r, g, b = [int(h.lstrip('#')[i:i+2], 16) / 255 for i in (0, 2, 4)]; return .2126 * r + .7152 * g + .0722 * b
for raw in a.names:
    n = ALIAS.get(raw.lower(), raw.lower()); slug = slugify(n); info = {'query': raw}
    e = by_slug.get(slug); files = []
    if e:
        sp = os.path.join(SI, 'icons', (e.get('slug') or slugify(e['title'])) + '.svg')
        if os.path.exists(sp):
            d = re.search(r'<path d="([^"]+)"', open(sp).read()).group(1)
            hexc = '#' + e['hex']; tile = TILE.get(slug) or (('brand', hexc) if lum(hexc) < .25 else ('white', hexc))
            svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="{hexc}"><title>{e["title"]}</title><path d="{d}"/></svg>'
            open(os.path.join(a.out, slug + '.svg'), 'w').write(svg); files.append(slug + '.svg')
            info.update(slug=slug, title=e['title'], hex=hexc, tile={'style': tile[0], 'color': tile[1], 'fit': FIT.get(slug, .72)}, source=e.get('source'), guidelines=e.get('guidelines'))
    for dn in dict.fromkeys([slug, n, raw.lower()]):  # devicon colour version
        for suf in ('original', 'plain'):
            p = os.path.join(DV, 'icons', dn, f'{dn}-{suf}.svg')
            if os.path.exists(p):
                open(os.path.join(a.out, slug + '.color.svg'), 'w').write(open(p).read()); files.append(slug + '.color.svg'); break
        if slug + '.color.svg' in files: break
    if not files:  # lobe-icons (AI brands)
        for suf in ('-color', ''):
            p = os.path.join(LB, 'packages/static-svg/icons', n + suf + '.svg')
            if os.path.exists(p):
                open(os.path.join(a.out, slug + '.svg'), 'w').write(open(p).read()); files.append(slug + '.svg'); info.update(slug=slug, source='lobe-icons'); break
    if not files:
        info.update(error='not found', did_you_mean=difflib.get_close_matches(slug, list(by_slug), 5))
    info['files'] = files; print(json.dumps(info))
