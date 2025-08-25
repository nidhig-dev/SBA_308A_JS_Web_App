
import * as bootstrap from "https://esm.sh/bootstrap@5.3.2";
import { favourite } from "./script.mjs";

export function createCarouselItem(imgSrc, imgAlt, imgId) {
    const template = document.querySelector("#carouselItemTemplate");
    const clone = template.content.firstElementChild.cloneNode(true);

    const img = clone.querySelector("img");
    img.src = imgSrc;
    img.alt = imgAlt;
    
    // const favBtn = clone.querySelector(".favourite-button");
    // favBtn.addEventListener("click", () => {
    //     favourite(imgId);
    // });
    console.log("clone img is",clone);
    return clone;
}

export function clear() {
    const carousel = document.querySelector(".img-wrapper");
    if (carousel) {
        carousel.remove(carousel); // remove the div containing img
        console.log("Image removed");        
    } else {
        console.log("No carousel found to clear");
    }    
}

export function appendCarousel(element) {

    console.log("element is",element);
    const carousel = document.querySelector(".infoImg");
    console.log("div is",carousel);
    carousel.appendChild(element);
}

// export function start() {
//     const multipleCardCarousel = document.querySelector(
//         "#carouselExampleControls"
//     );
//     if (window.matchMedia("(min-width: 768px)").matches) {
//         const carousel = new bootstrap.Carousel(multipleCardCarousel, {
//             interval: false
//         });
//         const carouselWidth = $(".carousel-inner")[0].scrollWidth;
//         const cardWidth = $(".carousel-item").width();
//         let scrollPosition = 0;
//         $("#carouselExampleControls .carousel-control-next").unbind();
//         $("#carouselExampleControls .carousel-control-next").on(
//             "click",
//             function () {
//                 if (scrollPosition < carouselWidth - cardWidth * 4) {
//                     scrollPosition += cardWidth;
//                     $("#carouselExampleControls .carousel-inner").animate(
//                         { scrollLeft: scrollPosition },
//                         600
//                     );
//                 }
//             }
//         );
//         $("#carouselExampleControls .carousel-control-prev").unbind();
//         $("#carouselExampleControls .carousel-control-prev").on(
//             "click",
//             function () {
//                 if (scrollPosition > 0) {
//                     scrollPosition -= cardWidth;
//                     $("#carouselExampleControls .carousel-inner").animate(
//                         { scrollLeft: scrollPosition },
//                         600
//                     );
//                 }
//             }
//         );
//     } else {
//         $(multipleCardCarousel).addClass("slide");
//     }
// }
