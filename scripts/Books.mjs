
// This script is handling all book related functions. It includes:
// Creating a book cover img 
// Deleting the book cover image
// Appending the book cover image
// Appending the information about the book selected.

// This fn creates the template dynamically and image element
export function createBooksItem(imgSrc, imgAlt) {
    const template = document.querySelector("#bookItemTemplate");
    const clone = template.content.firstElementChild.cloneNode(true);
    const img = clone.querySelector("img");
    img.src = imgSrc;
    img.alt = imgAlt;
    return clone;
}

// This fn deletes the previous appended image element
export function clear() {
    const carousel = document.querySelector(".img-wrapper");
    if (carousel) {
        carousel.remove(carousel); 
    } else {
        console.log("No carousel found to clear");
    }
}

// This fn appends the book cover image to image element
export function appendBooks(element) {
    const carousel = document.querySelector(".infoImg");
    carousel.appendChild(element);
}

// This fn appends the info section of book
export function appendBookInfo(element) {
    const infoDump = document.getElementById("infoDump");
    infoDump.appendChild(element);
}

