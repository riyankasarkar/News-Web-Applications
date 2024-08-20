const API_KEY = "7440909ac3ce4143acf2337d449d3397";
const url = "https://newsapi.org/v2/everything?q=";
const loader = document.querySelector('.loader');

async function fetchData(query) {
    showLoader();
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    hideLoader();
    return data;
}

function showLoader() {
    loader.classList.remove('hidden');
}

function hideLoader() {
    loader.classList.add('hidden');
}

// Initial data fetch
fetchData("all").then(data => renderMain(data.articles));

// Menu Button
let mobilemenu = document.querySelector(".mobile");
let menuBtn = document.querySelector(".menuBtn");

menuBtn.addEventListener("click", () => {
    mobilemenu.classList.toggle("hidden");
});

// Render News
function renderMain(arr) {
    let mainHTML = '';
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].urlToImage) {
            mainHTML += ` <div class="card">
                            <a href=${arr[i].url}>
                                <img src=${arr[i].urlToImage} loading="lazy" />
                                <h4>${arr[i].title}</h4>
                                <div class="publishbyDate">
                                    <p>${arr[i].source.name}</p>
                                    <span>•</span>
                                    <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
                                </div>
                                <div class="desc">
                                   ${arr[i].description}
                                </div>
                            </a>
                         </div>`;
        }
    }
    document.querySelector("main").innerHTML = mainHTML;
}

const searchBtn = document.getElementById("searchForm");
const searchBtnMobile = document.getElementById("searchFormMobile");
const searchInputMobile = document.getElementById("searchInputMobile");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = await fetchData(searchInput.value);
    renderMain(data.articles);
});

searchBtnMobile.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = await fetchData(searchInputMobile.value);
    renderMain(data.articles);
});

async function Search(query) {
    const data = await fetchData(query);
    renderMain(data.articles);
}
