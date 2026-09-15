// Third 3D asset: Rejuvital. Existing assets keep their original viewer look.
const REJUVITAL_SRC = 'https://d2ol7oe51mr4n9.cloudfront.net/user_2wayxIrYymbrFzIPfYY8jkYgTU2/8d8a225a-0a73-4dc1-93e2-cfa7cb448540.glb';

function initRejuvitalAsset() {
  const tabs = document.getElementById('modelTabs');
  const viewer = document.getElementById('modelViewer3D');
  if (!tabs || !viewer) return;

  const DEFAULT_LOOK = {
    exposure: '1.08',
    shadowIntensity: '1.15',
    shadowSoftness: '0.8',
    environmentImage: 'neutral'
  };

  const REJUVITAL_LOOK = {
    exposure: '0.72',
    shadowIntensity: '0.72',
    shadowSoftness: '0.92',
    environmentImage: 'neutral'
  };

  let button = tabs.querySelector('button[data-model="rejuvital"]');
  if (!button) {
    button = document.createElement('button');
    button.type = 'button';
    button.dataset.model = 'rejuvital';
    button.dataset.src = REJUVITAL_SRC;
    button.dataset.alt = 'Rejuvital em visualização 3D interativa';
    button.dataset.orbitTheta = '180deg';
    button.textContent = 'Rejuvital';
    tabs.appendChild(button);
  }

  const applyLook = () => {
    const active = tabs.querySelector('button.active');
    const isRejuvital = active?.dataset.model?.startsWith('rejuvital');
    const look = isRejuvital ? REJUVITAL_LOOK : DEFAULT_LOOK;

    viewer.setAttribute('exposure', look.exposure);
    viewer.setAttribute('shadow-intensity', look.shadowIntensity);
    viewer.setAttribute('shadow-softness', look.shadowSoftness);
    viewer.setAttribute('environment-image', look.environmentImage);
  };

  const applyRejuvitalFraming = () => {
    if (!button.classList.contains('active')) return;
    viewer.cameraTarget = 'auto auto auto';
    viewer.cameraOrbit = '180deg 75deg 92%';
    viewer.fieldOfView = '25deg';
    if (typeof viewer.updateFraming === 'function') viewer.updateFraming();
    if (typeof viewer.jumpCameraToGoal === 'function') viewer.jumpCameraToGoal();
  };

  viewer.addEventListener('load', () => {
    setTimeout(() => {
      applyLook();
      applyRejuvitalFraming();
    }, 60);
  });

  tabs.addEventListener('click', () => {
    setTimeout(() => {
      applyLook();
      applyRejuvitalFraming();
    }, 120);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRejuvitalAsset, { once: true });
} else {
  initRejuvitalAsset();
}
