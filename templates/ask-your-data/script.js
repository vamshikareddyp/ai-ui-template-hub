const answers = {

    "why did revenue decrease":
        "Revenue decreased by 8.4%, mainly because conversion rates dropped from 5.2% to 4.6% during the last period.",

    "which product performed best":
        "Product Pro performed best with ₹28,450 in revenue, representing 34% of total product revenue.",

    "what is our conversion rate":
        "The current conversion rate is 4.82%, with mobile users accounting for the largest share of conversions.",

    "which month had the highest sales":
        "August had the highest sales with approximately ₹94,000 in revenue."
};

function askData() {

    const input = document.getElementById("questionInput");

    const question = input.value.trim();

    if (question === "") {
        return;
    }

    const normalized = question.toLowerCase();

    let response =
        "Based on the available demo data, AI found a positive trend in your business metrics. Revenue and user growth are currently moving upward.";

    for (const key in answers) {

        if (normalized.includes(key.replace("?", ""))) {

            response = answers[key];
            break;
        }
    }

    document.getElementById("answer").textContent = response;

    saveQuery(question);
}

function setQuestion(question) {

    document.getElementById("questionInput").value = question;

    askData();
}

function saveQuery(question) {

    const container =
        document.getElementById("recentQueries");

    const item =
        document.createElement("div");

    item.className = "query-item";

    item.textContent = question;

    container.prepend(item);
}

function generateInsight() {

    const titles = [
        "Revenue increased this month",
        "User engagement is improving",
        "Conversion rate needs attention",
        "August was the strongest month"
    ];

    const descriptions = [
        "Revenue increased by 12.4%, mainly because of improved customer retention and higher average order values.",
        "Active users increased by 8.2%, indicating stronger engagement with the product.",
        "Conversion rate decreased slightly. Improving checkout performance could recover lost conversions.",
        "August recorded the highest sales, driven by strong product demand and returning customers."
    ];

    const index =
        Math.floor(Math.random() * titles.length);

    document.getElementById("insightTitle").textContent =
        titles[index];

    document.getElementById("insightText").textContent =
        descriptions[index];
}

function changeChart() {

    const bars =
        document.querySelectorAll(".bar");

    bars.forEach(bar => {

        const randomHeight =
            Math.floor(Math.random() * 55) + 35;

        bar.style.height =
            randomHeight + "%";
    });
}

function updateDashboard() {

    const value =
        document.getElementById("dateFilter").value;

    if (value === "7") {

        document.getElementById("revenue").textContent =
            "₹22,850";

        document.getElementById("users").textContent =
            "6,480";

    } else if (value === "90") {

        document.getElementById("revenue").textContent =
            "₹248,920";

        document.getElementById("users").textContent =
            "71,520";

    } else {

        document.getElementById("revenue").textContent =
            "₹84,250";

        document.getElementById("users").textContent =
            "24,680";
    }
}