from pathlib import Path
import re

MARKER = "MS_SITE_TYPOGRAPHY_V1"
VERSION = "20260927-sitewide-type-v1"

TYPOGRAPHY_BLOCK = r'''

  // MS_SITE_TYPOGRAPHY_V1 — shared identity across every Mensagem Studio page.
  const msTypographyFontHref = 'https://fonts.googleapis.com/css2?family=Fugaz+One&family=Work+Sans:ital,wght@0,300..900;1,300..900&display=swap';
  if (!document.querySelector('link[data-ms-site-typography-fonts]')) {
    const preconnectGoogle = document.createElement('link');
    preconnectGoogle.rel = 'preconnect';
    preconnectGoogle.href = 'https://fonts.googleapis.com';
    preconnectGoogle.setAttribute('data-ms-site-typography-fonts', 'preconnect');
    document.head.appendChild(preconnectGoogle);

    const preconnectGstatic = document.createElement('link');
    preconnectGstatic.rel = 'preconnect';
    preconnectGstatic.href = 'https://fonts.gstatic.com';
    preconnectGstatic.crossOrigin = 'anonymous';
    preconnectGstatic.setAttribute('data-ms-site-typography-fonts', 'preconnect-static');
    document.head.appendChild(preconnectGstatic);

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = msTypographyFontHref;
    fontLink.setAttribute('data-ms-site-typography-fonts', 'stylesheet');
    document.head.appendChild(fontLink);
  }

  if (!document.getElementById('ms-site-typography-style')) {
    const typographyStyle = document.createElement('style');
    typographyStyle.id = 'ms-site-typography-style';
    typographyStyle.textContent = `
      :root{
        --ms-font-display:'Fugaz One',Impact,'Arial Black',sans-serif;
        --ms-font-body:'Work Sans',Arial,Helvetica,sans-serif;
        --font-futura:'Fugaz One',Impact,'Arial Black',sans-serif!important;
        --font-gotham:'Work Sans',Arial,Helvetica,sans-serif!important;
        --font-courier:'Work Sans',Arial,Helvetica,sans-serif!important;
        --v4-futura:'Fugaz One',Impact,'Arial Black',sans-serif!important;
        --v4-gotham:'Work Sans',Arial,Helvetica,sans-serif!important;
        --v4-mono:'Work Sans',Arial,Helvetica,sans-serif!important;
      }

      html,body,
      button,input,textarea,select,option{
        font-family:var(--ms-font-body)!important;
      }

      p,li,label,small,figcaption,
      .lead,.description,.muted,.kicker,.eyebrow,.cat,.price,.note,
      .nav,.nav a,.right,.filter,.filters,.chip,.btn,.add,.close,.send,
      .detail,.detail span,.detail a,.caption,.caption p,.caption small,
      .hero-label,.model-file-link,.conversion-btn,.conversion-ref,
      .case-study-card p,.case-study-service small,.project-link small,
      .ms-menu-head,.ms-menu-link small,.ms-menu-quote,
      .ms-sound-toggle,.ms-glass-cta,.ms-quote-fab,
      .text,.text p,.text small,.location,.actions,
      .masthead-lead,.profile-intro p,.profile-body p,
      footer,.footer{
        font-family:var(--ms-font-body)!important;
      }

      h1,h2,h3,h4,h5,h6,
      .brand,
      .hero-title,
      .section-title,
      .project-title,
      .card-title,
      .display,
      .section-head h2,
      .category h2,
      .card h3,
      .hero-copy h1,
      .masthead h1,
      .profile-intro h2,
      .profile-name strong,
      .conversion-copy h2,
      .project-link strong,
      .case-study-head h2,
      .ms-menu-link,
      .ms-contact-card h2,
      .text h2{
        font-family:var(--ms-font-display)!important;
        font-weight:400!important;
        font-synthesis:none;
        overflow-wrap:normal;
        word-break:normal;
        hyphens:none;
      }

      h1 *,h2 *,h3 *,h4 *,h5 *,h6 *,
      .hero-title *,
      .section-title *,
      .project-title *,
      .card-title *,
      .display *,
      .ms-menu-link *{
        font-family:inherit!important;
        font-weight:inherit!important;
      }

      h1,h2,h3,
      .hero-title,.section-title,.project-title,.card-title,.display,
      .section-head h2,.category h2,.card h3,.hero-copy h1,.masthead h1,
      .conversion-copy h2,.project-link strong,.case-study-head h2,
      .ms-menu-link,.ms-contact-card h2,.text h2{
        letter-spacing:-.018em!important;
      }

      .brand{letter-spacing:.045em!important;white-space:nowrap}
      .nav a,.filter,.chip,.btn,.add,.close,.send,
      .conversion-btn,.ms-menu-quote,.ms-glass-cta,.ms-quote-fab{
        letter-spacing:.07em!important;
      }
    `;
    document.head.appendChild(typographyStyle);
  }
'''


def patch_global_ui(path: Path) -> bool:
    if not path.exists():
        return False
    text = path.read_text(encoding="utf-8")
    if MARKER in text:
        return False

    anchor = "  const VERSION = "
    pos = text.find(anchor)
    if pos == -1:
        raise RuntimeError(f"VERSION anchor not found in {path}")
    line_end = text.find("\n", pos)
    if line_end == -1:
        raise RuntimeError(f"VERSION line end not found in {path}")

    text = text[: line_end + 1] + TYPOGRAPHY_BLOCK + text[line_end + 1 :]
    path.write_text(text, encoding="utf-8")
    print(f"patched typography: {path}")
    return True


def patch_preview_hero(path: Path) -> bool:
    if not path.exists():
        return False
    text = path.read_text(encoding="utf-8")
    original = text

    old_copy = ".hero-copy{align-self:center;max-width:720px}"
    new_copy = ".hero-copy{align-self:center;max-width:720px}.hero-copy>.kicker{display:block;margin-bottom:14px}"
    if old_copy in text and new_copy not in text:
        text = text.replace(old_copy, new_copy, 1)

    old_h1 = ".hero-copy h1{font-size:clamp(54px,7.4vw,126px);line-height:.82;letter-spacing:-.065em;margin:0 0 24px;text-transform:uppercase;max-width:8ch}"
    new_h1 = ".hero-copy h1{font-size:clamp(54px,7.4vw,126px);line-height:.82;letter-spacing:-.065em;margin:0 0 14px;text-transform:uppercase;max-width:8ch}"
    if old_h1 in text:
        text = text.replace(old_h1, new_h1, 1)

    if text != original:
        path.write_text(text, encoding="utf-8")
        print(f"patched hero spacing: {path}")
        return True
    return False


def cache_bust_global_ui() -> int:
    pattern = re.compile(r"global-ui\.js(?:\?v=[^\"'< >\s]*)?")
    touched = 0
    seen = set()

    for base in (Path("."), Path("wix-preview")):
        for path in base.rglob("*.html"):
            resolved = path.resolve()
            if resolved in seen:
                continue
            seen.add(resolved)

            normalized = str(path).replace("\\", "/")
            if any(part in normalized for part in ("/node_modules/", "/vendor/", "/dist/")):
                continue

            text = path.read_text(encoding="utf-8", errors="ignore")
            if "global-ui.js" not in text:
                continue

            new_text = pattern.sub(f"global-ui.js?v={VERSION}", text)
            if new_text != text:
                path.write_text(new_text, encoding="utf-8")
                touched += 1

    print(f"cache-busted HTML pages: {touched}")
    return touched


if __name__ == "__main__":
    patch_global_ui(Path("global-ui.js"))
    patch_global_ui(Path("wix-preview/global-ui.js"))
    patch_preview_hero(Path("wix-preview/index.html"))
    cache_bust_global_ui()
