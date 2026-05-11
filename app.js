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
const dishGrid = document.querySelector("#dishGrid");
const dialog = document.querySelector("#dishDialog");
const dialogTitle = document.querySelector("#dialogTitle");
const viewerSlot = document.querySelector("#viewerSlot");
const dialogNote = document.querySelector("#dialogNote");
const loadBar = document.querySelector("#loadBar");
const loadBarFill = document.querySelector("#loadBarFill");
const closeDialog = document.querySelector("#closeDialog");
const dialogAr = document.querySelector("#dialogAr");

let selectedDish = null;
let modelViewerPromise = null;

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

function showArFallback() {
  dialogTitle.textContent = "AR disponible sur mobile compatible";
  dialogNote.textContent =
    "Ouvre cette page en HTTPS sur iPhone avec Safari ou sur Android compatible ARCore.";
  viewerSlot.innerHTML = "";

  if (!dialog.open) {
    dialog.showModal();
    closeDialog.focus();
  }
}

function openIosQuickLook(dish) {
  if (!dish.usdz) {
    showArFallback();
    return;
  }

  const link = document.createElement("a");
  const img = document.createElement("img");

  link.rel = "ar";
  link.href = absoluteAssetUrl(usdzPath(dish));
  link.style.display = "none";
  img.alt = "";
  link.append(img);
  document.body.append(link);
  link.click();
  link.remove();
}

function ensureModelViewer() {
  if (customElements.get("model-viewer")) {
    return Promise.resolve();
  }

  if (!modelViewerPromise) {
    modelViewerPromise = import("https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js")
      .catch(() => {
        modelViewerPromise = null;
        throw new Error("Impossible de charger la bibliotheque 3D. Verifiez votre connexion internet.");
      });
  }

  return modelViewerPromise;
}

async function prepareViewer(dish) {
  await ensureModelViewer();
  viewerSlot.innerHTML = "";

  const viewer = document.createElement("model-viewer");
  dialogTitle.textContent = dish.name;
  viewer.src = modelPath(dish.file);
  if (dish.usdz) {
    viewer.setAttribute("ios-src", usdzPath(dish));
  }
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

  viewer.addEventListener("load", () => {
    loadBar.hidden = true;
  }, { once: true });

  viewer.addEventListener("error", () => {
    loadBar.hidden = true;
  }, { once: true });

  viewerSlot.append(viewer);
  return viewer;
}

async function openDish(dish) {
  selectedDish = dish;
  dialogTitle.textContent = dish.name;
  dialogNote.textContent = "Chargement du plat en 3D…";
  viewerSlot.innerHTML = "";
  dialog.showModal();
  closeDialog.focus();

  try {
    const viewer = await prepareViewer(dish);
    viewer.addEventListener("load", () => {
      dialogNote.textContent = "";
    }, { once: true });
  } catch (error) {
    loadBar.hidden = true;
    dialogNote.textContent = error.message || "La vue 3D n'a pas pu se charger sur cet appareil.";
  }
}

async function openAr(dish) {
  selectedDish = dish;

  if (!isMobileArCandidate()) {
    showArFallback();
    return;
  }

  if (isIos()) {
    openIosQuickLook(dish);
    return;
  }

  if (isAndroid()) {
    dialogTitle.textContent = dish.name;
    dialogNote.textContent = "Preparation de la realite augmentee…";
    viewerSlot.innerHTML = "";
    dialog.showModal();
    closeDialog.focus();

    try {
      const viewer = await prepareViewer(dish);
      dialogNote.textContent = "";
      viewer.activateAR();
    } catch (error) {
      loadBar.hidden = true;
      dialogNote.textContent = error.message || "Impossible de lancer la realite augmentee.";
    }
    return;
  }

  showArFallback();
}

function createDishCard(dish) {
  if (!dish.has3d) {
    return createClassicCard(dish);
  }

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
  priceEl.textContent = `${dish.price}€`;

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

  const arButton = document.createElement("button");
  arButton.className = "button button-primary";
  arButton.type = "button";
  arButton.textContent = "Poser sur ma table";
  arButton.addEventListener("click", () => openAr(dish));

  actions.append(viewButton, arButton);
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
  priceEl.textContent = `${item.price}€`;

  card.append(info, priceEl);
  return card;
}

sectionOrder.forEach((section) => {
  dishGrid.append(createSectionTitle(section));

  if (section === "Boissons") {
    drinks.forEach((drink) => dishGrid.append(createClassicCard(drink)));
    return;
  }

  dishes
    .filter((dish) => dish.section === section)
    .forEach((dish) => dishGrid.append(createDishCard(dish)));
});

closeDialog.addEventListener("click", () => dialog.close());

dialog.addEventListener("close", () => {
  viewerSlot.innerHTML = "";
  loadBar.hidden = true;
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

dialogAr.addEventListener("click", async () => {
  if (!selectedDish) return;
  await openAr(selectedDish);
});
