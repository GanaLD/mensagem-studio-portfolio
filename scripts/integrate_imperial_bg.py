from __future__ import annotations

import re
from pathlib import Path

import numpy as np
import trimesh

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / ".tmp-imperial" / "[OBJ] OC" / "OC.obj"
OUT = ROOT / "wix-preview" / "assets" / "imperial-asian-estate.glb"
HTML = ROOT / "wix-preview" / "index.html"
CELL = 30.0


def simplify_geom(g: trimesh.Trimesh, cell: float) -> trimesh.Trimesh:
    v = np.asarray(g.vertices, dtype=np.float64)
    f = np.asarray(g.faces, dtype=np.int64)
    if not len(v) or not len(f):
        return trimesh.Trimesh()

    q = np.floor(v / cell + 0.5).astype(np.int64)
    _, inv = np.unique(q, axis=0, return_inverse=True)
    counts = np.bincount(inv).astype(np.float64)
    nv = np.column_stack([
        np.bincount(inv, weights=v[:, i], minlength=len(counts)) / counts
        for i in range(3)
    ])

    nf = inv[f]
    good = (
        (nf[:, 0] != nf[:, 1])
        & (nf[:, 1] != nf[:, 2])
        & (nf[:, 0] != nf[:, 2])
    )
    nf = nf[good]
    if len(nf):
        key = np.sort(nf, axis=1)
        _, idx = np.unique(key, axis=0, return_index=True)
        nf = nf[np.sort(idx)]

    material = getattr(g.visual, "material", None)
    color = getattr(material, "main_color", [175, 180, 165, 255])
    pbr = trimesh.visual.material.PBRMaterial(
        baseColorFactor=np.asarray(color, dtype=np.uint8),
        metallicFactor=0.0,
        roughnessFactor=0.78,
    )
    ng = trimesh.Trimesh(vertices=nv, faces=nf, process=True)
    ng.visual = trimesh.visual.TextureVisuals(material=pbr)
    return ng


def build_glb() -> tuple[int, int, int]:
    scene = trimesh.load(SRC, force="scene", process=True)
    out_scene = trimesh.Scene()
    for name, geom in scene.geometry.items():
        simplified = simplify_geom(geom, CELL)
        if len(simplified.faces):
            out_scene.add_geometry(simplified, geom_name=name, node_name=name)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_bytes(out_scene.export(file_type="glb"))
    faces = sum(len(g.faces) for g in out_scene.geometry.values())
    verts = sum(len(g.vertices) for g in out_scene.geometry.values())
    return faces, verts, OUT.stat().st_size


def patch_html() -> None:
    text = HTML.read_text(encoding="utf-8")

    # The current WORD layer proved the global-background architecture. Keep it only
    # as a subtle atmospheric trace; the Imperial estate becomes the protagonist.
    text = text.replace(
        ".gmc-word.one{top:30%;font-size:clamp(180px,30vw,620px);color:rgba(255,255,255,.145)}.gmc-word.two{top:67%;font-size:clamp(130px,22vw,440px);color:rgba(201,255,54,.095)}.gmc-word.three{top:92%;font-size:clamp(85px,14vw,300px);color:rgba(255,255,255,.07);letter-spacing:-.06em}",
        ".gmc-word.one{top:30%;font-size:clamp(180px,30vw,620px);color:rgba(255,255,255,.025)}.gmc-word.two{top:67%;font-size:clamp(130px,22vw,440px);color:rgba(201,255,54,.018)}.gmc-word.three{top:92%;font-size:clamp(85px,14vw,300px);color:rgba(255,255,255,.012);letter-spacing:-.06em}",
    )

    text = re.sub(
        r"#imperialEstateSlot\{[^}]*\}#imperialEstateSlot model-viewer\{[^}]*\}",
        "#imperialEstateSlot{position:absolute;z-index:3;inset:-8% -13% -7% 14%;opacity:.98;pointer-events:none;transform:translate3d(var(--imperial-x,0px),var(--imperial-y,0px),0) scale(var(--imperial-scale,1.06)) rotate(var(--imperial-roll,-1.5deg));transform-origin:55% 55%;filter:saturate(.72) contrast(1.02) brightness(.78);will-change:transform,opacity,filter}#imperialEstateSlot model-viewer{width:100%;height:100%;background:transparent;--poster-color:transparent}",
        text,
        count=1,
    )

    slot = '<div id="imperialEstateSlot" data-asset="imperial-asian-estate"></div>'
    model = (
        '<div id="imperialEstateSlot" data-asset="imperial-asian-estate">'
        '<model-viewer id="imperialEstateBg" '
        'src="./assets/imperial-asian-estate.glb" '
        'alt="Imperial Asian Estate 3D background" '
        'loading="eager" reveal="auto" interaction-prompt="none" '
        'shadow-intensity="0.65" shadow-softness="0.9" exposure="0.82" '
        'environment-image="neutral" camera-orbit="-24deg 72deg 108%" '
        'field-of-view="34deg" disable-zoom></model-viewer></div>'
    )
    if slot not in text:
        raise RuntimeError("Imperial slot marker not found")
    text = text.replace(slot, model, 1)

    old_const = "afterWord=document.querySelector('#afterWord'),gmc=document.querySelector('#sfGlobalMediaCanvas'),gmc1=document.querySelector('#gmcWord1'),gmc2=document.querySelector('#gmcWord2'),gmc3=document.querySelector('#gmcWord3');"
    new_const = "afterWord=document.querySelector('#afterWord'),gmc=document.querySelector('#sfGlobalMediaCanvas'),gmc1=document.querySelector('#gmcWord1'),gmc2=document.querySelector('#gmcWord2'),gmc3=document.querySelector('#gmcWord3'),imperial=document.querySelector('#imperialEstateBg');"
    if old_const not in text:
        raise RuntimeError("Global canvas const marker not found")
    text = text.replace(old_const, new_const, 1)

    old_fn = re.compile(r"function updateGlobalCanvas\(y\)\{.*?\}\nfunction renderScroll", re.S)
    new_fn = """function updateGlobalCanvas(y){const start=afterWord.offsetTop-innerHeight*.08,end=Math.max(start+1,document.documentElement.scrollHeight-innerHeight);const reveal=clamp((y-start)/(innerHeight*.34));const p=clamp((y-start)/(end-start));document.documentElement.style.setProperty('--gmc-alpha',String(reveal));const drift=(p-.5);gmc1.style.transform=`translate3d(calc(-50% + ${drift*-24}vw + ${px*3}px),calc(-50% + ${drift*8}vh + ${py*2}px),0) rotate(-7deg)`;gmc2.style.transform=`translate3d(calc(-50% + ${drift*30}vw + ${px*-2}px),calc(-50% + ${drift*-5}vh + ${py*-2}px),0) rotate(5deg)`;gmc3.style.transform=`translate3d(calc(-50% + ${drift*-18}vw),calc(-50% + ${drift*-4}vh),0) rotate(-2deg)`;gmc.style.setProperty('--gmc-grid-x',`${drift*18}px`);gmc.style.setProperty('--gmc-grid-y',`${drift*-30}px`);gmc.style.setProperty('--imperial-x',`${drift*-7.5}vw`);gmc.style.setProperty('--imperial-y',`${drift*5.5}vh`);gmc.style.setProperty('--imperial-scale',String(1.04+Math.sin(p*Math.PI)*.075));gmc.style.setProperty('--imperial-roll',`${-1.5+drift*3.2}deg`);if(imperial){const az=-30+p*62+px*2.5;const polar=70+Math.sin(p*Math.PI)*5+py*1.2;const orbit=108-Math.sin(p*Math.PI)*8;imperial.setAttribute('camera-orbit',`${az}deg ${polar}deg ${orbit}%`);imperial.setAttribute('field-of-view',`${34-Math.sin(p*Math.PI)*3}deg`)}gmc.dataset.progress=p.toFixed(4);gmc.dataset.visible=reveal>.02?'true':'false'}
function renderScroll"""
    text, n = old_fn.subn(new_fn, text, count=1)
    if n != 1:
        raise RuntimeError("updateGlobalCanvas function marker not found")

    HTML.write_text(text, encoding="utf-8")


if __name__ == "__main__":
    if not SRC.exists():
        raise SystemExit(f"Missing source OBJ: {SRC}")
    faces, verts, size = build_glb()
    patch_html()
    print(f"Imperial Asian Estate web GLB: {faces} faces / {verts} vertices / {size} bytes")
