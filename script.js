const languageSelect = document.getElementById("language");

const translations = {
    ru: {
        nav: ["Возможности", "О проекте", "Карта"],
        eyebrow: "ГОРОД БЕЗ БАРЬЕРОВ",
        title: "Москва становится<br>ближе для каждого",
        description: "ELDER MAP помогает пожилым людям находить удобные маршруты, места отдыха и важные объекты города.",
        button: "Найти маршрут →",
        features: "Возможности ELDER MAP",
        cards: [
            ["Удобные маршруты", "Прогулки с учётом доступности и комфорта."],
            ["Места отдыха", "Находим скамейки, туалеты и места для отдыха."],
            ["Важные объекты", "Аптеки, медицинские учреждения и магазины."]
        ],
        about: "Свобода передвижения — для всех",
        aboutText: "Наша задача — сделать город понятнее, доступнее и комфортнее для пожилых людей.",
        map: "Карта города",
        mapText: "Скоро здесь появится интерактивная карта Москвы.",
        mapPlaceholder: "📍  Карта ELDER MAP",
        footer: "© 2026 ELDER MAP. Город без барьеров."
    },

    en: {
        nav: ["Features", "About", "Map"],
        eyebrow: "A CITY WITHOUT BARRIERS",
        title: "Making Moscow<br>closer for everyone",
        description: "ELDER MAP helps older people find convenient routes, resting places and important city facilities.",
        button: "Find a route →",
        features: "ELDER MAP features",
        cards: [
            ["Accessible routes", "Walking routes designed for comfort and accessibility."],
            ["Resting places", "Find benches, toilets and places to relax."],
            ["Important places", "Pharmacies, medical facilities and shops."]
        ],
        about: "Freedom of movement for everyone",
        aboutText: "Our mission is to make the city easier to understand, more accessible and comfortable for older people.",
        map: "City map",
        mapText: "An interactive map of Moscow will appear here soon.",
        mapPlaceholder: "📍  ELDER MAP",
        footer: "© 2026 ELDER MAP. A city without barriers."
    },

    uz: {
        nav: ["Imkoniyatlar", "Loyiha haqida", "Xarita"],
        eyebrow: "TO'SIQLARSIZ SHAHAR",
        title: "Moskva hamma uchun<br>yanada yaqin",
        description: "ELDER MAP keksalarga qulay yo'nalishlar, dam olish joylari va muhim shahar obyektlarini topishga yordam beradi.",
        button: "Yo'nalishni topish →",
        features: "ELDER MAP imkoniyatlari",
        cards: [
            ["Qulay yo'nalishlar", "Qulaylik va foydalanish imkoniyatini hisobga olgan yo'nalishlar."],
            ["Dam olish joylari", "O'rindiqlar, hojatxonalar va dam olish joylarini toping."],
            ["Muhim obyektlar", "Dorixonalar, tibbiyot muassasalari va do'konlar."]
        ],
        about: "Har bir inson uchun erkin harakat",
        aboutText: "Maqsadimiz — shaharni keksalar uchun tushunarli, qulay va ochiq qilish.",
        map: "Shahar xaritasi",
        mapText: "Tez orada bu yerda Moskvaning interaktiv xaritasi paydo bo'ladi.",
        mapPlaceholder: "📍  ELDER MAP xaritasi",
        footer: "© 2026 ELDER MAP. To'siqlarsiz shahar."
    },

    de: {
        nav: ["Funktionen", "Über das Projekt", "Karte"],
        eyebrow: "EINE STADT OHNE BARRIEREN",
        title: "Moskau wird für alle<br>ein Stück näher",
        description: "ELDER MAP hilft älteren Menschen, bequeme Routen, Ruheplätze und wichtige Einrichtungen zu finden.",
        button: "Route finden →",
        features: "Funktionen von ELDER MAP",
        cards: [
            ["Barrierefreie Routen", "Spazierwege mit Blick auf Komfort und Barrierefreiheit."],
            ["Ruheplätze", "Finde Sitzbänke, Toiletten und Erholungsorte."],
            ["Wichtige Einrichtungen", "Apotheken, medizinische Einrichtungen und Geschäfte."]
        ],
        about: "Bewegungsfreiheit für alle",
        aboutText: "Unsere Aufgabe ist es, die Stadt für ältere Menschen verständlicher, zugänglicher und komfortabler zu machen.",
        map: "Stadtkarte",
        mapText: "Hier erscheint bald eine interaktive Karte von Moskau.",
        mapPlaceholder: "📍  ELDER MAP Karte",
        footer: "© 2026 ELDER MAP. Eine Stadt ohne Barrieren."
    }
};

let currentLanguage = "ru";

function changeLanguage(lang) {
    const t = translations[lang];

    if (!t) {
        alert("Dieser Sprache fügen wir in einem der nächsten Schritte hinzu!");
        languageSelect.value = currentLanguage;
        return;
    }

    currentLanguage = lang;

    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach((link, index) => {
        link.textContent = t.nav[index];
    });

    document.querySelector(".eyebrow").textContent = t.eyebrow;
    document.querySelector(".hero h1").innerHTML = t.title;
    document.querySelector(".description").textContent = t.description;
    document.querySelector(".main-button").textContent = t.button;

    document.querySelector(".features h2").textContent = t.features;

    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {
        card.querySelector("h3").textContent = t.cards[index][0];
        card.querySelector("p").textContent = t.cards[index][1];
    });

    document.querySelector(".about h2").textContent = t.about;
    document.querySelector(".about p").textContent = t.aboutText;

    document.querySelector(".map-section h2").textContent = t.map;
    document.querySelector(".map-section p").textContent = t.mapText;
    document.querySelector(".map-placeholder").textContent = t.mapPlaceholder;

    document.querySelector("footer").textContent = t.footer;

    document.documentElement.lang = lang;

    localStorage.setItem("elderMapLanguage", lang);
}

languageSelect.addEventListener("change", function () {
    changeLanguage(this.value);
});

const savedLanguage = localStorage.getItem("elderMapLanguage") || "ru";

languageSelect.value = savedLanguage;
changeLanguage(savedLanguage);
// Создаём карту Москвы
const map = L.map('map').setView([55.751244, 37.618423], 11);

// Подключаем OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Слой для маркеров
const markersLayer = L.layerGroup().addTo(map);
async function showPlaces(category) {
    const categories = {
        pharmacy: [
            ["amenity", "pharmacy"]
        ],
        hospital: [
    ["amenity", "hospital"],
    ["amenity", "clinic"]
],
        rest: [
            ["leisure", "park"]
        ],
        toilet: [
            ["amenity", "toilets"]
        ],
        museum: [
            ["tourism", "museum"]
        ],

        // Новые категории
        restaurant: [
            ["amenity", "restaurant"],
            ["amenity", "cafe"],
            ["amenity", "fast_food"]
        ],
        grocery: [
            ["shop", "supermarket"],
            ["shop", "convenience"]
        ],
        fitness: [
            ["leisure", "fitness_centre"],
            ["leisure", "sports_centre"]
        ],
        atm: [
            ["amenity", "atm"]
        ],
        bar: [
            ["amenity", "bar"],
            ["amenity", "pub"]
        ],
        beauty: [
            ["shop", "beauty"],
            ["shop", "hairdresser"]
        ],
        cinema: [
            ["amenity", "cinema"]
        ],
        hotel: [
            ["tourism", "hotel"],
            ["tourism", "hostel"]
        ],
        sauna: [
            ["leisure", "sauna"],
            ["amenity", "public_bath"]
        ],
        mall: [
            ["shop", "mall"]
        ]
    };

    const selected = categories[category];

    if (!selected) {
        alert("Такая категория пока не поддерживается.");
        return;
    }

    const filters = selected.map(([type, value]) => `
        node["${type}"="${value}"](area.searchArea);
        way["${type}"="${value}"](area.searchArea);
    `).join("");

    const query = `
        [out:json][timeout:40];
        area["name"="Москва"]["admin_level"="4"]->.searchArea;
        (
            ${filters}
        );
        out center;
    `;

    try {
        const response = await fetch(
            "https://overpass.kumi.systems/api/interpreter",
            {
                method: "POST",
                body: query
            }
        );

        if (!response.ok) {
            throw new Error("Ошибка сервера: " + response.status);
        }

        const data = await response.json();

        if (!data.elements.length) {
            alert("Места этой категории не найдены.");
            return;
        }

        markersLayer.clearLayers();

data.elements.forEach(place => {
    const lat = place.lat || place.center?.lat;
    const lon = place.lon || place.center?.lon;

    if (lat == null || lon == null) return;

    const name = place.tags?.name || "Без названия";

    L.marker([lat, lon])
        .addTo(markersLayer)
        .bindPopup(`<b>${name}</b>`);
});

const bounds = markersLayer.getBounds();

if (bounds.isValid()) {
    map.fitBounds(bounds, { padding: [30, 30] });
}

alert(`Найдено мест: ${markersLayer.getLayers().length}`);

    } catch (error) {
        console.error(error);
        alert("Не удалось загрузить места. Попробуй ещё раз.");
    }
}