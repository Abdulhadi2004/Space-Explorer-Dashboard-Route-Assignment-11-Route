// WRITE YOUR JS CODE HERE
let todayInSpace = document.getElementById("today-in-space");
const apiKey = "t7EIqf7kAwkistv7M4fMnXci8lWGCjqvrf9EJkpn";
let launchesData = [];
let allPlanetsData = [];
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".app-section");
const planetConfig = {
  mercury: { color: "#eab308", order: 1 },
  venus: { color: "#f97316", order: 2 },
  earth: { color: "#3b82f6", order: 3 },
  mars: { color: "#ef4444", order: 4 },
  jupiter: { color: "#fb923c", order: 5 },
  saturn: { color: "#facc15", order: 6 },
  uranus: { color: "#06b6d4", order: 7 },
  neptune: { color: "#2563eb", order: 8 },
};

async function getAPOD(dateStr) {
  try {
    let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    if (dateStr) {
      url += `&date=${dateStr}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    displayTodayInSpace(data);
  } catch (error) {
    console.error("error while getting data", error);
    todayInSpace.innerHTML = `<p class="text-red-500 text-center mt-10">Failed to load data. Please check the date or your connection.</p>`;
  }
}

getAPOD();

function displayTodayInSpace(data) {
  const formattedDate = formatDate(data.date);
  const shortDate = formatShortDate(data.date);

  let mediaContent = "";
  if (data.media_type === "video") {
    mediaContent = `
      <iframe 
        src="${data.url}" 
        class="w-full h-full" 
        frameborder="0" 
        allowfullscreen>
      </iframe>`;
  } else {
    mediaContent = `
      <img
        id="apod-image"
        class="w-full h-full object-cover"
        src="${data.url}"
        alt="${data.title}"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div class="absolute bottom-6 left-6 right-6">
          <button class="w-full py-3 bg-white/10 backdrop-blur-md rounded-lg font-semibold hover:bg-white/20 transition-colors">
            <i class="fas fa-expand mr-2 text-white"></i>
            <a href="${
              data.hdurl || data.url
            }" target="_blank" class="text-white">View Full Resolution</a>
          </button>
        </div>
      </div>
    `;
  }

  let box = `<div class="max-w-7xl mx-auto">
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
          >
            <div>
              <h2 class="text-xl md:text-2xl font-space font-bold mb-1">
                Today in Space
              </h2>
              <p id="apod-date" class="text-slate-400 text-xs md:text-sm">
                Astronomy Picture of the Day - ${formattedDate}
              </p>
            </div>
            <div class="flex items-center space-x-2 md:space-x-3">
              <label for="apod-date-input" class="date-input-wrapper">
                <input
                  type="date"
                  id="apod-date-input"
                  class="custom-date-input"
                  value="${data.date}"
                  max="${new Date().toISOString().split("T")[0]}"
                  min="1995-06-16"
                />
                <span class="text-sm">${shortDate}</span>
              </label>
              <button
                id="load-date-btn"
                class="px-3 md:px-4 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold text-sm flex items-center space-x-1 md:space-x-2"
              >
                <i class="fas fa-search"></i>
                <span class="hidden sm:inline">Load</span>
              </button>
              <button
                id="today-apod-btn"
                onclick="getAPOD();"
                class="px-3 md:px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-colors font-semibold text-sm"
              >
                Today
              </button>
            </div>
          </div>
          <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            <div class="xl:col-span-2">
              <div
                id="apod-image-container"
                class="relative rounded-2xl overflow-hidden group h-[300px] md:h-[400px] lg:h-[600px] bg-slate-800/50 flex items-center justify-center"
              >
                <div id="apod-loading" class="text-center hidden">
                  <i
                    class="fas fa-spinner fa-spin text-4xl text-blue-400 mb-4"
                  ></i>
                  <p class="text-slate-400">Loading today's image...</p>
                </div>
                <!-- Using a placeholder image or one from assets if available. Using a reliable external placeholder for now or a relative path if we knew one. Sticking to a colored placeholder div if no image, but let's try a realistic placeholder or just the rocket icon style used elsewhere if we want to be safe. But user wants design. I'll use a relative path assuming assets exist or a generic space placeholder. -->
                        ${mediaContent}
              </div>
            </div>
            <div class="space-y-4 md:space-y-6">
              <div
                class="bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6"
              >
                <h3
                  id="apod-title"
                  class="text-lg md:text-2xl font-semibold mb-3 md:mb-4"
                >
                  ${data.title}
                </h3>
                <div
                  class="flex items-center space-x-4 mb-4 text-sm text-slate-400"
                >
                  <span id="apod-date-detail"
                    ><i class="far fa-calendar mr-2"></i>${formattedDate}</span
                  >
                </div>
                <p
                  id="apod-explanation"
                  class="text-slate-300 leading-relaxed mb-4"
                >
                 ${data.explanation}
                </p>
                <div
                  id="apod-copyright"
                  class="text-xs text-slate-400 italic mb-4"
                >
                  &copy; NASA/JPL
                </div>
              </div>
              <div
                class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
              >
                <h4 class="font-semibold mb-3 flex items-center">
                  <i class="fas fa-info-circle text-blue-400 mr-2"></i>
                  Image Details
                </h4>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between">
                    <span class="text-slate-400">Date</span>
                    <span id="apod-date-info" class="font-medium"
                      >${formattedDate}</span
                    >
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-400">Media Type</span>
                    <span id="apod-media-type" class="font-medium">${
                      data.media_type
                    }</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-400">Source</span>
                    <span class="font-medium">NASA APOD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
  todayInSpace.innerHTML = box;
  setupEventListeners();
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

function formatShortDate(dateString) {
  const date = new Date(dateString);

  const options = { year: "numeric", month: "short", day: "numeric" };

  return date.toLocaleDateString("en-US", options);
}

function formatTime(dateString) {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

function getDaysUntil(dateString) {
  const launchDate = new Date(dateString);
  const now = new Date();
  const diffTime = launchDate - now;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function setupEventListeners() {
  const loadBtn = document.getElementById("load-date-btn");
  const dateInput = document.getElementById("apod-date-input");

  if (loadBtn && dateInput) {
    loadBtn.addEventListener("click", function () {
      const selectedDate = dateInput.value;
      if (selectedDate) {
        todayInSpace.innerHTML =
          '<div class="text-center text-white mt-20"><i class="fas fa-spinner fa-spin text-4xl"></i><p>Loading...</p></div>';
        getAPOD(selectedDate);
      }
    });
  }
}

function handleNavigation(event) {
  event.preventDefault();

  const clickedLink = event.currentTarget;

  const targetSectionId = clickedLink.getAttribute("href").substring(1);

  sections.forEach((section) => {
    if (section.id === targetSectionId) {
      section.classList.remove("hidden");
    } else {
      section.classList.add("hidden");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("bg-blue-500/10", "text-blue-400");
    link.classList.add("text-slate-300", "hover:bg-slate-800");
  });

  clickedLink.classList.remove("text-slate-300", "hover:bg-slate-800");
  clickedLink.classList.add("bg-blue-500/10", "text-blue-400");

  if (window.innerWidth < 1024) {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.remove("translate-x-0");
  }
}

navLinks.forEach((link) => {
  link.addEventListener("click", handleNavigation);
});

function getStatusColor(statusAbbrev) {
  if (statusAbbrev === "Go") return "bg-green-500/20 text-green-400";
  if (statusAbbrev === "TBC" || statusAbbrev === "TBD")
    return "bg-yellow-500/20 text-yellow-400";
  return "bg-blue-500/20 text-blue-400";
}

function getStatusBadgeColor(abbrev) {
  if (abbrev === "Go") return "bg-green-500/90";
  if (abbrev === "TBC" || abbrev === "TBD") return "bg-yellow-500/90";
  return "bg-blue-500/90";
}

async function getUpcomingLaunches() {
  const apiUrl =
    "https://ll.thespacedevs.com/2.3.0/launches/upcoming/?format=json&limit=10";

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("SpaceDevs Data:", data.results);

    launchesData = data.results;
    renderLaunches(launchesData);

    return launchesData;
  } catch (error) {
    console.error("Error fetching launches:", error);
  }
}

function renderLaunches(launches) {
  const featuredContainer = document.getElementById("featured-launch");
  const gridContainer = document.getElementById("launches-grid");

  if (!launches || launches.length === 0) return;

  const featured = launches[0];
  const daysUntil = getDaysUntil(featured.net);

  const featImage =
    featured.image && featured.image.image_url
      ? featured.image.image_url
      : null;
  const featMission = featured.mission
    ? featured.mission.description
    : "No mission description available for this launch.";
  const featCountry = featured.pad.location.country
    ? featured.pad.location.country.name
    : "Unknown";
  const statusClass = getStatusColor(featured.status.abbrev);

  featuredContainer.innerHTML = `
    <div class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
        <div class="flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-3 mb-4">
              <span class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2">
                <i class="fas fa-star"></i>
                Featured Launch
              </span>
              <span class="px-4 py-1.5 ${statusClass} rounded-full text-sm font-semibold">
                ${featured.status.abbrev}
              </span>
            </div>
            <h3 class="text-3xl font-bold mb-3 leading-tight">
              ${featured.name}
            </h3>
            <div class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400">
              <div class="flex items-center gap-2">
                <i class="fas fa-building"></i>
                <span>${featured.launch_service_provider.name}</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="fas fa-rocket"></i>
                <span>${featured.rocket.configuration.name}</span>
              </div>
            </div>
            <div class="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6">
              <i class="fas fa-clock text-2xl text-blue-400"></i>
              <div>
                <p class="text-2xl font-bold text-blue-400">${
                  daysUntil > 0 ? daysUntil : "Now"
                }</p>
                <p class="text-xs text-slate-400">Days Until Launch</p>
              </div>
            </div>
            <div class="grid xl:grid-cols-2 gap-4 mb-6">
              <div class="bg-slate-900/50 rounded-xl p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                  <i class="fas fa-calendar"></i> Launch Date
                </p>
                <p class="font-semibold">${formatDate(featured.net)}</p>
              </div>
              <div class="bg-slate-900/50 rounded-xl p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                  <i class="fas fa-clock"></i> Launch Time
                </p>
                <p class="font-semibold">${formatTime(featured.net)}</p>
              </div>
              <div class="bg-slate-900/50 rounded-xl p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                  <i class="fas fa-map-marker-alt"></i> Location
                </p>
                <p class="font-semibold text-sm">${
                  featured.pad.location.name
                }</p>
              </div>
              <div class="bg-slate-900/50 rounded-xl p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                  <i class="fas fa-globe"></i> Country
                </p>
                <p class="font-semibold">${featCountry}</p>
              </div>
            </div>
            <p class="text-slate-300 leading-relaxed mb-6 line-clamp-3">
              ${featMission}
            </p>
          </div>
          <div class="flex flex-col md:flex-row gap-3">
            <button class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2">
              <i class="fas fa-info-circle"></i> View Full Details
            </button>
            <div class="icons self-end md:self-center">
              <button class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors">
                <i class="far fa-heart"></i>
              </button>
              <button class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors">
                <i class="fas fa-bell"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="relative">
          <div class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50">
            ${
              featImage
                ? `<img src="${featImage}" class="w-full h-full object-cover" alt="${featured.name}" />`
                : `<div class="flex items-center justify-center h-full min-h-[400px] bg-slate-800"><i class="fas fa-rocket text-9xl text-slate-700/50"></i></div>`
            }
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  let gridHTML = "";

  for (let i = 1; i < launches.length; i++) {
    const launch = launches[i];
    const launchImage =
      launch.image && launch.image.image_url ? launch.image.image_url : null;
    const badgeColor = getStatusBadgeColor(launch.status.abbrev);

    gridHTML += `
      <div class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer">
        <div class="relative h-48 bg-slate-900/50 flex items-center justify-center overflow-hidden">
           ${
             launchImage
               ? `<img src="${launchImage}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="${launch.name}">`
               : `<i class="fas fa-space-shuttle text-5xl text-slate-700"></i>`
           }
          <div class="absolute top-3 right-3">
            <span class="px-3 py-1 ${badgeColor} text-white backdrop-blur-sm rounded-full text-xs font-semibold">
              ${launch.status.abbrev}
            </span>
          </div>
        </div>
        <div class="p-5">
          <div class="mb-3">
            <h4 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
              ${launch.name}
            </h4>
            <p class="text-sm text-slate-400 flex items-center gap-2">
              <i class="fas fa-building text-xs"></i>
              ${launch.launch_service_provider.name}
            </p>
          </div>
          <div class="space-y-2 mb-4">
            <div class="flex items-center gap-2 text-sm">
              <i class="fas fa-calendar text-slate-500 w-4"></i>
              <span class="text-slate-300">${formatDate(launch.net)}</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <i class="fas fa-clock text-slate-500 w-4"></i>
              <span class="text-slate-300">${formatTime(launch.net)}</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <i class="fas fa-rocket text-slate-500 w-4"></i>
              <span class="text-slate-300 line-clamp-1">${
                launch.rocket.configuration.name
              }</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
              <span class="text-slate-300 line-clamp-1">${
                launch.pad.location.name
              }</span>
            </div>
          </div>
          <div class="flex items-center gap-2 pt-4 border-t border-slate-700">
            <button class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold">
              Details
            </button>
            <button class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
              <i class="far fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  gridContainer.innerHTML = gridHTML;
}

getUpcomingLaunches();

async function getPlanets() {
  const apiUrl = "https://solar-system-opendata-proxy.vercel.app/api/planets";

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch planets");

    const data = await response.json();

    allPlanetsData = data.bodies.filter(
      (body) => body.englishName && planetConfig[body.englishName.toLowerCase()]
    );

    allPlanetsData.sort(
      (a, b) =>
        planetConfig[a.englishName.toLowerCase()].order -
        planetConfig[b.englishName.toLowerCase()].order
    );

    console.log("Sorted Planets:", allPlanetsData);

    renderPlanetGrid(allPlanetsData);
    renderComparisonTable(allPlanetsData);

    const earth = allPlanetsData.find((p) => p.id === "earth");
    if (earth) showPlanetDetails(earth);
  } catch (error) {
    console.error("Error:", error);
  }
}

function renderPlanetGrid(planets) {
  const gridContainer = document.getElementById("planets-grid");
  let html = "";

  planets.forEach((planet) => {
    const pName = planet.englishName.toLowerCase();
    const color = planetConfig[pName].color;
    const auDistance = (planet.semimajorAxis / 149597870).toFixed(2);

    html += `
      <div 
        class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
        onclick="handlePlanetClick('${planet.id}')"
        style="--planet-color: ${color}"
        onmouseover="this.style.borderColor='${color}80'"
        onmouseout="this.style.borderColor='#334155'"
      >
        <div class="relative mb-3 h-24 flex items-center justify-center">
          <img
            class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
            src="${planet.image}"
            alt="${planet.name}"
            loading="lazy"
          />
        </div>
        <h4 class="font-semibold text-center text-sm text-white">${planet.englishName}</h4>
        <p class="text-xs text-slate-400 text-center">${auDistance} AU</p>
      </div>
    `;
  });

  gridContainer.innerHTML = html;
}

function renderComparisonTable(planets) {
  const tbody = document.getElementById("planet-comparison-tbody");
  let html = "";

  planets.forEach((planet) => {
    const pName = planet.englishName.toLowerCase();
    const color = planetConfig[pName].color;
    const moonsCount = planet.moons ? planet.moons.length : 0;

    const distanceAU = (planet.semimajorAxis / 149597870).toFixed(2);
    const diameter = (planet.meanRadius * 2).toLocaleString();

    let massEarth = "N/A";
    if (planet.mass) {
      const planetMass =
        planet.mass.massValue * Math.pow(10, planet.mass.massExponent);
      const earthMass = 5.972 * 10e23;
      massEarth = (planetMass / 5.972e24).toFixed(3);
    }

    let typeBadge = "";
    if (planet.englishName === "Jupiter" || planet.englishName === "Saturn")
      typeBadge = "bg-yellow-500/50 text-yellow-200";
    else if (
      planet.englishName === "Uranus" ||
      planet.englishName === "Neptune"
    )
      typeBadge = "bg-cyan-500/50 text-cyan-200";
    else typeBadge = "bg-orange-500/50 text-orange-200";

    let orbitalPeriodDisplay = "";
    if (planet.sideralOrbit > 365) {
      orbitalPeriodDisplay =
        (planet.sideralOrbit / 365.25).toFixed(1) + " years";
    } else {
      orbitalPeriodDisplay = planet.sideralOrbit.toFixed(0) + " days";
    }

    html += `
      <tr class="hover:bg-slate-800/30 transition-colors cursor-pointer" onclick="handlePlanetClick('${
        planet.id
      }')">
        <td class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10">
          <div class="flex items-center space-x-2 md:space-x-3">
            <div class="w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0" style="background-color: ${color}"></div>
            <span class="font-semibold text-sm md:text-base whitespace-nowrap text-white">${
              planet.englishName
            }</span>
          </div>
        </td>
        <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">${distanceAU}</td>
        <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">${diameter}</td>
        <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">${massEarth}</td>
        <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">${orbitalPeriodDisplay}</td>
        <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">${moonsCount}</td>
        <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
            <span class="px-2 py-1 rounded text-xs ${typeBadge}">${
      ["Mercury", "Venus", "Earth", "Mars"].includes(planet.englishName)
        ? "Terrestrial"
        : ["Jupiter", "Saturn"].includes(planet.englishName)
        ? "Gas Giant"
        : "Ice Giant"
    }</span>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}
function handlePlanetClick(planetId) {
  const selectedPlanet = allPlanetsData.find((p) => p.id === planetId);
  if (selectedPlanet) {
    showPlanetDetails(selectedPlanet);

    document.getElementById("planets").scrollIntoView({ behavior: "smooth" });
  }
}

function showPlanetDetails(planet) {
  document.getElementById("planet-detail-image").src = planet.image;
  document.getElementById("planet-detail-name").innerText = planet.englishName;
  document.getElementById("planet-detail-description").innerText =
    planet.description || "No description available.";

  const massVal = planet.mass
    ? `${planet.mass.massValue} × 10^${planet.mass.massExponent} kg`
    : "N/A";

  const volVal = planet.vol
    ? `${planet.vol.volValue} × 10^${planet.vol.volExponent} km³`
    : "N/A";

  const distanceKm = (planet.semimajorAxis / 1000000).toFixed(1) + "M km";

  document.getElementById("planet-distance").innerText = distanceKm;
  document.getElementById("planet-radius").innerText =
    planet.meanRadius.toLocaleString() + " km";
  document.getElementById("planet-mass").innerText = massVal;
  document.getElementById("planet-density").innerText =
    planet.density + " g/cm³";
  document.getElementById("planet-orbital-period").innerText =
    planet.sideralOrbit.toFixed(2) + " days";
  document.getElementById("planet-rotation").innerText =
    Math.abs(planet.sideralRotation).toFixed(2) + " hours";
  document.getElementById("planet-moons").innerText = planet.moons
    ? planet.moons.length
    : 0;
  document.getElementById("planet-gravity").innerText =
    planet.gravity.toFixed(2) + " m/s²";

  const discDate =
    planet.discoveryDate === "" ? "Ancient times" : planet.discoveryDate;
  const discBy =
    planet.discoveredBy === "" ? "Known since antiquity" : planet.discoveredBy;

  document.getElementById("planet-discoverer").innerText = discBy;
  document.getElementById("planet-discovery-date").innerText = discDate;
  document.getElementById("planet-body-type").innerText = "Planet";
  document.getElementById("planet-volume").innerText = volVal;

  document.getElementById("planet-perihelion").innerText =
    (planet.perihelion / 1000000).toFixed(1) + "M km";
  document.getElementById("planet-aphelion").innerText =
    (planet.aphelion / 1000000).toFixed(1) + "M km";
  document.getElementById("planet-eccentricity").innerText =
    planet.eccentricity.toFixed(5);

  document.getElementById("planet-inclination").innerText =
    planet.inclination === 0 ? "N/A" : planet.inclination + "°";
  document.getElementById("planet-axial-tilt").innerText =
    planet.axialTilt + "°";

  document.getElementById("planet-temp").innerText = planet.avgTemp + "°C";
  document.getElementById("planet-escape").innerText =
    (planet.escape / 1000).toFixed(2) + " km/s";

  const factsList = document.getElementById("planet-facts");
  factsList.innerHTML = `
      <li class="flex items-start">
        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
        <span class="text-slate-300">Mass: ${massVal}</span>
      </li>
      <li class="flex items-start">
        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
        <span class="text-slate-300">Surface gravity: ${planet.gravity} m/s²</span>
      </li>
      <li class="flex items-start">
        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
        <span class="text-slate-300">Density: ${planet.density} g/cm³</span>
      </li>
      <li class="flex items-start">
        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
        <span class="text-slate-300">Axial tilt: ${planet.axialTilt}°</span>
      </li>
  `;
}

getPlanets();
