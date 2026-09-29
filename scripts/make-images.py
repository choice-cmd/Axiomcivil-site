"""Regenerate favicon PNGs and the social share image (public/og.png) from the SVG logo.
Run: python3 scripts/make-images.py   (needs: pip install playwright && playwright install chromium)"""
from pathlib import Path
from playwright.sync_api import sync_playwright
root = Path(__file__).resolve().parent.parent
pub = root / 'public'
fav = (pub / 'favicon.svg').read_text()
mark = (pub / 'brand' / 'axiom-mark-dark.svg').read_text()
word = (pub / 'brand' / 'axiom-horizontal-dark.svg').read_text()
og = f"""<html><body style="margin:0;width:1200px;height:630px;background:#070A10;font-family:sans-serif;position:relative;overflow:hidden">
<div style="position:absolute;inset:0;background-image:linear-gradient(rgba(51,227,240,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(51,227,240,.05) 1px,transparent 1px);background-size:40px 40px"></div>
<div style="position:absolute;right:-60px;top:90px;width:640px;opacity:.22">{mark}</div>
<div style="position:absolute;left:80px;top:90px;width:430px">{word}</div>
<div style="position:absolute;left:80px;top:250px;color:#fff;font-size:54px;font-weight:300;line-height:1.15;letter-spacing:-1px;max-width:760px">Where critical infrastructure<br><span style="color:rgba(255,255,255,.45)">meets absolute precision.</span></div>
<div style="position:absolute;left:80px;bottom:70px;color:#33E3F0;font-size:20px;letter-spacing:4px;text-transform:uppercase">Survey management · Data processing · Heavy civil</div>
</body></html>"""
with sync_playwright() as p:
    b = p.chromium.launch()
    for size, name in [(32, 'favicon-32.png'), (180, 'apple-touch-icon.png'), (512, 'icon-512.png')]:
        pg = b.new_page(viewport={'width': size, 'height': size})
        pg.set_content(f'<body style="margin:0">{fav.replace("<svg ", f"<svg width={size} height={size} ", 1)}</body>')
        pg.screenshot(path=str(pub / name), omit_background=True); pg.close()
    # PNG logo for email signatures (Gmail/Outlook don't render SVG)
    light = (pub / 'brand' / 'axiom-horizontal.svg').read_text()
    pg = b.new_page(viewport={'width': 600, 'height': 124})
    pg.set_content(f'<body style="margin:0">{light.replace("<svg ", "<svg width=600 height=124 ", 1)}</body>')
    pg.screenshot(path=str(pub / 'brand' / 'axiom-horizontal-email.png'), omit_background=True); pg.close()
    pg = b.new_page(viewport={'width': 1200, 'height': 630})
    pg.set_content(og); pg.screenshot(path=str(pub / 'og.png')); b.close()
print('images written')
