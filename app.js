const menuSections = [
  {
    id: "aperos",
    title: "Apéros à partager",
    kicker: "Ouverture de table",
    note: "À poser au centre, à picorer, à faire tourner.",
    tone: "pink"
  },
  {
    id: "entrees",
    title: "Entrées",
    kicker: "Frais & croustillant",
    note: "Du vert, du doré, de l'iodé, le premier vrai relief de la carte.",
    tone: "mint"
  },
  {
    id: "plats",
    title: "Plats",
    kicker: "Le grand moment",
    note: "Assiettes généreuses, sauces, frites, poissons et pièces à partager du regard.",
    tone: "tomato"
  },
  {
    id: "moules",
    title: "Le kilo de moules",
    kicker: "Casserole culte",
    note: "Un kilo, un parfum, des frites, et la table qui devient bruyante.",
    tone: "sea"
  },
  {
    id: "burgers",
    title: "Burgers frites",
    kicker: "Pain brioché",
    note: "Généreux, fondants, croustillants, avec steak supplémentaire +8.- sur demande.",
    tone: "mustard"
  },
  {
    id: "enfants",
    title: "Pour les moins de 12 ans",
    kicker: "Mini formats",
    note: "Simple, lisible, rassurant, avec le même plaisir de table.",
    tone: "sky"
  },
  {
    id: "desserts",
    title: "Desserts",
    kicker: "Final sucré",
    note: "Chocolat, gaufre, glaces, fruits rôtis et coupes très gourmandes.",
    tone: "cream"
  }
];

const dishes = [
  {
    id: "planchette",
    section: "aperos",
    name: "Planchette",
    description: "Produits soigneusement sélectionnés pour un apéritif généreux et convivial.",
    price: "16.- / 26.-",
    tags: ["Petite", "Grande"],
    tone: "wood"
  },
  {
    id: "cremeux-carottes",
    section: "aperos",
    name: "Crémeux de carottes rôties",
    description: "Cumin toasté, douceur de carotte rôtie et yaourt citronné.",
    price: "12.-",
    tags: ["Végétarien"],
    tone: "amber"
  },
  {
    id: "tapenade-artichaut",
    section: "aperos",
    name: "Tapenade d'artichaut",
    description: "Noix de cajou, chips au sumac et note orientale citronnée.",
    price: "13.-",
    tags: ["Végétarien"],
    tone: "green"
  },
  {
    id: "platte-kaas",
    section: "aperos",
    name: "Platte kaas",
    description: "Fromage à tartiner crémeux, frais et très traditionnel.",
    price: "10.-",
    tags: ["Tradition"],
    tone: "cream"
  },
  {
    id: "trio-aperos",
    section: "aperos",
    name: "Trio d'apéros",
    description: "Nos trois préparations maison réunies sur une même planche.",
    price: "24.-",
    tags: ["Maison"],
    tone: "blue"
  },
  {
    id: "salade-verte",
    section: "entrees",
    name: "Salade verte et graines torréfiées",
    description: "Du vert, du croquant et du frais dans l'assiette.",
    price: "8.-",
    tags: ["Végétarien"],
    tone: "green"
  },
  {
    id: "salade-melee",
    section: "entrees",
    name: "Salade mêlée aux légumes du moment",
    description: "Bol coloré de légumes de saison pour une entrée pleine de vitalité.",
    price: "13.-",
    tags: ["Végétarien"],
    tone: "green"
  },
  {
    id: "cremeux-falafels",
    section: "entrees",
    name: "Crémeux de carottes et falafels",
    description: "Velouté parfumé, falafels croustillants et touche pleine de caractère.",
    price: "16.-",
    tags: ["Végétarien"],
    tone: "amber"
  },
  {
    id: "tartare-thon-entree",
    section: "entrees",
    name: "Tartare de thon à la violette de Liège",
    description: "Préparation fine, fraîche et subtilement acidulée.",
    price: "19.-",
    tags: ["Iodé"],
    tone: "violet"
  },
  {
    id: "croquette-crevettes",
    section: "entrees",
    name: "Croquette de crevettes",
    description: "Grand classique doré, iodé, au cœur onctueux.",
    price: "8.- / 15.50",
    tags: ["1 pièce", "2 pièces"],
    tone: "gold"
  },
  {
    id: "croquette-moules",
    section: "entrees",
    name: "Croquette de moules",
    description: "Farce délicate et parfumée dans un enrobage croustillant.",
    price: "7.50 / 14.50",
    tags: ["1 pièce", "2 pièces"],
    tone: "blue"
  },
  {
    id: "croquette-fromages",
    section: "entrees",
    name: "Croquette de fromages",
    description: "Panure croustillante et cœur fondant au fromage.",
    price: "7.- / 13.50",
    tags: ["Végétarien"],
    tone: "cream"
  },
  {
    id: "mix-croquettes",
    section: "entrees",
    name: "Mix de croquettes",
    description: "Le duo irrésistible pour les indécis.",
    price: "15.-",
    tags: ["Duo"],
    tone: "red"
  },
  {
    id: "tartare-thon-plat",
    section: "plats",
    name: "Tartare de thon à la violette de Liège",
    description: "Version généreuse, servie avec frites croustillantes et salade fraîche.",
    price: "35.-",
    tags: ["Frites", "Salade"],
    tone: "violet"
  },
  {
    id: "filets-perches",
    section: "plats",
    name: "Filets de perches meunière",
    description: "Tendres et dorés au beurre, avec frites, salade et sauce tartare maison.",
    price: "38.50",
    tags: ["Poisson"],
    tone: "blue"
  },
  {
    id: "carbonnade",
    section: "plats",
    name: "Palette de bœuf braisée 12h",
    description: "Façon carbonnade, sauce de caractère et stoemp crémeux.",
    price: "35.-",
    tags: ["12h", "Stoemp"],
    tone: "brown"
  },
  {
    id: "boulet-liegeoise",
    section: "plats",
    name: "Le boulet à la liégeoise",
    description: "Rond, dodu, moelleux, servi avec sauce liégeoise, carottes et frites.",
    price: "31.-",
    tags: ["Signature"],
    tone: "red"
  },
  {
    id: "ardoise-entrecote",
    section: "plats",
    name: "Ardoise d'entrecôte",
    description: "Belle pièce servie sur ardoise avec sauces, frites et salade. Foie gras +8.-",
    price: "42.-",
    tags: ["Signature"],
    tone: "red"
  },
  {
    id: "waterzooi",
    section: "plats",
    name: "Waterzooi de volaille jaune à la Wittekop",
    description: "Poulet tendre, bouillon crémeux aux légumes, bière blanche et pommes de terre.",
    price: "31.-",
    tags: ["Bière blanche"],
    tone: "cream"
  },
  {
    id: "dorade-paix-dieu",
    section: "plats",
    name: "Dorade à la Paix Dieu",
    description: "Poisson en papillote, légumes et note aromatique de Paix Dieu.",
    price: "40.-",
    tags: ["Poisson"],
    tone: "blue"
  },
  {
    id: "feta-courge",
    section: "plats",
    name: "Feta rôtie sur purée de courge",
    description: "Feta dorée, purée de courge, toast à l'ail et petite salade fraîche.",
    price: "24.-",
    tags: ["Végétarien"],
    tone: "amber"
  },
  {
    id: "moules-marinieres",
    section: "moules",
    name: "Marinières",
    description: "Vin blanc, oignons et herbes pour la recette intemporelle.",
    price: "29.-",
    tags: ["Classique"],
    tone: "blue"
  },
  {
    id: "moules-bleu",
    section: "moules",
    name: "Au bleu",
    description: "Sauce crémeuse et fromage puissant pour un plat réconfortant.",
    price: "32.-",
    tags: ["Crème"],
    tone: "cream"
  },
  {
    id: "moules-ail",
    section: "moules",
    name: "À l'ail",
    description: "Ail doucement revenu et sauce enveloppante.",
    price: "32.-",
    tags: ["Aromatique"],
    tone: "green"
  },
  {
    id: "moules-diable",
    section: "moules",
    name: "Diable rouge",
    description: "Préparation relevée, vive et généreuse.",
    price: "32.-",
    tags: ["Relevé"],
    tone: "red"
  },
  {
    id: "moules-provencale",
    section: "moules",
    name: "À la provençale",
    description: "Tomates et herbes, le soleil dans la cassolette.",
    price: "32.-",
    tags: ["Tomate"],
    tone: "amber"
  },
  {
    id: "moules-ardennaise",
    section: "moules",
    name: "À l'ardennaise",
    description: "Crème, champignons fondants et lardons fumés.",
    price: "32.-",
    tags: ["Fumé"],
    tone: "brown"
  },
  {
    id: "moules-citron",
    section: "moules",
    name: "Citron confit, ail & persil",
    description: "Touche méditerranéenne, acidulée, fraîche et aromatique.",
    price: "32.-",
    tags: ["Citron confit"],
    tone: "green"
  },
  {
    id: "burger-carre",
    section: "burgers",
    name: "Le Carré",
    description: "Pain brioché, steak de bœuf local, fromage, cornichons et sauce secrète.",
    price: "27.-",
    tags: ["Classique"],
    tone: "red"
  },
  {
    id: "burger-gourmet",
    section: "burgers",
    name: "Le Gourmet au foie gras et brie",
    description: "Foie gras poêlé, brie, confit d'oignons, roquette et mayonnaise truffe.",
    price: "34.-",
    tags: ["Hiver"],
    tone: "brown"
  },
  {
    id: "burger-signature",
    section: "burgers",
    name: "Le Signature, cheddar coulant",
    description: "Lard grillé, sauce secrète et nappage de cheddar chaud à table.",
    price: "32.-",
    tags: ["Spectacle"],
    tone: "gold"
  },
  {
    id: "burger-flamand",
    section: "burgers",
    name: "Le Flamand",
    description: "Beignets de saumon suisse à la bière, roquette, tomates confites et pickles.",
    price: "28.-",
    tags: ["Saumon"],
    tone: "blue"
  },
  {
    id: "burger-vege",
    section: "burgers",
    name: "Le Végé",
    description: "Galette quinoa-pois chiches, courge aigre-douce, feta et cream cheese citronné.",
    price: "27.-",
    tags: ["Végétarien"],
    tone: "green"
  },
  {
    id: "burger-crousti",
    section: "burgers",
    name: "Le Crousti'Carré",
    description: "Poulet panko, cheddar, coleslaw au raifort et sauce fumée au relish.",
    price: "28.-",
    tags: ["Croustillant"],
    tone: "amber"
  },
  {
    id: "petit-burger",
    section: "enfants",
    name: "Petit burger",
    description: "Pain brioché, ketchup, fromage fondant, steak de bœuf local et frites.",
    price: "14.-",
    tags: ["Enfant"],
    tone: "red"
  },
  {
    id: "moules-enfant",
    section: "enfants",
    name: "Moules marinières enfant",
    description: "Demi-cassolette douce pour découvrir un emblème du Carré.",
    price: "14.50",
    tags: ["Enfant"],
    tone: "blue"
  },
  {
    id: "fish-and-chips",
    section: "enfants",
    name: "Fish & chips",
    description: "Poisson pané, croustillant dehors et moelleux dedans, avec frites.",
    price: "12.-",
    tags: ["Enfant"],
    tone: "gold"
  },
  {
    id: "steak-hache",
    section: "enfants",
    name: "Steak haché & frites",
    description: "Steak haché tendre servi avec nos frites croustillantes.",
    price: "11.-",
    tags: ["Enfant"],
    tone: "brown"
  },
  {
    id: "gaufre-liege",
    section: "desserts",
    name: "Gaufre de Liège",
    description: "Gaufre dorée et caramélisée, glace vanille et chocolat coulant.",
    price: "11.-",
    tags: ["Doré"],
    tone: "gold"
  },
  {
    id: "cremeux-chocolat",
    section: "desserts",
    name: "Crémeux tiède au chocolat",
    description: "Fondant intense, simple, chaud et irrésistible.",
    price: "11.-",
    tags: ["Chocolat"],
    tone: "brown"
  },
  {
    id: "mi-fondant-cookie",
    section: "desserts",
    name: "Mi-fondant mi-cookies",
    description: "Deux textures, biscuit croustillant et moelleux fondant.",
    price: "13.-",
    tags: ["Gourmand"],
    tone: "brown"
  },
  {
    id: "ile-flottante",
    section: "desserts",
    name: "L'île flottante",
    description: "Meringue légère sur crème anglaise à la vanille.",
    price: "11.-",
    tags: ["Vanille"],
    tone: "cream"
  },
  {
    id: "pomme-rotie",
    section: "desserts",
    name: "Pomme rôtie, érable, cannelle",
    description: "Pomme lentement rôtie et sorbet gingembre pour un chaud-froid d'hiver.",
    price: "11.-",
    tags: ["Chaud-froid"],
    tone: "amber"
  },
  {
    id: "tiramisu-speculos",
    section: "desserts",
    name: "Tiramisu au spéculos et amaretto",
    description: "Classique revisité, épices de spéculos et chaleur de l'amaretto.",
    price: "11.-",
    tags: ["Spéculos"],
    tone: "brown"
  },
  {
    id: "cafe-gourmand",
    section: "desserts",
    name: "Café gourmand",
    description: "Expresso accompagné d'un assortiment de mini-desserts maison.",
    price: "15.-",
    tags: ["Maison"],
    tone: "red"
  },
  {
    id: "fromages-suisses",
    section: "desserts",
    name: "Assiette de fromages suisses",
    description: "Sélection affinée pour le caractère, la texture et les arômes.",
    price: "14.-",
    tags: ["Fromages"],
    tone: "cream"
  },
  {
    id: "dame-blanche",
    section: "desserts",
    name: "Dame blanche",
    description: "Glace vanille, chocolat chaud maison et chantilly légère.",
    price: "12.-",
    tags: ["Coupe"],
    tone: "cream"
  },
  {
    id: "cafe-liegeois",
    section: "desserts",
    name: "Café liégeois",
    description: "Coupe glacée au café, crème fouettée et notes sucrées.",
    price: "12.-",
    tags: ["Coupe"],
    tone: "brown"
  },
  {
    id: "coupe-arrosee",
    section: "desserts",
    name: "Coupe arrosée",
    description: "Abricotine ou Williamine servie à table.",
    price: "12.-",
    tags: ["Abricotine", "Williamine"],
    tone: "amber"
  },
  {
    id: "glaces-sorbets",
    section: "desserts",
    name: "Glaces et sorbets de l'artisan glacier",
    description: "Vanille, café, chocolat, caramel beurre salé, fruits et parfums du Valais.",
    price: "3.80 / 10.-",
    tags: ["1 boule", "3 boules"],
    tone: "blue"
  }
];

const demoDish = {
  id: "demo-objet-2",
  name: "Objet (2)",
  description: "Objet (2) de démonstration AR, placé en haut pour une présentation rapide.",
  price: "Démo",
  tags: ["Démo AR"],
  tone: "green",
  hasAr: true,
  file: "objet (2).glb",
  usdz: "objet (2).usdz",
  cameraOrbit: "35deg 66deg 1.05m",
  scale: "1.55 1.55 1.55"
};

const modelPath = (file) => `assets/models/${encodeURIComponent(file)}`;
const usdzPath = (dish) => `assets/models/${encodeURIComponent(dish.usdz || dish.file.replace(/\.glb$/i, ".usdz"))}`;
const absoluteAssetUrl = (path) => new URL(path, window.location.href).href;
const formatPrice = (price) => `CHF ${price}`;

const dishGrid = document.querySelector("#dishGrid");
const categoryRail = document.querySelector("#categoryRail");
const heroArButton = document.querySelector("#heroArButton");
const dialog = document.querySelector("#dishDialog");
const dialogTitle = document.querySelector("#dialogTitle");
const viewerSlot = document.querySelector("#viewerSlot");
const dialogNote = document.querySelector("#dialogNote");
const loadBar = document.querySelector("#loadBar");
const loadBarFill = document.querySelector("#loadBarFill");
const closeDialog = document.querySelector("#closeDialog");

let selectedDish = null;
let progressFrame = null;
let loadingStartedAt = 0;
const MIN_AR_PREP_MS = 1900;

const featuredDish = demoDish;

function dishSlug(dish) {
  return dish.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function dishUrl(dish) {
  return new URL(`#plat=${dishSlug(dish)}`, window.location.href).href;
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

function iosQuickLookUrl(dish) {
  const params = new URLSearchParams({
    callToAction: "Retour à la carte",
    checkoutTitle: dish.name,
    checkoutSubtitle: "Le Carré · Vevey",
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

function createDishVisual(dish, size = "normal") {
  const visual = document.createElement("div");
  visual.className = `dish-visual dish-visual--${dish.tone || "gold"} dish-visual--${size}`;
  visual.setAttribute("aria-hidden", "true");

  const pack = document.createElement("span");
  pack.className = "dish-pack";

  const packBrand = document.createElement("span");
  packBrand.className = "dish-pack-brand";
  packBrand.textContent = "LE CARRÉ";

  const flavour = document.createElement("span");
  flavour.className = "dish-pack-flavour";
  flavour.textContent = dish.name.split(" ").slice(0, 2).join(" ");

  const chipOne = document.createElement("span");
  chipOne.className = "dish-chip dish-chip--one";

  const chipTwo = document.createElement("span");
  chipTwo.className = "dish-chip dish-chip--two";

  const splash = document.createElement("span");
  splash.className = "dish-splash";

  pack.append(packBrand, flavour);
  visual.append(splash, pack, chipOne, chipTwo);
  return visual;
}

function setArProgress(percent, note) {
  loadBar.hidden = false;
  loadBarFill.style.width = `${percent}%`;
  if (note) dialogNote.textContent = note;
}

function stopFakeProgress() {
  if (progressFrame) {
    window.cancelAnimationFrame(progressFrame);
    progressFrame = null;
  }
}

function progressCurve(t) {
  if (t < 0.16) {
    return 7 + (t / 0.16) * 12;
  }

  if (t < 0.48) {
    const local = (t - 0.16) / 0.32;
    return 19 + Math.pow(local, 0.78) * 31;
  }

  if (t < 0.78) {
    const local = (t - 0.48) / 0.3;
    return 50 + (1 - Math.pow(1 - local, 2.2)) * 23;
  }

  const local = (t - 0.78) / 0.22;
  return 73 + (1 - Math.pow(1 - local, 3)) * 15;
}

function startFakeProgress() {
  stopFakeProgress();
  loadingStartedAt = performance.now();

  const tick = (now) => {
    const elapsed = now - loadingStartedAt;
    const t = Math.min(elapsed / 2300, 1);
    loadBarFill.style.width = `${progressCurve(t).toFixed(1)}%`;
    progressFrame = window.requestAnimationFrame(tick);
  };

  progressFrame = window.requestAnimationFrame(tick);
}

function waitForMinimumPrep(extraDelay = 0) {
  const elapsed = performance.now() - loadingStartedAt;
  const remaining = Math.max(0, MIN_AR_PREP_MS + extraDelay - elapsed);
  return new Promise((resolve) => window.setTimeout(resolve, remaining));
}

async function finishArProgress(note) {
  await waitForMinimumPrep();
  stopFakeProgress();
  setArProgress(94, note);
  await new Promise((resolve) => window.setTimeout(resolve, 220));
  setArProgress(100, note);
}

function showArPreparing(dish) {
  selectedDish = dish;
  dialogTitle.textContent = "Préparation AR";
  dialogNote.textContent = `${dish.name} prend sa place, juste avant d'arriver sur votre table.`;
  viewerSlot.innerHTML = "";
  viewerSlot.classList.remove("viewer-slot--qr");
  viewerSlot.classList.add("viewer-slot--prep");

  const prep = document.createElement("div");
  prep.className = "ar-prep";
  prep.innerHTML = `
    <div class="ar-prep-logo"><img src="assets/brand/le-carre-logo.png" alt="" /></div>
    <div class="ar-prep-copy">
      <strong>On prépare votre table</strong>
      <span>Un instant, l'objet quitte la carte pour rejoindre la table.</span>
    </div>
    <div class="ar-prep-dots" aria-hidden="true"><span></span><span></span><span></span></div>
  `;
  viewerSlot.append(prep);

  loadBar.hidden = false;
  loadBarFill.style.width = "0%";
  startFakeProgress();

  if (!dialog.open) {
    dialog.showModal();
  }
}

function closeArDialogSoon(delay = 1200) {
  stopFakeProgress();
  window.setTimeout(() => {
    if (dialog.open) dialog.close();
  }, delay);
}

function showArFallback(dish) {
  const url = dish ? dishUrl(dish) : window.location.href;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=210x210&data=${encodeURIComponent(url)}&bgcolor=FBF7EE&color=163C8C&margin=1`;

  dialogTitle.textContent = "Téléphone ou tablette";
  dialogNote.textContent = "Scannez ce code sur téléphone ou tablette, puis touchez Poser sur ma table.";
  stopFakeProgress();
  loadBar.hidden = true;

  viewerSlot.innerHTML = "";
  viewerSlot.classList.remove("viewer-slot--prep");
  viewerSlot.classList.add("viewer-slot--qr");

  const img = document.createElement("img");
  img.src = qrSrc;
  img.className = "qr-code";
  img.alt = "QR code pour ouvrir l'expérience AR";
  img.width = 210;
  img.height = 210;
  viewerSlot.append(img);

  if (!dialog.open) dialog.showModal();
}

async function openIosQuickLook(dish) {
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
  await finishArProgress("Ouverture de l'expérience AR...");
  link.click();
  link.remove();
  closeArDialogSoon();
}

async function openAndroidSceneViewer(dish) {
  await finishArProgress("Ouverture de l'expérience AR...");
  window.setTimeout(() => {
    window.location.href = androidSceneViewerUrl(dish);
  }, 320);
}

async function openAr(dish) {
  if (!dish || !dish.hasAr) return;

  showArPreparing(dish);

  if (!isMobileArCandidate()) {
    window.setTimeout(() => showArFallback(dish), 2600);
    return;
  }

  if (isIos()) {
    await openIosQuickLook(dish);
    return;
  }

  if (isAndroid()) {
    await openAndroidSceneViewer(dish);
    return;
  }

  showArFallback(dish);
}

function createArButton(dish) {
  const button = document.createElement("button");
  button.className = "button button-primary button-ar";
  button.type = "button";
  button.textContent = "Poser sur ma table";
  button.addEventListener("click", () => openAr(dish));
  return button;
}

function createSectionNav() {
  menuSections.forEach((section, index) => {
    const link = document.createElement("a");
    link.href = `#${section.id}`;
    link.className = `nav-chip nav-chip--${section.tone}`;
    link.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span>${section.title}`;
    categoryRail.append(link);
  });
}

function createSectionTitle(section) {
  const head = document.createElement("header");
  head.className = `section-head section-head--${section.tone}`;

  const copy = document.createElement("div");
  const kicker = document.createElement("p");
  kicker.className = "section-kicker";
  kicker.textContent = section.kicker;

  const title = document.createElement("h2");
  title.textContent = section.title;

  copy.append(kicker, title);

  const note = document.createElement("p");
  note.className = "section-note";
  note.textContent = section.note;

  const stamp = document.createElement("span");
  stamp.className = "section-stamp";
  stamp.textContent = "LC";

  head.append(copy, note, stamp);
  return head;
}

function createTagList(tags = []) {
  const list = document.createElement("div");
  list.className = "tag-list";

  tags.forEach((tag) => {
    const span = document.createElement("span");
    span.textContent = tag;
    list.append(span);
  });

  return list;
}

function createDishCard(dish) {
  const card = document.createElement("article");
  card.className = `dish-card dish-card--${dish.tone || "gold"}`;
  if (dish.hasAr) card.classList.add("dish-card--ar");

  const preview = document.createElement("div");
  preview.className = "dish-preview";
  preview.append(createDishVisual(dish));

  const content = document.createElement("div");
  content.className = "dish-content";

  const line = document.createElement("div");
  line.className = "dish-line";

  const title = document.createElement("h3");
  title.textContent = dish.name;

  const priceEl = document.createElement("span");
  priceEl.className = "price";
  priceEl.textContent = formatPrice(dish.price);

  line.append(title, priceEl);

  const desc = document.createElement("p");
  desc.textContent = dish.description;

  const tags = createTagList(dish.tags);

  const header = document.createElement("div");
  header.className = "dish-meta";
  const flavour = document.createElement("span");
  flavour.textContent = "Saveur";
  const code = document.createElement("strong");
  code.textContent = dish.id.slice(0, 3).toUpperCase();
  header.append(flavour, code);

  content.append(header, line, desc, tags);

  if (dish.hasAr) {
    const actions = document.createElement("div");
    actions.className = "dish-actions";
    actions.append(createArButton(dish));
    content.append(actions);
  }

  card.append(preview, content);
  return card;
}

function renderMenu() {
  createSectionNav();

  menuSections.forEach((section) => {
    const sectionEl = document.createElement("section");
    sectionEl.className = "menu-section";
    sectionEl.id = section.id;
    sectionEl.append(createSectionTitle(section));

    const grid = document.createElement("div");
    grid.className = "dish-grid";

    dishes
      .filter((dish) => dish.section === section.id)
      .forEach((dish) => grid.append(createDishCard(dish)));

    sectionEl.append(grid);
    dishGrid.append(sectionEl);
  });
}

closeDialog.addEventListener("click", () => dialog.close());

dialog.addEventListener("close", () => {
  stopFakeProgress();
  viewerSlot.innerHTML = "";
  viewerSlot.classList.remove("viewer-slot--qr");
  viewerSlot.classList.remove("viewer-slot--prep");
  loadBar.hidden = true;
  loadBarFill.style.width = "0%";
});

dialog.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close();
});

heroArButton.addEventListener("click", () => openAr(featuredDish));

renderMenu();
