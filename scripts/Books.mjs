
// This mjs script is handling all book related functions. It includes:
// Creating a book cover img 
// Deleting the book cover image
// Appending the book cover image
// Appending the information about the book selected.

export function createBooksItem(imgSrc, imgAlt, imgId) {
    const template = document.querySelector("#bookItemTemplate");
    console.log("template clone is",template);
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
    console.log("clone img is", clone);
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


export function appendBooks(element) {

    console.log("element is", element);
    const carousel = document.querySelector(".infoImg");
    console.log("div is", carousel);
    carousel.appendChild(element);
}

export function appendBookInfo(element) {

    console.log("element is", element);
    const infoDump = document.getElementById("infoDump");
    console.log("info dump is", infoDump);
    infoDump.appendChild(element);
}

