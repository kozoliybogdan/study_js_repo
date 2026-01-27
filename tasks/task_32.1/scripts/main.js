const API_BASE_URL = 'https://www.omdbapi.com/';
const API_KEY = '8a313b38';

const searchInput = document.getElementById('searchInput');
const suggestionsEl = document.getElementById('suggestions');

const featuredEl = document.getElementById('featured');
const errorBlock = document.getElementById('error');
const loadingBadge = document.getElementById('loading');

const FEATURED_IDS = [
    'tt0111161', // Shawshank redemption
    'tt0232500', // The Fast and the Furious (2001)
    'tt0317219', // Cars (2006)
    'tt0137523', // Fight Club (приклад)
    'tt1375666', // Inception
    'tt0133093', // The Matrix
    'tt0141842', // The Sopranos
    'tt0413300', // Spider-Man 3
];

function debounce(fn, delay) {
    let t;
    function d(...args) {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), delay);
    }
    d.cancel = () => clearTimeout(t);
    return d;
}

function setLoading(v) { loadingBadge.classList.toggle('hidden', !v); }
function setError(msg) {
    if (!msg) { errorBlock.textContent = ''; errorBlock.classList.add('hidden'); return; }
    errorBlock.textContent = msg;
    errorBlock.classList.remove('hidden');
}

async function fetchById(imdbID) {
    const url = `${API_BASE_URL}?apikey=${API_KEY}&i=${encodeURIComponent(imdbID)}&plot=short`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.Response === 'False') throw new Error(data.Error || 'OMDb error');
    return data;
}

async function searchMovies(query) {
    const url = `${API_BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie&page=1`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data;
}

function toPoster(p) {
    return (p && p !== 'N/A') ? p : 'https://via.placeholder.com/200x300?text=No+Poster';
}

function escapeHtml(str) {
    return String(str)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", "&#039;");
}

function renderFeaturedCard(movie) {
    const card = document.createElement('article');
    card.className = 'card';
    card.style.cursor = 'pointer';

    card.innerHTML = `
    <img class="poster" src="${toPoster(movie.Poster)}" alt="${escapeHtml(movie.Title)}" loading="lazy" />
    <div class="card__body">
      <h3 class="card__title">${escapeHtml(movie.Title)}</h3>
      <p class="card__meta">
        <span class="pill">${escapeHtml(movie.Year)}</span>
        <span class="pill">${escapeHtml(movie.Type)}</span>
      </p>
    </div>
  `;

    card.addEventListener('click', () => {
        window.location.href = `./movie.html?id=${encodeURIComponent(movie.imdbID)}`;
    });

    return card;
}

async function loadFeatured() {
    try {
        setError('');
        setLoading(true);

        featuredEl.innerHTML = '';

        const movies = await Promise.all(FEATURED_IDS.map(id => fetchById(id)));
        movies.forEach(m => featuredEl.appendChild(renderFeaturedCard(m)));
    } catch (e) {
        setError(`Не вдалося завантажити заготовки: ${e.message}`);
    } finally {
        setLoading(false);
    }
}

function hideSuggestions() {
    suggestionsEl.classList.add('hidden');
    suggestionsEl.innerHTML = '';
}

function showSuggestions(items) {
    if (!items.length) {
        hideSuggestions();
        return;
    }

    suggestionsEl.innerHTML = items.slice(0, 7).map(item => `
    <div class="suggestion-item" data-id="${escapeHtml(item.imdbID)}">
      <img class="suggestion-poster" src="${toPoster(item.Poster)}" alt="" />
      <div class="suggestion-text">
        <div class="suggestion-title">${escapeHtml(item.Title)}</div>
        <div class="suggestion-sub">${escapeHtml(item.Year)} • ${escapeHtml(item.Type)}</div>
      </div>
    </div>
  `).join('');

    suggestionsEl.classList.remove('hidden');
}

suggestionsEl.addEventListener('click', (e) => {
    const item = e.target.closest('.suggestion-item');
    if (!item) return;

    const id = item.dataset.id;
    hideSuggestions();
    window.location.href = `./movie.html?id=${encodeURIComponent(id)}`;
});

const debouncedSuggest = debounce(async () => {
    const q = searchInput.value.trim();

    if (q.length < 2) {
        hideSuggestions();
        return;
    }

    try {
        const data = await searchMovies(q);
        if (data.Response === 'False' || !data.Search) {
            hideSuggestions();
            return;
        }
        showSuggestions(data.Search);
    } catch {
        hideSuggestions();
    }
}, 300);

searchInput.addEventListener('input', () => {
    debouncedSuggest();
});

document.addEventListener('click', (e) => {
    if (e.target !== searchInput && !suggestionsEl.contains(e.target)) {
        hideSuggestions();
    }
});

loadFeatured();