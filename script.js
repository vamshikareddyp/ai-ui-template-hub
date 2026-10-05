/* =====================================================
   AI UI TEMPLATE HUB
   Main Homepage JavaScript
   ===================================================== */


/* ================= ELEMENTS ================= */

const searchInput =
    document.getElementById("templateSearch");

const templateCards =
    document.querySelectorAll(".template-card");

const categoryButtons =
    document.querySelectorAll(".category-btn");

const noResults =
    document.getElementById("noResults");

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

const navLinks =
    document.querySelector(".nav-links");


/* ================= STATE ================= */

let currentCategory = "all";


/* ================= FILTER FUNCTION ================= */

function filterTemplates() {

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();

    let visibleCount = 0;


    templateCards.forEach(card => {

        const cardName =
            card.dataset.name.toLowerCase();

        const cardCategory =
            card.dataset.category;


        const matchesSearch =
            cardName.includes(searchTerm);

        const matchesCategory =
            currentCategory === "all" ||
            cardCategory === currentCategory;


        if (matchesSearch && matchesCategory) {

            card.style.display = "block";

            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });


    if (visibleCount === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


/* ================= SEARCH ================= */

searchInput.addEventListener(
    "input",
    filterTemplates
);


/* ================= CATEGORY FILTER ================= */

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });


        button.classList.add("active");


        currentCategory =
            button.dataset.category;


        filterTemplates();

    });

});


/* ================= MOBILE MENU ================= */

mobileMenuBtn.addEventListener(
    "click",
    () => {

        navLinks.classList.toggle("mobile-visible");

    }
);


/* ================= CLOSE MOBILE MENU ================= */

document.querySelectorAll(
    ".nav-links a"
).forEach(link => {

    link.addEventListener(
        "click",
        () => {

            navLinks.classList.remove(
                "mobile-visible"
            );

        }
    );

});


/* ================= CARD ANIMATION ================= */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.1
        }
    );


templateCards.forEach(card => {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(20px)";

    card.style.transition =
        "opacity .5s ease, transform .5s ease";

    observer.observe(card);

});


/* ================= CONSOLE MESSAGE ================= */

console.log(
    "AI UI Template Hub loaded successfully."
);

console.log(
    "Templates available: 6"
);