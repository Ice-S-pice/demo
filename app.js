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
const dishGrid = document.querySelector("#dishGrid");
const dialog = document.querySelector("#dishDialog");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogViewer = document.querySelector("#dialogViewer");
const dialogNote = document.querySelector("#dialogNote");
const closeDialog = document.querySelector("#closeDialog");
const dialogAr = document.querySelector("#dialogAr");
const previewQueue = [];

let selectedDish = null;
let selectedViewer = null;
let isLoadingPreview = false;

function isMobileArCandidate() {
  const userAgent = navigator.userAgent || "";
  return /Android|iPhone|iPad|iPod/i.test(userAgent);
}

function showArFallback(dish) {
  dialogTitle.textContent = "AR disponible sur mobile compatible";
  dialogNote.textContent =
    "Ouvre cette page sur iPhone avec Safari ou sur Android compatible ARCore. Un hebergement HTTPS est recommande pour l'AR.";
  dialogViewer.src = modelPath(dish.file);
  dialogViewer.setAttribute("ios-src", usdzPath(dish.file));
  dialogViewer.alt = `${dish.name} en 3D`;

  if (!dialog.open) {
    dialog.showModal();
  }
}

function requestIdle(callback) {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(callback, { timeout: 1200 });
    return;
  }

  window.setTimeout(callback, 120);
}

function loadPreview(viewer) {
  if (viewer.dataset.loaded === "true") {
    return;
  }

  viewer.dataset.loaded = "true";
  viewer.src = viewer.dataset.src;
  viewer.setAttribute("ios-src", viewer.dataset.iosSrc);
}

function processPreviewQueue() {
  if (isLoadingPreview || previewQueue.length === 0) {
    return;
  }

  isLoadingPreview = true;
  const viewer = previewQueue.shift();

  requestIdle(() => {
    loadPreview(viewer);
    viewer.addEventListener(
      "load",
      () => {
        isLoadingPreview = false;
        processPreviewQueue();
      },
      { once: true }
    );

    window.setTimeout(() => {
      isLoadingPreview = false;
      processPreviewQueue();
    }, 1800);
  });
}

function queuePreview(viewer) {
  if (viewer.dataset.queued === "true" || viewer.dataset.loaded === "true") {
    return;
  }

  viewer.dataset.queued = "true";
  previewQueue.push(viewer);
  processPreviewQueue();
}

function openDish(dish) {
  selectedDish = dish;
  selectedViewer = null;
  dialogTitle.textContent = dish.name;
  dialogNote.textContent = "";
  dialogViewer.src = modelPath(dish.file);
  dialogViewer.setAttribute("ios-src", usdzPath(dish.file));
  dialogViewer.alt = `${dish.name} en 3D`;
  dialog.showModal();
}

async function openAr(dish, viewer) {
  selectedDish = dish;
  selectedViewer = viewer;
  loadPreview(viewer);

  if (!isMobileArCandidate()) {
    showArFallback(dish);
    return;
  }

  try {
    if (viewer.canActivateAR) {
      await viewer.activateAR();
      return;
    }
  } catch (error) {
    console.warn("Impossible de lancer l'AR:", error);
  }

  showArFallback(dish);
}

function setPreviewMotion(viewer, enabled) {
  if (enabled) {
    viewer.setAttribute("auto-rotate", "");
    return;
  }

  viewer.removeAttribute("auto-rotate");
}

function createDishCard(dish) {
  const card = document.createElement("article");
  card.className = "dish-card";

  card.innerHTML = `
    <div class="dish-preview">
      <model-viewer
        data-src="${modelPath(dish.file)}"
        data-ios-src="${usdzPath(dish.file)}"
        alt="${dish.name} en 3D"
        rotation-per-second="8deg"
        interaction-prompt="none"
        camera-orbit="25deg 70deg auto"
        shadow-intensity="0.32"
        environment-image="neutral"
        exposure="0.88"
        loading="lazy"
        reveal="auto"
        ar
        ar-modes="quick-look scene-viewer webxr"
        ar-scale="fixed">
      </model-viewer>
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

  const viewer = card.querySelector("model-viewer");
  const [viewButton, arButton] = card.querySelectorAll("button");

  card.addEventListener("pointerenter", () => setPreviewMotion(viewer, true));
  card.addEventListener("pointerleave", () => setPreviewMotion(viewer, false));
  card.addEventListener("touchstart", () => setPreviewMotion(viewer, true), { passive: true });

  viewButton.addEventListener("click", () => openDish(dish));
  arButton.addEventListener("click", () => openAr(dish, viewer));

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

const previewObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        queuePreview(entry.target);
        previewObserver.unobserve(entry.target);
      }
    });
  },
  { rootMargin: "260px 0px", threshold: 0.01 }
);

document.querySelectorAll(".dish-preview model-viewer").forEach((viewer) => {
  previewObserver.observe(viewer);
});

closeDialog.addEventListener("click", () => dialog.close());

dialog.addEventListener("close", () => {
  dialogViewer.removeAttribute("src");
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

dialogAr.addEventListener("click", async () => {
  if (selectedDish && selectedViewer) {
    await openAr(selectedDish, selectedViewer);
    return;
  }

  if (!selectedDish) {
    return;
  }

  if (!isMobileArCandidate()) {
    showArFallback(selectedDish);
    return;
  }

  try {
    if (dialogViewer.canActivateAR) {
      await dialogViewer.activateAR();
      return;
    }
  } catch (error) {
    console.warn("Impossible de lancer l'AR:", error);
  }

  showArFallback(selectedDish);
});
