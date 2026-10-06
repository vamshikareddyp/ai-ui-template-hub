const demoResults = [
    {
        title: "Introduction to Artificial Intelligence",
        source: "AI Research",
        category: "research",
        description:
            "Artificial intelligence combines computer science, algorithms and data to create systems capable of performing intelligent tasks."
    },
    {
        title: "The Future of AI Technology",
        source: "Tech Journal",
        category: "technology",
        description:
            "AI is rapidly changing software development, automation, search systems and digital products."
    },
    {
        title: "Latest Developments in Machine Learning",
        source: "Technology News",
        category: "news",
        description:
            "Recent developments in machine learning are improving language models, computer vision and intelligent assistants."
    },
    {
        title: "How Machine Learning Works",
        source: "Learning Hub",
        category: "research",
        description:
            "Machine learning allows computer systems to learn patterns from data and use those patterns to make predictions."
    }
];

let currentResults = demoResults;
let currentFilter = "all";

const searchInput = document.getElementById("searchInput");
const resultsSection = document.getElementById("resultsSection");
const emptyState = document.getElementById("emptyState");
const loading = document.getElementById("loading");

function performSearch() {

    const query = searchInput.value.trim();

    if (query === "") {
        return;
    }

    loading.classList.remove("hidden");
    emptyState.classList.add("hidden");
    resultsSection.classList.add("hidden");

    setTimeout(() => {

        saveSearch(query);

        let filtered = demoResults;

        if (currentFilter !== "all") {
            filtered = demoResults.filter(
                item => item.category === currentFilter
            );
        }

        currentResults = filtered;

        displayResults(filtered);
        updateAnswer(query);

        loading.classList.add("hidden");
        resultsSection.classList.remove("hidden");

    }, 900);
}

function displayResults(results) {

    const container = document.getElementById("resultsContainer");

    container.innerHTML = "";

    document.getElementById("resultCount").textContent =
        `${results.length} results`;

    if (results.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                <h2>No results found</h2>
                <p>Try another search or category.</p>
            </div>
        `;

        return;
    }

    results.forEach(result => {

        const card = document.createElement("div");

        card.className = "result-card";

        card.innerHTML = `
            <div class="source">${result.source}</div>
            <h3>${result.title}</h3>
            <p>${result.description}</p>
        `;

        container.appendChild(card);
    });
}

function updateAnswer(query) {

    const answer = document.getElementById("aiAnswer");

    answer.textContent =
        `Based on your search for "${query}", AI found several relevant resources. ` +
        `The results highlight important concepts, recent developments and useful information related to your question.`;
}

function useSuggestion(text) {

    searchInput.value = text;

    performSearch();
}

function clearSearch() {

    searchInput.value = "";

    resultsSection.classList.add("hidden");
    loading.classList.add("hidden");
    emptyState.classList.remove("hidden");
}

function filterResults(category, button) {

    document.querySelectorAll(".filter").forEach(
        item => item.classList.remove("active")
    );

    button.classList.add("active");

    currentFilter = category;

    if (searchInput.value.trim() !== "") {
        performSearch();
    }
}

function saveSearch(query) {

    let history =
        JSON.parse(localStorage.getItem("aiSearchHistory")) || [];

    history = history.filter(item => item !== query);

    history.unshift(query);

    history = history.slice(0, 6);

    localStorage.setItem(
        "aiSearchHistory",
        JSON.stringify(history)
    );

    displayHistory();
}

function displayHistory() {

    const container =
        document.getElementById("historyContainer");

    const history =
        JSON.parse(localStorage.getItem("aiSearchHistory")) || [];

    container.innerHTML = "";

    if (history.length === 0) {

        container.innerHTML =
            "<p>No recent searches.</p>";

        return;
    }

    history.forEach(item => {

        const button = document.createElement("button");

        button.className = "history-item";
        button.textContent = item;

        button.onclick = () => {
            searchInput.value = item;
            performSearch();
        };

        container.appendChild(button);
    });
}

function clearHistory() {

    localStorage.removeItem("aiSearchHistory");

    displayHistory();
}

function toggleTheme() {

    document.body.classList.toggle("dark");
}

searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        performSearch();
    }

});

displayHistory();