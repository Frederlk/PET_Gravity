if (document.querySelector("._filter-item")) {
    const filterBox = document.querySelectorAll("._filter-item");
    const links = document.querySelectorAll(".works__link");
    document.querySelector("._filter").addEventListener("click", (event) => {
        if (event.target.tagName !== "LI") return false;
        let filterClass = event.target.dataset["filter"];

        links.forEach((elem) => {
            elem.classList.remove("_active");
            if (elem.innerHTML.toLowerCase() === filterClass.toLowerCase()) {
                elem.classList.add("_active");
            }
        });

        filterBox.forEach((elem) => {
            elem.classList.remove("_hide");
            if (!elem.classList.contains(filterClass) && filterClass !== "all") {
                elem.classList.add("_hide");
            }
        });
    });
}

if (document.querySelector(".header__search")) {
    const search = document.querySelector(".header__search");

    document.addEventListener("click", (e) => {
        const target = e.target;
        if (target.classList.contains("search-header__icon")) {
            search.classList.toggle("_active");
        } else if (!target.closest(".search-header__form") && search.classList.contains("_active")) {
            search.classList.remove("_active");
        }
    });
}
