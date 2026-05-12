const dishes = [
  {
    name: "T-bone steak",
    section: "Plats principaux",
    file: "tbonesteak.glb",
    usdz: "tbonesteak.usdz",
    has3d: true,
    description: "Jus corse, beurre noisette, herbes fraiches.",
    price: "34"
  },
  {
    name: "Caesar salad",
    section: "Entrees",
    file: "caesar-salad.glb",
    usdz: "caesar-salad.usdz",
    has3d: true,
    description: "Laitue croquante, copeaux, croutons.",
    price: "17"
  },
  {
    name: "Donut chocolat",
    section: "Desserts",
    file: "chocolate-donut.glb",
    usdz: "chocolate-donut.usdz",
    has3d: true,
    description: "Glacage chocolat, texture moelleuse.",
    price: "9"
  },
  {
    name: "Plateau de fruits",
    section: "Desserts",
    description: "Fruits frais, dressage de saison.",
    price: "18"
  },
  {
    name: "Christmas steak",
    section: "Plats principaux",
    description: "Piece grillee, notes roties, sauce reduite.",
    price: "32"
  },
  {
    name: "Breakfast Kabuki",
    section: "Entrees",
    description: "Brunch frais, chaud et croustillant.",
    price: "21"
  }
];

const drinks = [
  {
    name: "Saint-Emilion Grand Cru",
    description: "Verre 14cl, fruits noirs, finale boisee.",
    price: "12"
  },
  {
    name: "Riesling sec",
    description: "Verre 14cl, frais, mineral, citronne.",
    price: "9"
  },
  {
    name: "Eau petillante",
    description: "Bouteille 75cl.",
    price: "6"
  }
];

const sectionOrder = ["Entrees", "Plats principaux", "Boissons", "Desserts"];
const modelPath = (file) => `assets/models/${encodeURIComponent(file)}`;
const usdzPath = (dish) => `assets/models/${encodeURIComponent(dish.usdz || dish.file.replace(/\.glb$/i, ".usdz"))}`;
const absoluteAssetUrl = (path) => new URL(path, window.location.href).href;
const formatPrice = (price) =>
  new Intl.NumberFormat("fr-CH", {
    style: "currency",
    currency: "CHF",
    maximumFractionDigits: 0
  }).format(Number(price));

const dishGrid = document.querySelector("#dishGrid");
const dialog = document.querySelector("#dishDialog");
const dialogTitle = document.querySelector("#dialogTitle");
const viewerSlot = document.querySelector("#viewerSlot");
const dialogNote = document.querySelector("#dialogNote");
const loadBar = document.querySelector("#loadBar");
const loadBarFill = document.querySelector("#loadBarFill");
const closeDialog = document.querySelector("#closeDialog");
const dialogAr = document.querySelector("#dialogAr");
const dialogShare = document.querySelector("#dialogShare");
const arLoading = document.querySelector("#arLoading");

let selectedDish = null;
let currentViewer = null;
let modelViewerPromise = null;

// --- Helpers ---

function dishSlug(dish) {
  return dish.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function dishUrl(dish) {
  return new URL(`#plat=${dishSlug(dish)}`, window.location.href).href;
}

function iosQuickLookUrl(dish) {
  const params = new URLSearchParams({
    callToAction: "Commander ce plat",
    checkoutTitle: dish.name,
    checkoutSubtitle: dish.description,
    price: formatPrice(dish.price)
  });

  return `${absoluteAssetUrl(usdzPath(dish))}#${params}`;
}

function androidSceneViewerUrl(dish) {
  const modelUrl = absoluteAssetUrl(modelPath(dish.file));

  return (
    `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(modelUrl)}&mode=ar_only&title=${encodeURIComponent(dish.name)}` +
    `#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;` +
    `S.browser_fallback_url=${encodeURIComponent("https://play.google.com/store/apps/details?id=com.google.ar.core")};end;`
  );
}

function isMobileArCandidate() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || "");
}

function isIos() {
  const ua = navigator.userAgent || "";
  const platform = navigator.platform || "";
  return /iPhone|iPad|iPod/i.test(ua) || (platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function isAndroid() {
  return /Android/i.test(navigator.userAgent || "");
}

// --- Toast ---

function showToast(msg) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = msg;
  document.body.append(toast);

  requestAnimationFrame(() => {
    toast.classList.add("toast--visible");
    setTimeout(() => {
      toast.classList.remove("toast--visible");
      toast.addEventListener("transitionend", () => toast.remove(), { once: true });
    }, 2200);
  });
}

// --- AR loading overlay ---

function showArLoading() {
  arLoading.hidden = false;
}

function hideArLoading() {
  arLoading.hidden = true;
}

// --- Desktop fallback: QR code ---

function showArFallback(dish) {
  const url = dish ? dishUrl(dish) : window.location.href;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(url)}&bgcolor=111214&color=f8f1e7&margin=1`;

  dialogTitle.textContent = dish ? dish.name : "Réalité augmentée";
  dialogNote.textContent = "Scannez depuis un iPhone (Safari) ou Android compatible ARCore.";

  viewerSlot.innerHTML = "";
  viewerSlot.classList.add("viewer-slot--qr");

  const img = document.createElement("img");
  img.src = qrSrc;
  img.className = "qr-code";
  img.alt = "QR code AR";
  img.width = 180;
  img.height = 180;
  viewerSlot.append(img);

  if (!dialog.open) {
    dialog.showModal();
    closeDialog.focus();
  }
}

// --- iOS Quick Look avec call-to-action ---

function openIosQuickLook(dish) {
  if (!dish.usdz) {
    showArFallback(dish);
    return;
  }

  const link = document.createElement("a");
  const img = document.createElement("img");

  link.rel = "ar";
  link.href = iosQuickLookUrl(dish);
  link.className = "ar-direct-link";
  img.alt = "";
  img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
  link.append(img);
  document.body.append(link);
  link.click();
  link.remove();
}

// --- model-viewer chargement lazy ---

function ensureModelViewer() {
  if (customElements.get("model-viewer")) return Promise.resolve();

  if (!modelViewerPromise) {
    modelViewerPromise = import("https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js")
      .catch(() => {
        modelViewerPromise = null;
        throw new Error("Impossible de charger la bibliotheque 3D. Verifiez votre connexion internet.");
      });
  }

  return modelViewerPromise;
}

// --- Visionneuse 3D dans le dialog ---

async function prepareViewer(dish) {
  await ensureModelViewer();
  viewerSlot.innerHTML = "";
  viewerSlot.classList.remove("viewer-slot--qr");

  const viewer = document.createElement("model-viewer");
  currentViewer = viewer;
  dialogTitle.textContent = dish.name;
  viewer.src = modelPath(dish.file);
  if (dish.usdz) viewer.setAttribute("ios-src", usdzPath(dish));
  viewer.alt = dish.name;
  viewer.setAttribute("camera-controls", "");
  viewer.setAttribute("touch-action", "pan-y");
  viewer.setAttribute("auto-rotate", "");
  viewer.setAttribute("rotation-per-second", "16deg");
  viewer.setAttribute("interaction-prompt", "none");
  viewer.setAttribute("shadow-intensity", "0.7");
  viewer.setAttribute("shadow-softness", "0.85");
  viewer.setAttribute("environment-image", "neutral");
  viewer.setAttribute("exposure", "0.95");
  viewer.setAttribute("ar", "");
  viewer.setAttribute("ar-modes", "webxr scene-viewer quick-look");
  viewer.setAttribute("ar-scale", "fixed");

  loadBarFill.style.width = "0%";
  loadBar.hidden = false;

  viewer.addEventListener("progress", (e) => {
    loadBarFill.style.width = `${e.detail.totalProgress * 100}%`;
  });
  viewer.addEventListener("load", () => { loadBar.hidden = true; }, { once: true });
  viewer.addEventListener("error", () => { loadBar.hidden = true; }, { once: true });

  viewerSlot.append(viewer);
  return viewer;
}

async function openDish(dish) {
  selectedDish = dish;
  history.replaceState(null, "", `#plat=${dishSlug(dish)}`);
  dialogTitle.textContent = dish.name;
  dialogNote.textContent = "Chargement du plat en 3D…";
  viewerSlot.innerHTML = "";
  viewerSlot.classList.remove("viewer-slot--qr");
  dialog.showModal();
  closeDialog.focus();

  try {
    const viewer = await prepareViewer(dish);
    viewer.addEventListener("load", () => { dialogNote.textContent = ""; }, { once: true });
  } catch (error) {
    loadBar.hidden = true;
    dialogNote.textContent = error.message || "La vue 3D n'a pas pu se charger sur cet appareil.";
  }
}

// --- Android AR : WebXR → Scene Viewer en fallback ---

async function checkWebXrAr() {
  if (!navigator.xr) return false;
  return navigator.xr.isSessionSupported("immersive-ar").catch(() => false);
}

async function openAndroidWebXrAr(dish) {
  showArLoading();

  try {
    await ensureModelViewer();

    const viewer = document.createElement("model-viewer");
    viewer.src = modelPath(dish.file);
    viewer.setAttribute("ar", "");
    viewer.setAttribute("ar-modes", "webxr");
    viewer.setAttribute("ar-scale", "fixed");
    viewer.style.cssText = "position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;top:-9999px";
    document.body.append(viewer);

    await new Promise((resolve, reject) => {
      viewer.addEventListener("load", resolve, { once: true });
      viewer.addEventListener("error", () => reject(new Error("load failed")), { once: true });
    });

    hideArLoading();
    viewer.activateAR();

    viewer.addEventListener("ar-status", (e) => {
      if (e.detail.status === "not-presenting") viewer.remove();
    });
  } catch {
    hideArLoading();
    openAndroidSceneViewer(dish);
  }
}

function openAndroidSceneViewer(dish) {
  window.location.href = androidSceneViewerUrl(dish);
}

async function openAr(dish) {
  selectedDish = dish;

  if (!isMobileArCandidate()) {
    showArFallback(dish);
    return;
  }

  if (isIos()) {
    openIosQuickLook(dish);
    return;
  }

  if (isAndroid()) {
    const hasWebXr = await checkWebXrAr();
    if (hasWebXr) {
      await openAndroidWebXrAr(dish);
    } else {
      openAndroidSceneViewer(dish);
    }
    return;
  }

  showArFallback(dish);
}

function createArButton(dish) {
  if (isIos() && dish.usdz) {
    const link = document.createElement("a");
    const img = document.createElement("img");
    const label = document.createElement("span");

    link.className = "button button-primary";
    link.href = iosQuickLookUrl(dish);
    link.rel = "ar";
    img.className = "ar-link-image";
    img.alt = "";
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    label.textContent = "Poser sur ma table";
    link.append(img, label);
    link.addEventListener("click", () => {
      selectedDish = dish;
    });
    return link;
  }

  if (isAndroid()) {
    const link = document.createElement("a");
    link.className = "button button-primary";
    link.href = androidSceneViewerUrl(dish);
    link.textContent = "Poser sur ma table";
    link.addEventListener("click", () => {
      selectedDish = dish;
    });
    return link;
  }

  const button = document.createElement("button");
  button.className = "button button-primary";
  button.type = "button";
  button.textContent = "Poser sur ma table";
  button.addEventListener("click", () => openAr(dish));
  return button;
}

// --- Partage ---

async function shareDish(dish) {
  const url = dishUrl(dish);

  if (navigator.share) {
    try {
      await navigator.share({
        title: `${dish.name} — Brasserie Michot`,
        text: `Découvrez le ${dish.name} en réalité augmentée`,
        url
      });
    } catch { /* annulé par l'utilisateur */ }
    return;
  }

  try {
    await navigator.clipboard.writeText(url);
    showToast("Lien copié !");
  } catch { /* presse-papier non disponible */ }
}

// --- Création des cartes ---

function createDishCard(dish) {
  if (!dish.has3d) return createClassicCard(dish);

  const card = document.createElement("article");
  card.className = "dish-card";

  const preview = document.createElement("div");
  preview.className = "dish-preview";

  const placeholder = document.createElement("div");
  placeholder.className = "dish-placeholder";
  placeholder.setAttribute("aria-hidden", "true");

  const badge = document.createElement("span");
  badge.textContent = "3D";
  placeholder.append(badge);
  preview.append(placeholder);

  const content = document.createElement("div");
  content.className = "dish-content";

  const line = document.createElement("div");
  line.className = "dish-line";

  const title = document.createElement("h2");
  title.textContent = dish.name;

  const priceEl = document.createElement("span");
  priceEl.className = "price";
  priceEl.textContent = formatPrice(dish.price);

  line.append(title, priceEl);

  const desc = document.createElement("p");
  desc.textContent = dish.description;

  const actions = document.createElement("div");
  actions.className = "dish-actions";

  const viewButton = document.createElement("button");
  viewButton.className = "button button-secondary";
  viewButton.type = "button";
  viewButton.textContent = "Voir mon plat";
  viewButton.addEventListener("click", () => openDish(dish));

  const arButton = createArButton(dish);

  const shareBtn = document.createElement("button");
  shareBtn.className = "button button-icon";
  shareBtn.type = "button";
  shareBtn.setAttribute("aria-label", "Partager");
  shareBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`;
  shareBtn.addEventListener("click", () => shareDish(dish));

  actions.append(viewButton, arButton, shareBtn);
  content.append(line, desc, actions);
  card.append(preview, content);

  return card;
}

function createSectionTitle(title) {
  const div = document.createElement("div");
  div.className = "menu-section-title";
  const span = document.createElement("span");
  span.textContent = title;
  div.append(span);
  return div;
}

function createClassicCard(item) {
  const card = document.createElement("article");
  card.className = "classic-card";

  const info = document.createElement("div");

  const title = document.createElement("h2");
  title.textContent = item.name;

  const desc = document.createElement("p");
  desc.textContent = item.description;

  info.append(title, desc);

  const priceEl = document.createElement("span");
  priceEl.className = "price";
  priceEl.textContent = formatPrice(item.price);

  card.append(info, priceEl);
  return card;
}

// --- Rendu ---

sectionOrder.forEach((section) => {
  dishGrid.append(createSectionTitle(section));

  if (section === "Boissons") {
    drinks.forEach((drink) => dishGrid.append(createClassicCard(drink)));
    return;
  }

  dishes
    .filter((d) => d.section === section)
    .forEach((d) => dishGrid.append(createDishCard(d)));
});

// --- Événements du dialog ---

closeDialog.addEventListener("click", () => dialog.close());

dialog.addEventListener("close", () => {
  history.replaceState(null, "", location.pathname);
  viewerSlot.innerHTML = "";
  currentViewer = null;
  viewerSlot.classList.remove("viewer-slot--qr");
  loadBar.hidden = true;
});

dialog.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close();
});

dialogAr.addEventListener("click", async () => {
  if (currentViewer && typeof currentViewer.activateAR === "function") {
    currentViewer.activateAR();
    return;
  }

  if (selectedDish) await openAr(selectedDish);
});

dialogShare.addEventListener("click", () => {
  if (selectedDish) shareDish(selectedDish);
});

// --- Hash routing : ouverture directe d'un plat via URL ---

const hashMatch = location.hash.match(/^#plat=(.+)$/);
if (hashMatch) {
  const dish = dishes.find((d) => d.has3d && dishSlug(d) === hashMatch[1]);
  if (dish) openDish(dish);
}
