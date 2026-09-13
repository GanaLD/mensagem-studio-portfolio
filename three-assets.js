// Third 3D asset: Rejuvital. Existing assets are not modified.
const REJUVITAL_SRC = 'https://d2ol7oe51mr4n9.cloudfront.net/user_2wayxIrYymbrFzIPfYY8jkYgTU2/8d8a225a-0a73-4dc1-93e2-cfa7cb448540.glb';

function initRejuvitalAsset() {
  const tabs = document.getElementById('modelTabs');
  const viewer = document.getElementById('modelViewer3D');
  if (!tabs || !viewer) return;

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

  const applyRejuvitalFraming = () => {
    if (!button.classList.contains('active')) return;
    viewer.cameraTarget = 'auto auto auto';
    viewer.cameraOrbit = '180deg 75deg 92%';
    viewer.fieldOfView = '25deg';
    if (typeof viewer.updateFraming === 'function') viewer.updateFraming();
    if (typeof viewer.jumpCameraToGoal === 'function') viewer.jumpCameraToGoal();
  };

  viewer.addEventListener('load', () => {
    setTimeout(applyRejuvitalFraming, 60);
  });

  button.addEventListener('click', () => {
    setTimeout(applyRejuvitalFraming, 120);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRejuvitalAsset, { once: true });
} else {
  initRejuvitalAsset();
}
