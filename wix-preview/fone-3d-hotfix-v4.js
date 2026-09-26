(() => {
  const section = document.getElementById('three');
  const viewer = document.getElementById('modelViewer3D');
  const tabs = document.getElementById('modelTabs');
  const trigger = section?.querySelector('#threeAssetTrigger');
  if (!section || !viewer || !tabs) return;

  section.dataset.fonePreviewHotfix = '20260926-v4';

  const buttons = [...tabs.querySelectorAll('button[data-model]')];
  const fone = buttons.find((b) => b.dataset.model === 'fone-tune');
  const creatine = buttons.find((b) => {
    const key = String(b.dataset.model || '').toLowerCase();
    const label = String(b.dataset.label || b.textContent || '').toLowerCase();
    return key.includes('black-skull') || label.includes('black skull') || label.includes('creatine');
  });

  // Fone is always the literal first menu item.
  if (fone) {
    fone.dataset.label = 'Fone';
    fone.setAttribute('aria-label', 'Fone');
    fone.innerHTML = '<span class="three-list-dot" aria-hidden="true"></span><span class="three-list-name">Fone</span>';
    tabs.insertBefore(fone, tabs.firstElementChild);
  }

  // The Black Skull label faces the camera at 180deg in this GLB.
  if (creatine) {
    creatine.dataset.orbitTheta = '180deg';
    creatine.dataset.orbitPhi = '75deg';
    creatine.dataset.orbitRadius = '103%';
    creatine.dataset.fov = '28deg';
  }

  const isCreatineActive = () => Boolean(creatine) && (
    viewer.dataset.currentModel === creatine.dataset.model || creatine.classList.contains('active')
  );

  const forceCreatineFront = () => {
    if (!isCreatineActive()) return;
    try {
      viewer.cameraTarget = 'auto auto auto';
      viewer.cameraOrbit = '180deg 75deg 103%';
      viewer.fieldOfView = '28deg';
      viewer.updateFraming?.();
      viewer.jumpCameraToGoal?.();
    } catch (_) {}
  };

  const settleCreatineFront = () => {
    requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(forceCreatineFront)));
    setTimeout(forceCreatineFront, 80);
    setTimeout(forceCreatineFront, 220);
  };

  tabs.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-model]');
    if (!button) return;
    if (button === creatine) settleCreatineFront();
  }, true);

  viewer.addEventListener('load', () => {
    if (isCreatineActive()) settleCreatineFront();
  });

  // Initial state: fone selected and loaded, never creatine.
  const selectFone = () => {
    if (!fone) return;
    tabs.querySelectorAll('button[data-model]').forEach((b) => b.classList.toggle('active', b === fone));
    const label = trigger?.querySelector('#threeActiveModel');
    if (label) label.textContent = 'Fone';
    if (viewer.dataset.currentModel !== 'fone-tune' || !String(viewer.src || '').includes('fone')) {
      fone.click();
    }
  };

  queueMicrotask(selectFone);
  requestAnimationFrame(selectFone);
  setTimeout(selectFone, 120);
})();
