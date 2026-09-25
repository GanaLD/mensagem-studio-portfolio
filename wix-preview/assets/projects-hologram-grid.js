import * as THREE from "./motion/vendor/three/three.module.min.js";

(() => {
  const section = document.getElementById("projects");
  const grid = section?.querySelector(".projects-grid");
  if (!section || !grid || section.querySelector(".ms-holo-projects")) return;

  const sourceCards = [...grid.querySelectorAll(":scope > a.project")];
  if (!sourceCards.length) return;

  const projects = sourceCards.map((node, index) => {
    const image = node.querySelector("img.project-cover, .project-media img");
    const category = node.querySelector(".project-text small")?.textContent?.trim() || "PROJETO";
    const title = node.querySelector(".project-text h3")?.textContent?.trim() || `Projeto ${index + 1}`;
    return {
      href: node.getAttribute("href") || "#",
      title,
      category,
      image: image?.currentSrc || image?.getAttribute("src") || "",
      alt: image?.getAttribute("alt") || title
    };
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const stage = document.createElement("div");
  stage.className = "ms-holo-projects";
  stage.setAttribute("data-preview-component", "hologram-project-grid");
  stage.innerHTML = `
    <div class="ms-holo-projects__viewport" aria-label="Projetos em visualização holográfica interativa">
      <canvas class="ms-holo-projects__canvas" aria-hidden="true"></canvas>
      <div class="ms-holo-projects__cards"></div>
    </div>
  `;

  grid.before(stage);

  const viewport = stage.querySelector(".ms-holo-projects__viewport");
  const canvas = stage.querySelector(".ms-holo-projects__canvas");
  const cardLayer = stage.querySelector(".ms-holo-projects__cards");
  if (!viewport || !canvas || !cardLayer) {
    stage.remove();
    return;
  }

  const escapeHtml = (value = "") =>
    value.replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[ch]));

  const cardElements = projects.map((project) => {
    const anchor = document.createElement("a");
    anchor.className = "ms-holo-card";
    anchor.href = project.href;
    anchor.setAttribute("aria-label", `Abrir projeto ${project.title}`);
    anchor.innerHTML = `
      <span class="ms-holo-card__glass">
        <span class="ms-holo-card__media">
          <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.alt)}" loading="lazy" decoding="async">
        </span>
        <span class="ms-holo-card__meta">
          <small>${escapeHtml(project.category)}</small>
          <strong>${escapeHtml(project.title)}</strong>
        </span>
      </span>
    `;
    cardLayer.appendChild(anchor);
    return anchor;
  });

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
  } catch (error) {
    console.warn("[Mensagem Studio] Hologram grid: WebGL unavailable; keeping original grid.", error);
    stage.remove();
    return;
  }

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
  camera.position.set(0, 0, 12.2);

  const orbitGroup = new THREE.Group();
  scene.add(orbitGroup);

  const globeGroup = new THREE.Group();
  orbitGroup.add(globeGroup);

  const lime = 0xc9ff36;
  const aqua = 0x7effe3;

  const outerGeometry = new THREE.SphereGeometry(3.18, 38, 26);
  const outerMaterial = new THREE.MeshBasicMaterial({
    color: lime,
    transparent: true,
    opacity: 0.16,
    wireframe: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const outerSphere = new THREE.Mesh(outerGeometry, outerMaterial);
  globeGroup.add(outerSphere);

  const innerGeometry = new THREE.SphereGeometry(3.04, 28, 18);
  const innerMaterial = new THREE.MeshBasicMaterial({
    color: aqua,
    transparent: true,
    opacity: 0.065,
    wireframe: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
  innerSphere.rotation.set(0.18, 0.34, 0.08);
  globeGroup.add(innerSphere);

  const shellGeometry = new THREE.SphereGeometry(3.12, 48, 32);
  const shellMaterial = new THREE.MeshBasicMaterial({
    color: lime,
    transparent: true,
    opacity: 0.022,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const shell = new THREE.Mesh(shellGeometry, shellMaterial);
  globeGroup.add(shell);

  const ringGeometries = [];
  const ringMaterials = [];
  const ringMeshes = [];

  const makeRing = (radius, rotation, color, opacity) => {
    const points = [];
    const segments = 160;
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const ring = new THREE.LineLoop(geometry, material);
    ring.rotation.set(...rotation);
    globeGroup.add(ring);
    ringGeometries.push(geometry);
    ringMaterials.push(material);
    ringMeshes.push(ring);
  };

  makeRing(3.32, [Math.PI / 2, 0, 0], lime, 0.32);
  makeRing(3.35, [0.2, Math.PI / 2, 0.55], aqua, 0.20);
  makeRing(3.42, [0.78, 0.18, 0.05], lime, 0.14);
  makeRing(2.55, [0.28, 0.04, Math.PI / 2], aqua, 0.13);

  const cardObjects = [];
  const basePositions = [];
  const radius = 5.0;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  projects.forEach((_, index) => {
    const yNorm = 1 - 2 * ((index + 0.5) / projects.length);
    const ringRadius = Math.sqrt(Math.max(0, 1 - yNorm * yNorm));
    const theta = index * goldenAngle + 0.56;
    const verticalSpread = 0.78;
    const base = new THREE.Vector3(
      Math.cos(theta) * ringRadius * radius,
      yNorm * radius * verticalSpread,
      Math.sin(theta) * ringRadius * radius
    );
    const object = new THREE.Object3D();
    object.position.copy(base);
    orbitGroup.add(object);
    basePositions.push(base);
    cardObjects.push(object);
  });

  let width = 0;
  let height = 0;
  let sceneScale = 1;
  let yaw = -0.18;
  let pitch = 0.05;
  let dragging = false;
  let pointerId = null;
  let lastX = 0;
  let lastY = 0;
  let active = true;
  let raf = 0;
  let lastFrame = performance.now();
  let autoResumeAt = 0;
  let destroyed = false;

  const tempWorld = new THREE.Vector3();
  const tempProjected = new THREE.Vector3();

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  function resize() {
    if (destroyed) return;
    const rect = viewport.getBoundingClientRect();
    const nextWidth = Math.max(1, Math.round(rect.width));
    const nextHeight = Math.max(1, Math.round(rect.height));
    if (nextWidth === width && nextHeight === height) return;

    width = nextWidth;
    height = nextHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    sceneScale = width < 620 ? 0.70 : width < 900 ? 0.84 : 1;
    orbitGroup.scale.setScalar(sceneScale);
  }

  function updateCardProjection(timeSeconds) {
    scene.updateMatrixWorld(true);

    cardObjects.forEach((object, index) => {
      const base = basePositions[index];
      const bob = reduceMotion ? 0 : Math.sin(timeSeconds * 0.72 + index * 1.37) * 0.11;
      const drift = reduceMotion ? 0 : Math.cos(timeSeconds * 0.46 + index * 1.91) * 0.045;

      object.position.set(base.x + drift, base.y + bob, base.z);
      object.getWorldPosition(tempWorld);

      tempProjected.copy(tempWorld).project(camera);

      const projectedX = (tempProjected.x * 0.5 + 0.5) * width;
      const projectedY = (-tempProjected.y * 0.5 + 0.5) * height;

      const localDepth = tempWorld.z / Math.max(0.001, radius * sceneScale);
      const depth01 = clamp((localDepth + 1) * 0.5, 0, 1);
      const scale = 0.66 + depth01 * 0.46;
      const opacity = 0.34 + depth01 * 0.66;
      const behind = depth01 < 0.26;

      const el = cardElements[index];

      // Keep the entire card inside the visible interaction area while rotating.
      // This prevents clipping at the top/bottom/left/right edges even at max scale.
      const safeMargin = width < 620 ? 10 : 16;
      const halfCardW = Math.min(width * 0.46, (el.offsetWidth * scale) * 0.5 + safeMargin);
      const halfCardH = Math.min(height * 0.46, (el.offsetHeight * scale) * 0.5 + safeMargin);
      const x = clamp(projectedX, halfCardW, Math.max(halfCardW, width - halfCardW));
      const y = clamp(projectedY, halfCardH, Math.max(halfCardH, height - halfCardH));

      el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) translate(-50%,-50%) scale(${scale.toFixed(3)})`;
      el.style.setProperty("--ms-card-opacity", opacity.toFixed(3));
      el.style.zIndex = String(20 + Math.round(depth01 * 80));
      el.style.filter = behind ? "saturate(.78) brightness(.82)" : "none";
      el.style.pointerEvents = behind ? "none" : "auto";
      el.setAttribute("aria-hidden", behind ? "true" : "false");
    });
  }

  function renderFrame(now) {
    raf = 0;
    if (destroyed || !active) return;

    const dt = Math.min(0.05, Math.max(0, (now - lastFrame) / 1000));
    lastFrame = now;
    const t = now / 1000;

    if (!reduceMotion && !dragging && now >= autoResumeAt) {
      yaw += dt * 0.105;
    }

    pitch = clamp(pitch, -0.58, 0.58);
    orbitGroup.rotation.x = pitch;
    orbitGroup.rotation.y = yaw;

    if (!reduceMotion) {
      globeGroup.rotation.y += dt * 0.035;
      globeGroup.rotation.z = Math.sin(t * 0.18) * 0.035;
      ringMeshes[1].rotation.z += dt * 0.022;
      ringMeshes[2].rotation.y += dt * 0.018;
    }

    resize();
    renderer.render(scene, camera);
    updateCardProjection(t);

    raf = requestAnimationFrame(renderFrame);
  }

  function ensureLoop() {
    if (destroyed || !active || raf) return;
    lastFrame = performance.now();
    raf = requestAnimationFrame(renderFrame);
  }

  function onPointerDown(event) {
    if (event.button !== undefined && event.button !== 0) return;
    if (event.target.closest?.(".ms-holo-card")) return;
    dragging = true;
    pointerId = event.pointerId;
    lastX = event.clientX;
    lastY = event.clientY;
    viewport.classList.add("is-dragging");
    try { viewport.setPointerCapture(pointerId); } catch (_) {}
  }

  function onPointerMove(event) {
    if (!dragging || event.pointerId !== pointerId) return;
    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;
    lastX = event.clientX;
    lastY = event.clientY;
    yaw += dx * 0.006;
    pitch += dy * 0.004;
    autoResumeAt = performance.now() + 2200;
    ensureLoop();
  }

  function endPointer(event) {
    if (!dragging || (event.pointerId !== undefined && event.pointerId !== pointerId)) return;
    dragging = false;
    viewport.classList.remove("is-dragging");
    try { viewport.releasePointerCapture(pointerId); } catch (_) {}
    pointerId = null;
    autoResumeAt = performance.now() + 1800;
  }

  viewport.addEventListener("pointerdown", onPointerDown);
  viewport.addEventListener("pointermove", onPointerMove);
  viewport.addEventListener("pointerup", endPointer);
  viewport.addEventListener("pointercancel", endPointer);
  viewport.addEventListener("lostpointercapture", endPointer);

  const onResize = () => {
    resize();
    if (reduceMotion) {
      renderer.render(scene, camera);
      updateCardProjection(performance.now() / 1000);
    } else {
      ensureLoop();
    }
  };
  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("orientationchange", onResize, { passive: true });

  const observer = new IntersectionObserver((entries) => {
    active = entries.some((entry) => entry.isIntersecting);
    if (active) {
      resize();
      ensureLoop();
    } else if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }, { rootMargin: "160px 0px", threshold: 0.01 });
  observer.observe(stage);

  function destroy() {
    if (destroyed) return;
    destroyed = true;
    if (raf) cancelAnimationFrame(raf);
    observer.disconnect();
    window.removeEventListener("resize", onResize);
    window.removeEventListener("orientationchange", onResize);
    viewport.removeEventListener("pointerdown", onPointerDown);
    viewport.removeEventListener("pointermove", onPointerMove);
    viewport.removeEventListener("pointerup", endPointer);
    viewport.removeEventListener("pointercancel", endPointer);
    viewport.removeEventListener("lostpointercapture", endPointer);

    outerGeometry.dispose();
    outerMaterial.dispose();
    innerGeometry.dispose();
    innerMaterial.dispose();
    shellGeometry.dispose();
    shellMaterial.dispose();
    ringGeometries.forEach((geometry) => geometry.dispose());
    ringMaterials.forEach((material) => material.dispose());
    renderer.dispose();
  }

  window.addEventListener("pagehide", destroy, { once: true });

  resize();
  orbitGroup.rotation.set(pitch, yaw, 0);
  renderer.render(scene, camera);
  updateCardProjection(performance.now() / 1000);

  document.documentElement.classList.add("ms-holo-grid-ready");
  ensureLoop();
})();
