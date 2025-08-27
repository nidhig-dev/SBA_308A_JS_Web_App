
// This script is the first js file to run (initialLoadBooks)
// It loads the drop down list with all the book names 
// It automatically selects the first book in list and calls functions that will:
// Display book cover 
// display info about book
// It also calls the event handler for get cast by name button and get entire cast button.


import * as Books from "./Books.mjs";
import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/esm/axios.min.js";
import * as Cast from "./Cast.mjs";
import * as castCarousal from "./castCarousal.mjs"
// The book selection input element.
const bookSelect = document.getElementById("bookSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The get cast button element.
const form = document.querySelector("#searchForm");
// get all cast button element
const AllCastBtn = document.getElementById("getAllCastBtn");
axios.defaults.headers.common["Accept"] = "application/json";

// This function will load all the Harry Potter books in the drop down box
(async function initialLoadBooks() {
    try {
        // get all harry potter books
        const response = await axios.get("https://potterapi-fedeperin.vercel.app/en/books");
        for (let i = 0; i < response.data.length; i++) {
            let option = document.createElement("option");
            // get index of book as the next function needs index and not id
            option.setAttribute("value", i);
            // get title of book
            option.textContent = response.data[i].title;
            bookSelect.appendChild(option);
        }
        // Automatically select first item and trigger handler
        if (bookSelect.options.length > 0) {
            bookSelect.selectedIndex = 0;
            handleGetBookInfo({ target: bookSelect }); // manually call handler
        }
    } catch (error) {
        console.error(error.message);
    }
})();
//add event listener to every item in the drop down list
bookSelect.addEventListener("change", handleGetBookInfo);

// This function gets book cover and information about the selected book 
async function handleGetBookInfo(event) {
    try {
        if (bookSelect.selectedIndex != 0) {
            // dont call preventdefault function, if calling eventlistener manaully
            event.preventDefault();
        }
        // Clear previous cast carousal and previous paragraphs
        castCarousal.castClear();
        Books.clear();
        // remove the div classes that were created for cast carousal
        const divItem = document.querySelector(".carousel-item");
        const divCard = document.querySelector(".card");
        if (divItem != null || divCard != null) {
            divItem.remove();
            divCard.remove();
        }
        const response = await axios(
            `https://potterapi-fedeperin.vercel.app/en/books?index=${event.target.value}`);
        let img = Books.createBooksItem(
            response.data.cover,
            response.data.title,
        );
        // call a function to add book cover image
        Books.appendBooks(img);
        // Call a function to add description of the book
        createInfoDump(response);
        // To not show prev and next buttons for drop down list
        castCarousal.start();
    } catch (error) {
        console.error(error.message);
    }
}
// This function displays details of the book selected in the drop down
async function createInfoDump(response) {
    try {
        infoDump.innerHTML = "";
        let p = document.createElement("p");
        p.innerHTML = `<b> ${response.data.title}: </b> <br/><br/>        
        ${response.data.description} <br/><br/>
        <b>Pages: </b>${response.data.pages}<br/><br/>
        <b>Release Date: </b>${response.data.releaseDate}`;
        Books.appendBookInfo(p);
        infoDump.appendChild(p);
    }
    catch (error) {
        console.error(error.message);
    }
}
form.addEventListener("submit", Cast.getCast);
AllCastBtn.addEventListener("click", Cast.getAllCast);