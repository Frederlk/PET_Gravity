// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

if (document.querySelector("._filter-item")) {
    const filterBox = document.querySelectorAll("._filter-item");

    document.querySelector("._filter").addEventListener("click", (event) => {
        if (event.target.tagName !== "LI") return false;
        let filterClass = event.target.dataset["filter"];

        filterBox.forEach((elem) => {
            elem.classList.remove("_hide");
            if (!elem.classList.contains(filterClass) && filterClass !== "all") {
                elem.classList.add("_hide");
            }
        });
    });
}
