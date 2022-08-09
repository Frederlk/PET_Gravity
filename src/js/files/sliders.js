/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, Keyboard, Lazy, Autoplay, Pagination, EffectFade } from "swiper";
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
    // Перечень слайдеров
    // Проверяем, есть ли слайдер на стронице
    if (document.querySelector(".fullscreen__slider")) {
        // Указываем скласс нужного слайдера
        // Создаем слайдер
        new Swiper(".fullscreen__slider", {
            // Указываем скласс нужного слайдера
            // Подключаем модули слайдера
            // для конкретного случая
            modules: [EffectFade, Keyboard, Pagination, Autoplay, Lazy],
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 0,
            autoHeight: false,
            speed: 800,

            touchRatio: 0,
            //simulateTouch: false,
            loop: true,
            //preloadImages: false,
            lazy: true,
            effect: "fade",
            // Дополнение к fade
            fadeEffect: {
                // Параллельная
                // смена прозрачности
                crossFade: true,
            },

            autoplay: {
                // Пауза между прокруткой
                delay: 6000,
                // Закончить на последнем слайде
                stopOnLastSlide: true,
                // Отключить после ручного переключения
                disableOnInteraction: false,
            },

            // Управление клавиатурой
            keyboard: {
                // Включить\выключить
                enabled: true,
                // Включить\выключить
                // только когда слайдер
                // в пределах вьюпорта
                onlyInViewport: true,
                // Включить\выключить
                // управление клавишами
                // pageUp, pageDown
                pageUpDown: true,
            },

            pagination: {
                el: ".fullscreen__progressbar",
                clickable: true,
                type: "progressbar",
            },

            // // Кнопки "влево/вправо"
            // navigation: {
            //     prevEl: ".swiper-button-prev",
            //     nextEl: ".swiper-button-next",
            // },
        });
    }

    if (document.querySelector(".slider-services")) {
        // Указываем скласс нужного слайдера
        // Создаем слайдер
        new Swiper(".slider-services", {
            // Указываем скласс нужного слайдера
            // Подключаем модули слайдера
            // для конкретного случая
            modules: [Navigation, Keyboard],
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 30,
            autoHeight: false,
            speed: 800,

            // Управление клавиатурой
            keyboard: {
                // Включить\выключить
                enabled: true,
                // Включить\выключить
                // только когда слайдер
                // в пределах вьюпорта
                onlyInViewport: true,
                // Включить\выключить
                // управление клавишами
                // pageUp, pageDown
                pageUpDown: true,
            },

            navigation: {
                prevEl: ".services__navigation .navigation__arrow_prev",
                nextEl: ".services__navigation .navigation__arrow_next",
            },
        });
    }

    if (document.querySelector(".testimonials__slider")) {
        // Указываем скласс нужного слайдера
        // Создаем слайдер
        new Swiper(".testimonials__slider", {
            // Указываем скласс нужного слайдера
            // Подключаем модули слайдера
            // для конкретного случая
            modules: [Navigation, Keyboard, EffectFade],
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 30,
            autoHeight: false,
            speed: 800,
            effect: "fade",
            // Дополнение к fade
            fadeEffect: {
                // Параллельная
                // смена прозрачности
                crossFade: true,
            },

            // Управление клавиатурой
            keyboard: {
                // Включить\выключить
                enabled: true,
                // Включить\выключить
                // только когда слайдер
                // в пределах вьюпорта
                onlyInViewport: true,
                // Включить\выключить
                // управление клавишами
                // pageUp, pageDown
                pageUpDown: true,
            },

            navigation: {
                prevEl: ".testimonials__navigation .navigation__arrow_prev",
                nextEl: ".testimonials__navigation .navigation__arrow_next",
            },
        });
    }
}

window.addEventListener("load", function (e) {
    // Запуск инициализации слайдеров
    initSliders();
    // Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
});
