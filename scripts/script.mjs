
// This mjs script is the first js file to run (initialLoadBooks)
// It loads the drop down list with all the book names 
// It automatically selects the first book in list and calls functions that will:

// Display book cover 
// display info about book

// It also calls the even listeners for get cast and get entire cast button.


import * as Books from "./Books.mjs";
import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/esm/axios.min.js";
import * as Cast from "./Cast.mjs";
import * as castCarousal from "./castCarousal.mjs"
// The book selection input element.
const bookSelect = document.getElementById("bookSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get cast button element.
const form = document.querySelector("#searchForm");
// get all cast button element
const AllCastBtn = document.getElementById("getAllCastBtn");
axios.defaults.headers.common["Accept"] = "application/json";

// This function will load all the Harry Potter books in the drop down box
(async function initialLoadBooks() {
    try {
        // get all harry potter books
        const response = await axios.get("https://potterapi-fedeperin.vercel.app/en/books",
            // {
            //     onDownloadProgress: updateProgess
            // }
        );
        console.log("response obj is", response.data);
        for (let i = 0; i < response.data.length; i++) {
            let option = document.createElement("option");
            console.log("index is", bookSelect.selectedIndex);
            // get index of book
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
        // progressBar.style.width = "100%";

    } catch (error) {
        // progressBar.style.width = "0%";
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
        // Clear previous paragraphs
        castCarousal.castClear();
        Books.clear();
        // remove the div classes that were created for cast carousal
        const divItem = document.querySelector(".carousel-item");
        const divCard = document.querySelector(".card");
        console.log("right now is", divItem, divCard);
        if (divItem != null || divCard != null) {
            divItem.remove();
            divCard.remove();
        }
        const response = await axios(
            `https://potterapi-fedeperin.vercel.app/en/books?index=${event.target.value}`,
            // {
            //     onDownloadProgress: updateProgess
            // }
        );
        let img = Books.createBooksItem(
            response.data.cover,
            response.data.title,
            response.data.number
        );
        Books.appendBooks(img);
        // Call a function to add description of the book
        createInfoDump(response);
        // I dont want to show prev and next buttons for drop down list
        castCarousal.start();
        // progressBar.style.width = "100%";
    } catch (error) {
        console.error(error.message);
        // progressBar.style.width = "0%";
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
// Added interceptors to update the progress bar every time a request is sent or a response is received.
// axios.interceptors.request.use(request => {
//     if (progressBar) {
//         progressBar.style.width = "0%";
//         let body = document.querySelector("body");
//         body.style.cursor = "progress"; // show loading cursor
//     }
//     request.metadata = request.metadata || {};
//     request.metadata.startTime = new Date().getTime();
//     return request;
// });


// axios.interceptors.response.use((response) => {
//     if (progressBar) {
//         progressBar.style.width = "100%";
//         let body = document.querySelector("body");
//         body.style.cursor = "default"; // reset cursor
//     }
//     return response;
// },
//     (error) => {
//         if (progressBar) {
//             progressBar.style.width = "100%";
//             let body = document.querySelector("body");
//             body.style.cursor = "default"; // reset cursor
//         }
//         throw error;
//     });

//  This function calculates the progress of the progress bar between request sent and response received.

//  It receives a ProgressEvent object and this function is passed 
// to the axios onDownloadProgress config option in all my event handler.
// export function updateProgess(progressEvent) {
//     // console.log(progressEvent);
//     const { loaded, total } = progressEvent;
//     if (total) {
//         const percent = Math.floor((loaded / total) * 100);
//         progressBar.style.width = percent + "%";
//     }
// }
form.addEventListener("submit", Cast.getCast);
AllCastBtn.addEventListener("click", Cast.getAllCast);