const API_BASE_URL = "https://www.omdbapi.com/";
const API_KEY = "8a313b38";

const detailsEl = document.getElementById("movieDetails");
const errorBlock = document.getElementById("error");
const loadingBadge = document.getElementById("loading");

function setLoading(v) {
  loadingBadge.classList.toggle("hidden", !v);
}
function setError(msg) {
  if (!msg) {
    errorBlock.textContent = "";
    errorBlock.classList.add("hidden");
    return;
  }
  errorBlock.textContent = msg;
  errorBlock.classList.remove("hidden");
}

function toPoster(p) {
  return p && p !== "N/A"
    ? p
    : "https://via.placeholder.com/400x600?text=No+Poster";
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function fetchDetails(imdbID) {
  const url = `${API_BASE_URL}?apikey=${API_KEY}&i=${encodeURIComponent(imdbID)}&plot=full`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (data.Response === "False") throw new Error(data.Error || "OMDb error");
  return data;
}

function renderRatings(ratings = []) {
  if (!Array.isArray(ratings) || !ratings.length)
    return '<p class="muted">Нема рейтингів</p>';

  const rows = ratings
    .map(
      (r) => `
    <tr>
      <td>${escapeHtml(r.Source)}</td>
      <td>${escapeHtml(r.Value)}</td>
    </tr>
  `,
    )
    .join("");

  return `
    <table class="ratings">
      <thead><tr><th>Джерело</th><th>Оцінка</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function renderDetails(m) {
  detailsEl.innerHTML = `
    <div class="details">
      <img class="details__poster" src="${toPoster(m.Poster)}" alt="${escapeHtml(m.Title)}" />

      <div class="details__info">
        <h2 class="details__title">${escapeHtml(m.Title)} <span class="muted">(${escapeHtml(m.Year)})</span></h2>

        <div class="details__pills">
          <span class="pill">${escapeHtml(m.Rated)}</span>
          <span class="pill">${escapeHtml(m.Runtime)}</span>
          <span class="pill">${escapeHtml(m.Genre)}</span>
          <span class="pill">${escapeHtml(m.Country)}</span>
          <span class="pill">${escapeHtml(m.Language)}</span>
        </div>

        <p class="details__plot">${escapeHtml(m.Plot)}</p>

        <div class="details__grid">
          <div><span class="muted">Реліз:</span> ${escapeHtml(m.Released)}</div>
          <div><span class="muted">Режисер:</span> ${escapeHtml(m.Director)}</div>
          <div><span class="muted">Сценарій:</span> ${escapeHtml(m.Writer)}</div>
          <div><span class="muted">Актори:</span> ${escapeHtml(m.Actors)}</div>
          <div><span class="muted">Нагороди:</span> ${escapeHtml(m.Awards)}</div>
          <div><span class="muted">BoxOffice:</span> ${escapeHtml(m.BoxOffice)}</div>
          <div><span class="muted">IMDb:</span> ${escapeHtml(m.imdbRating)} (${escapeHtml(m.imdbVotes)} votes)</div>
          <div><span class="muted">Metascore:</span> ${escapeHtml(m.Metascore)}</div>
          <div><span class="muted">Type:</span> ${escapeHtml(m.Type)}</div>
          <div><span class="muted">imdbID:</span> ${escapeHtml(m.imdbID)}</div>
        </div>

        <h3 class="details__subtitle">Рейтинги</h3>
        ${renderRatings(m.Ratings)}
      </div>
    </div>
  `;
}

async function init() {
  const id = getIdFromUrl();
  if (!id) {
    setError("Нема imdbID у посиланні. Повернись на головну і обери фільм.");
    return;
  }

  try {
    setError("");
    setLoading(true);
    const data = await fetchDetails(id);
    renderDetails(data);
  } catch (e) {
    setError(`Не вдалося завантажити деталі: ${e.message}`);
  } finally {
    setLoading(false);
  }
}

init();
