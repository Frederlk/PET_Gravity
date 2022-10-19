import Swiper, { Navigation, Keyboard, Lazy, Autoplay, Pagination, EffectFade } from "swiper";

import "../../scss/base/swiper.scss";

function initSliders() {
    if (document.querySelector(".fullscreen__slider")) {
        new Swiper(".fullscreen__slider", {
            modules: [EffectFade, Keyboard, Pagination, Autoplay, Lazy],
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 0,
            autoHeight: false,
            speed: 800,

            touchRatio: 0,
            loop: true,
            lazy: true,
            effect: "fade",
            fadeEffect: {
                crossFade: true,
            },

            autoplay: {
                delay: 6000,
                stopOnLastSlide: true,
                disableOnInteraction: false,
            },

            keyboard: {
                enabled: true,
                onlyInViewport: true,
                pageUpDown: true,
            },

            pagination: {
                el: ".fullscreen__progressbar",
                clickable: true,
                type: "progressbar",
            },
        });
    }

    if (document.querySelector(".slider-services")) {
        new Swiper(".slider-services", {
            modules: [Navigation, Keyboard],
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 30,
            autoHeight: false,
            speed: 800,

            keyboard: {
                enabled: true,
                onlyInViewport: true,
                pageUpDown: true,
            },

            navigation: {
                prevEl: ".services__navigation .navigation__arrow_prev",
                nextEl: ".services__navigation .navigation__arrow_next",
            },
        });
    }

    if (document.querySelector(".testimonials__slider")) {
        new Swiper(".testimonials__slider", {
            modules: [Navigation, Keyboard, EffectFade],
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 30,
            autoHeight: false,
            speed: 800,
            effect: "fade",
            fadeEffect: {
                crossFade: true,
            },

            keyboard: {
                enabled: true,
                onlyInViewport: true,
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
    initSliders();
});
