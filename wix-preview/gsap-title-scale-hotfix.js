// Published Home — reduce GSAP case title scale and prevent e-commerce word breaks.
(() => {
  const styleId = 'ms-gsap-title-scale-hotfix';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      #word .word-main{
        font-size:clamp(28px,4vw,74px)!important;
        line-height:.9!important;
        letter-spacing:-.045em!important;
        max-width:14ch!important;
      }
      @media(max-width:760px){
        #word .word-main{
          font-size:clamp(24px,7vw,42px)!important;
          line-height:.92!important;
          max-width:14ch!important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  const ecommerceCopy = document.querySelector('#word .word-case-copy[data-word-copy="1"] .word-case-desc');
  if (ecommerceCopy) {
    ecommerceCopy.textContent = ecommerceCopy.textContent.replace(/e-commerce/gi, 'e‑commerce');
  }
})();
