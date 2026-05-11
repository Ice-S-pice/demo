const dishes = [
  {
    name: "T-bone steak medium",
    section: "Plats principaux",
    file: "Miller and Carter T-bone steak medium.glb",
    description: "Jus corse, beurre noisette, herbes fraiches.",
    price: "34"
  },
  {
    name: "Poulet teriyaki",
    section: "Plats principaux",
    file: "Teriyaki Chicken.glb",
    description: "Poulet laque, sesame, garniture fraiche.",
    price: "24"
  },
  {
    name: "Plateau de fruits",
    section: "Desserts",
    file: "Halloween Fruit platter.glb",
    description: "Fruits frais, dressage de saison.",
    price: "18"
  },
  {
    name: "Sunday dinner",
    section: "Plats principaux",
    file: "DexH - Sunday dinner - bbq beef chicken salad lasagna lunch the kitchen fairy.glb",
    description: "Assiette genereuse, sauce chaude, legumes.",
    price: "27"
  },
  {
    name: "Christmas steak",
    section: "Plats principaux",
    file: "Christmas steak.glb",
    description: "Piece grillee, notes roties, sauce reduite.",
    price: "32"
  },
  {
    name: "Donut chocolat",
    section: "Desserts",
    file: "Chocolate Donut.glb",
    description: "Glacage chocolat, texture moelleuse.",
    price: "9"
  },
  {
    name: "Breakfast Kabuki",
    section: "Entrees",
    file: "Breakfast Kabuki @ San Francisco.glb",
    description: "Brunch frais, chaud et croustillant.",
    price: "21"
  },
  {
    name: "Caesar salad",
    section: "Entrees",
    file: "3-D Caesar salad Seattle.glb",
    description: "Laitue croquante, copeaux, croutons.",
    price: "17"
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
const usdzPath = (file) => {
  const usdzFile = `3dpea.com_${file.replace(/\.glb$/i, ".usdz")}`;
  return `assets/models/${encodeURIComponent(usdzFile)}`;
};
const absoluteAssetUrl = (path) => new URL(path, window.location.href).href;
const dishGrid = document.querySelector("#dishGrid");
const dialog = document.querySelector("#dishDialog");
const dialogTitle = document.querySelector("#dialogTitle");
const viewerSlot = document.querySelector("#viewerSlot");
const dialogNote = document.querySelector("#dialogNote");
const closeDialog = document.querySelector("#closeDialog");
const dialogAr = document.querySelector("#dialogAr");

let selectedDish = null;
let modelViewerPromise = null;

function isMobileArCandidate() {
  const userAgent = navigator.userAgent || "";
  return /Android|iPhone|iPad|iPod/i.test(userAgent);
}

function isIos() {
  const userAgent = navigator.userAgent || "";
  const platform = navigator.platform || "";
  return /iPhone|iPad|iPod/i.test(userAgent) || (platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function isAndroid() {
  return /Android/i.test(navigator.userAgent || "");
}

function showArFallback(dish) {
  dialogTitle.textContent = "AR disponible sur mobile compatible";
  dialogNote.textContent =
    "Ouvre cette page en HTTPS sur iPhone avec Safari ou sur Android compatible ARCore. Si le modele est trop lourd, l'ouverture peut prendre du temps.";
  viewerSlot.innerHTML = "";

  if (!dialog.open) {
    dialog.showModal();
  }
}

function openIosQuickLook(dish) {
  const link = document.createElement("a");
  const img = document.createElement("img");

  link.rel = "ar";
  link.href = absoluteAssetUrl(usdzPath(dish.file));
  link.style.display = "none";
  img.alt = "";
  link.append(img);
  document.body.append(link);
  link.click();
  link.remove();
}

function openAndroidSceneViewer(dish) {
  const fileUrl = absoluteAssetUrl(modelPath(dish.file));
  const fallbackUrl = encodeURIComponent(window.location.href);
  const sceneViewerUrl =
    `intent://arvr.google.com/scene-viewer/1.2?file=${encodeURIComponent(fileUrl)}` +
    `&mode=ar_preferred&resizable=true#Intent;scheme=https;` +
    `package=com.google.android.googlequicksearchbox;` +
    `action=android.intent.action.VIEW;` +
    `S.browser_fallback_url=${fallbackUrl};end;`;

  window.location.href = sceneViewerUrl;
}

function ensureModelViewer() {
  if (customElements.get("model-viewer")) {
    return Promise.resolve();
  }

  if (!modelViewerPromise) {
    modelViewerPromise = import("https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js");
  }

  return modelViewerPromise;
}

async function prepareViewer(dish) {
  await ensureModelViewer();
  viewerSlot.innerHTML = "";

  const viewer = document.createElement("model-viewer");
  dialogTitle.textContent = dish.name;
  viewer.src = modelPath(dish.file);
  viewer.setAttribute("ios-src", usdzPath(dish.file));
  viewer.alt = `${dish.name} en 3D`;
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
  viewer.setAttribute("ar-modes", "quick-look scene-viewer webxr");
  viewer.setAttribute("ar-scale", "fixed");
  viewerSlot.append(viewer);
}

async function openDish(dish) {
  selectedDish = dish;
  dialogTitle.textContent = dish.name;
  dialogNote.textContent = "Chargement du plat en 3D...";
  viewerSlot.innerHTML = "";
  dialog.showModal();

  try {
    await prepareViewer(dish);
    dialogNote.textContent = "";
  } catch (error) {
    console.warn("Impossible de charger la 3D:", error);
    dialogNote.textContent = "La vue 3D n'a pas pu se charger sur cet appareil.";
  }
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

  if (isAndroid() && window.location.protocol === "https:") {
    openAndroidSceneViewer(dish);
    return;
  }

  showArFallback(dish);
}

function createDishCard(dish) {
  const card = document.createElement("article");
  card.className = "dish-card";

  card.innerHTML = `
    <div class="dish-preview">
      <div class="dish-placeholder" aria-hidden="true">
        <span>3D</span>
      </div>
    </div>
    <div class="dish-content">
      <div class="dish-line">
        <h2>${dish.name}</h2>
        <span class="price">${dish.price}€</span>
      </div>
      <p>${dish.description}</p>
      <div class="dish-actions">
        <button class="button button-secondary" type="button">Voir mon plat</button>
        <button class="button button-primary" type="button">Poser sur ma table</button>
      </div>
    </div>
  `;

  const [viewButton, arButton] = card.querySelectorAll("button");

  viewButton.addEventListener("click", () => openDish(dish));
  arButton.addEventListener("click", () => openAr(dish));

  return card;
}

function createSectionTitle(title) {
  const sectionTitle = document.createElement("div");
  sectionTitle.className = "menu-section-title";
  sectionTitle.innerHTML = `<span>${title}</span>`;
  return sectionTitle;
}

function createDrinkCard(drink) {
  const card = document.createElement("article");
  card.className = "drink-card";

  card.innerHTML = `
    <div>
      <h2>${drink.name}</h2>
      <p>${drink.description}</p>
    </div>
    <span class="price">${drink.price}€</span>
  `;

  return card;
}

sectionOrder.forEach((section) => {
  dishGrid.append(createSectionTitle(section));

  if (section === "Boissons") {
    drinks.forEach((drink) => dishGrid.append(createDrinkCard(drink)));
    return;
  }

  dishes
    .filter((dish) => dish.section === section)
    .forEach((dish) => dishGrid.append(createDishCard(dish)));
});

closeDialog.addEventListener("click", () => dialog.close());

dialog.addEventListener("close", () => {
  viewerSlot.innerHTML = "";
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

dialogAr.addEventListener("click", async () => {
  if (!selectedDish) {
    return;
  }

  await openAr(selectedDish);
});
