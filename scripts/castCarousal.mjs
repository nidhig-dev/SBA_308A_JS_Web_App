// This mjs script is handling all functions related to get entire Cast button. It:
// creates carousal
// appends cast to carousal
// clears the carousal
// starts the carousal

import * as bootstrap from "https://esm.sh/bootstrap@5.3.2";

// This fn creates templates for enitre cast carousal
export function createCastItem(imgSrc, imgAlt) {
    const template = document.querySelector("#castItemTemplate");
    const clone = template.content.firstElementChild.cloneNode(true);
    const img = clone.querySelector("img");
    img.src = imgSrc;
    img.alt = imgAlt;
    return clone;
}

// This fn appends cast array to carousal
export function appendCast(element) {
    const carousel = document.querySelector("#carouselInner");
    const activeItem = document.querySelector(".carousel-item.active");
    if (!activeItem) element.classList.add("active");
    carousel.appendChild(element);
}
// Clearing the cast carousal
export function castClear() {
    const carousel = document.querySelector("#carouselInner");
    while (carousel.firstChild) {
        carousel.removeChild(carousel.firstChild);
    }
}
// starting the carousal.It will chk if prev and next buttons needs to be added
export function start() {
    const multipleCardCarousel = document.querySelector("#carouselExampleControls");
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
        // If only four or less item, no need to show buttons. 
        // I decided in my css to show 4 charcters one one page so am emtering 5
        // First item in the array is info object.array starts at index 1.
        if ($items.length <= 5) {
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