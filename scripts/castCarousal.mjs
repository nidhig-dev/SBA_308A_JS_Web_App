// This mjs script is handling all functions related to get entire Cast button.
// creates carousal
// appends cast to carousal
// clears the carousal
// starts the carousal

import * as bootstrap from "https://esm.sh/bootstrap@5.3.2";
import * as script from "./script.mjs";

export function createCastItem(imgSrc, imgAlt, imgId) {
    const template = document.querySelector("#castItemTemplate");
    console.log("template clone is", template);
    const clone = template.content.firstElementChild.cloneNode(true);

    const img = clone.querySelector("img");
    img.src = imgSrc;
    img.alt = imgAlt;
    // const infoDump=clone.querySelector("#infoDump");
    // script.createInfoDump(infoDump);
    // const favBtn = clone.querySelector(".favourite-button");
    // favBtn.addEventListener("click", () => {
    //     favourite(imgId);
    // });
    return clone;
}

export function appendCast(element) {
    const carousel = document.querySelector("#carouselInner");

    const activeItem = document.querySelector(".carousel-item.active");
    if (!activeItem) element.classList.add("active");
    carousel.appendChild(element);

    // console.log("element is", element);
    // const carouselCast = document.querySelector(".card");
    // carouselCast.appendChild(element);
}

export function castClear() {
    const carousel = document.querySelector("#carouselInner");
    while (carousel.firstChild) {
        carousel.removeChild(carousel.firstChild);
    }
}

export function start() {
    const multipleCardCarousel = document.querySelector(
        "#carouselExampleControls"
    );
    if (window.matchMedia("(min-width: 768px)").matches) {
        const carousel = new bootstrap.Carousel(multipleCardCarousel, {
            interval: false
        });
        const $carouselInner = $(".carousel-inner");
        const $items = $(".carousel-item");
        const carouselWidth = $carouselInner[0].scrollWidth;
        const cardWidth = $items.width();
        let scrollPosition = 0;

        // --- Hide/Show controls depending on item count ---
        const $prevBtn = $("#carouselExampleControls .carousel-control-prev");
        const $nextBtn = $("#carouselExampleControls .carousel-control-next");
        console.log("teme length in books.mjs is", $items.length);
        if ($items.length <= 1) {
            $prevBtn.hide();
            $nextBtn.hide();
        } else {
            $prevBtn.show();
            $nextBtn.show();
        }        
        // rebind navigation handlers
        $("#carouselExampleControls .carousel-control-next").unbind();
        $("#carouselExampleControls .carousel-control-next").on(
            "click",
            function () {
                if (scrollPosition < carouselWidth - cardWidth * 4) {
                    scrollPosition += cardWidth;
                    $("#carouselExampleControls .carousel-inner").animate(
                        { scrollLeft: scrollPosition },
                        600
                    );
                }
            }
        );
        $("#carouselExampleControls .carousel-control-prev").unbind();
        $("#carouselExampleControls .carousel-control-prev").on(
            "click",
            function () {
                if (scrollPosition > 0) {
                    scrollPosition -= cardWidth;
                    $("#carouselExampleControls .carousel-inner").animate(
                        { scrollLeft: scrollPosition },
                        600
                    );
                }
            }
        );
    } else {
        $(multipleCardCarousel).addClass("slide");
    }
}