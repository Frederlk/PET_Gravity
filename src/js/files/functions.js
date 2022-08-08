// Подключение списка активных модулей
import { flsModules } from "./modules.js";

/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
export function isWebp() {
    // Проверка поддержки webp
    function testWebP(callback) {
        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src =
            "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    // Добавление класса _webp или _no-webp для HTML
    testWebP(function (support) {
        let className = support === true ? "webp" : "no-webp";
        document.documentElement.classList.add(className);
    });
}
/* Проверка мобильного браузера */
export let isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
    },
};
/* Добавление класса touch для HTML если браузер мобильный */
export function addTouchClass() {
    // Добавление класса _touch для HTML если браузер мобильный
    if (isMobile.any()) document.documentElement.classList.add("touch");
}
// Добавление loaded для HTML после полной загрузки страницы
export function addLoadedClass() {
    window.addEventListener("load", function () {
        setTimeout(function () {
            document.documentElement.classList.add("loaded");
        }, 0);
    });
}
// Получение хеша в адресе сайта
export function getHash() {
    if (location.hash) {
        return location.hash.replace("#", "");
    }
}
// Указание хеша в адресе сайта
export function setHash(hash) {
    hash = hash ? `#${hash}` : window.location.href.split("#")[0];
    history.pushState("", "", hash);
}
// Учет плавающей панели на мобильных устройствах при 100vh
export function fullVHfix() {
    const fullScreens = document.querySelectorAll("[data-fullscreen]");
    if (fullScreens.length && isMobile.any()) {
        window.addEventListener("resize", fixHeight);
        function fixHeight() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        }
        fixHeight();
    }
}

// Вспомогательные модули блокировки прокрутки и скочка ====================================================================================================================================================================================================================================================================================
export let bodyLockStatus = true;
export let bodyLockToggle = (delay = 500) => {
    if (document.documentElement.classList.contains("lock")) {
        bodyUnlock(delay);
    } else {
        bodyLock(delay);
    }
};
export let bodyUnlock = (delay = 500) => {
    let body = document.querySelector("body");
    if (bodyLockStatus && !document.documentElement.classList.contains("popup-show")) {
        let lock_padding = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = "0px";
            }
            body.style.paddingRight = "0px";
            document.documentElement.classList.remove("lock");
        }, delay);
        bodyLockStatus = false;
        setTimeout(function () {
            bodyLockStatus = true;
        }, delay);
    }
};
export let bodyLock = (delay = 500) => {
    let body = document.querySelector("body");
    if (bodyLockStatus) {
        let lock_padding = document.querySelectorAll("[data-lp]");
        for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index];
            el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
        }
        body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
        document.documentElement.classList.add("lock");

        bodyLockStatus = false;
        setTimeout(function () {
            bodyLockStatus = true;
        }, delay);
    }
};
// Модуль работы с меню (бургер) =======================================================================================================================================================================================================================
/*
Документация по работе в шаблоне: https://template.fls.guru/template-docs/menu-burger.html
Сниппет (HTML): menu
*/
export function menuInit() {
    if (document.querySelector(".icon-menu")) {
        document.addEventListener("click", function (e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            } else if (bodyLockStatus && !e.target.closest(".menu__body")) {
                menuClose();
            }
        });

        document.addEventListener("keydown", function (e) {
            if (
                bodyLockStatus &&
                e.which == 27 &&
                e.code === "Escape" &&
                document.documentElement.classList.contains("menu-open")
            ) {
                menuClose();
            }
        });
    }
}
export function menuOpen() {
    bodyLock();
    document.documentElement.classList.add("menu-open");
}
export function menuClose() {
    bodyUnlock();
    document.documentElement.classList.remove("menu-open");
}
// Модуль "показать еще" =======================================================================================================================================================================================================================
/*
Документация по работе в шаблоне: https://template.fls.guru/template-docs/modul-pokazat-eshhjo.html
Сниппет (HTML): showmore
*/
export function showMore() {
    window.addEventListener("load", function (e) {
        const showMoreBlocks = document.querySelectorAll("[data-showmore]");
        let showMoreBlocksRegular;
        let mdQueriesArray;
        if (showMoreBlocks.length) {
            // Получение обычных объектов
            showMoreBlocksRegular = Array.from(showMoreBlocks).filter(function (item, index, self) {
                return !item.dataset.showmoreMedia;
            });
            // Инициализация обычных объектов
            showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;

            document.addEventListener("click", showMoreActions);
            window.addEventListener("resize", showMoreActions);

            // Получение объектов с медиа запросами
            mdQueriesArray = dataMediaQueries(showMoreBlocks, "showmoreMedia");
            if (mdQueriesArray && mdQueriesArray.length) {
                mdQueriesArray.forEach((mdQueriesItem) => {
                    // Событие
                    mdQueriesItem.matchMedia.addEventListener("change", function () {
                        initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                    });
                });
                initItemsMedia(mdQueriesArray);
            }
        }
        function initItemsMedia(mdQueriesArray) {
            mdQueriesArray.forEach((mdQueriesItem) => {
                initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
        }
        function initItems(showMoreBlocks, matchMedia) {
            showMoreBlocks.forEach((showMoreBlock) => {
                initItem(showMoreBlock, matchMedia);
            });
        }
        function initItem(showMoreBlock, matchMedia = false) {
            showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;
            let showMoreContent = showMoreBlock.querySelectorAll("[data-showmore-content]");
            let showMoreButton = showMoreBlock.querySelectorAll("[data-showmore-button]");
            showMoreContent = Array.from(showMoreContent).filter((item) => item.closest("[data-showmore]") === showMoreBlock)[0];
            showMoreButton = Array.from(showMoreButton).filter((item) => item.closest("[data-showmore]") === showMoreBlock)[0];
            const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
            if (matchMedia.matches || !matchMedia) {
                if (hiddenHeight < getOriginalHeight(showMoreContent)) {
                    _slideUp(showMoreContent, 0, hiddenHeight);
                    showMoreButton.hidden = false;
                } else {
                    _slideDown(showMoreContent, 0, hiddenHeight);
                    showMoreButton.hidden = true;
                }
            } else {
                _slideDown(showMoreContent, 0, hiddenHeight);
                showMoreButton.hidden = true;
            }
        }
        function getHeight(showMoreBlock, showMoreContent) {
            let hiddenHeight = 0;
            const showMoreType = showMoreBlock.dataset.showmore ? showMoreBlock.dataset.showmore : "size";
            if (showMoreType === "items") {
                const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 3;
                const showMoreItems = showMoreContent.children;
                for (let index = 1; index < showMoreItems.length; index++) {
                    const showMoreItem = showMoreItems[index - 1];
                    hiddenHeight += showMoreItem.offsetHeight;
                    if (index == showMoreTypeValue) break;
                }
            } else {
                const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 150;
                hiddenHeight = showMoreTypeValue;
            }
            return hiddenHeight;
        }
        function getOriginalHeight(showMoreContent) {
            let parentHidden;
            let hiddenHeight = showMoreContent.offsetHeight;
            showMoreContent.style.removeProperty("height");
            if (showMoreContent.closest(`[hidden]`)) {
                parentHidden = showMoreContent.closest(`[hidden]`);
                parentHidden.hidden = false;
            }
            let originalHeight = showMoreContent.offsetHeight;
            parentHidden ? (parentHidden.hidden = true) : null;
            showMoreContent.style.height = `${hiddenHeight}px`;
            return originalHeight;
        }
        function showMoreActions(e) {
            const targetEvent = e.target;
            const targetType = e.type;
            if (targetType === "click") {
                if (targetEvent.closest("[data-showmore-button]")) {
                    const showMoreButton = targetEvent.closest("[data-showmore-button]");
                    const showMoreBlock = showMoreButton.closest("[data-showmore]");
                    const showMoreContent = showMoreBlock.querySelector("[data-showmore-content]");
                    const showMoreSpeed = showMoreBlock.dataset.showmoreButton ? showMoreBlock.dataset.showmoreButton : "500";
                    const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
                    if (!showMoreContent.classList.contains("_slide")) {
                        showMoreBlock.classList.contains("_showmore-active")
                            ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight)
                            : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
                        showMoreBlock.classList.toggle("_showmore-active");
                    }
                }
            } else if (targetType === "resize") {
                showMoreBlocksRegular && showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
                mdQueriesArray && mdQueriesArray.length ? initItemsMedia(mdQueriesArray) : null;
            }
        }
    });
}
//================================================================================================================================================================================================================================================================================================================
// Прочие полезные функции ================================================================================================================================================================================================================================================================================================================
//================================================================================================================================================================================================================================================================================================================
// FLS (Full Logging System)
export function FLS(message) {
    setTimeout(() => {
        if (window.FLS) {
            console.log(message);
        }
    }, 0);
}
// Получить цифры из строки
export function getDigFromString(item) {
    return parseInt(item.replace(/[^\d]/g, ""));
}
// Форматирование цифр типа 100 000 000
export function getDigFormat(item) {
    return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
}
// Убрать класс из всех элементов массива
export function removeClasses(array, className) {
    for (var i = 0; i < array.length; i++) {
        array[i].classList.remove(className);
    }
}
// Уникализация массива
export function uniqArray(array) {
    return array.filter(function (item, index, self) {
        return self.indexOf(item) === index;
    });
}
// Функция получения индекса внутри родителя
export function indexInParent(parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
}
// Обработа медиа запросов из атрибутов
export function dataMediaQueries(array, dataSetValue) {
    // Получение объектов с медиа запросами
    const media = Array.from(array).filter(function (item, index, self) {
        if (item.dataset[dataSetValue]) {
            return item.dataset[dataSetValue].split(",")[0];
        }
    });
    // Инициализация объектов с медиа запросами
    if (media.length) {
        const breakpointsArray = [];
        media.forEach((item) => {
            const params = item.dataset[dataSetValue];
            const breakpoint = {};
            const paramsArray = params.split(",");
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
            breakpoint.item = item;
            breakpointsArray.push(breakpoint);
        });
        // Получаем уникальные брейкпоинты
        let mdQueries = breakpointsArray.map(function (item) {
            return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
        });
        mdQueries = uniqArray(mdQueries);
        const mdQueriesArray = [];

        if (mdQueries.length) {
            // Работаем с каждым брейкпоинтом
            mdQueries.forEach((breakpoint) => {
                const paramsArray = breakpoint.split(",");
                const mediaBreakpoint = paramsArray[1];
                const mediaType = paramsArray[2];
                const matchMedia = window.matchMedia(paramsArray[0]);
                // Объекты с нужными условиями
                const itemsArray = breakpointsArray.filter(function (item) {
                    if (item.value === mediaBreakpoint && item.type === mediaType) {
                        return true;
                    }
                });
                mdQueriesArray.push({
                    itemsArray,
                    matchMedia,
                });
            });
            return mdQueriesArray;
        }
    }
}
//================================================================================================================================================================================================================================================================================================================
