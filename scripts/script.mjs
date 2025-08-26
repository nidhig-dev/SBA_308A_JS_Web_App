import * as Books from "./Books.mjs";
import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/esm/axios.min.js";
import * as Cast from "./Cast.mjs";
// import axios from "axios";

// The breed selection input element.
const bookSelect = document.getElementById("bookSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get cast button element.
const form = document.querySelector("#searchForm");
// const getCastBtn = document.getElementById("getCastBtn");
// const getcarouselInner = document.getElementById("carouselInner");
// Step 0: Store your API key here for reference and easy access.
const API_KEY = "live_ZJwDKQB0Is5vcGkkS2rWk5AaiZbsONSgEsbVeGXJwdNkHtBkwcK9GoZRc6nEuJMy";

axios.defaults.headers.common["x-api-key"] = "live_ZJwDKQB0Is5vcGkkS2rWk5AaiZbsONSgEsbVeGXJwdNkHtBkwcK9GoZRc6nEuJMy"
axios.defaults.headers.common["Accept"] = "application/json";


(async function initialLoadBooks() {
    try {
        // get all harry potter books
        const response = await axios.get("https://potterapi-fedeperin.vercel.app/en/books",
            {
                onDownloadProgress: updateProgess
            }
        );
        console.log("response obj is", response.data);
        for (let i = 0; i < response.data.length; i++) {
            let option = document.createElement("option");
            console.log("index is", bookSelect.selectedIndex);
            // get index of book
            option.setAttribute("value", i);
            // response.data[i].number);
            // get title of book
            option.textContent = response.data[i].title;
            // option.setAttribute("value", response.data[i].id);
            // option.textContent = response.data[i].name;
            bookSelect.appendChild(option);
        }

        // Automatically select first item and trigger handler
        if (bookSelect.options.length > 0) {
            bookSelect.selectedIndex = 0;

            handleGetBookInfo({ target: bookSelect }); // manually call handler
        }


        progressBar.style.width = "100%";

    } catch (error) {
        progressBar.style.width = "0%";
        console.error(error.message);
    }
})();

bookSelect.addEventListener("change", handleGetBookInfo);

async function handleGetBookInfo(event) {
    try {
        if (bookSelect.selectedIndex != 0) {
            // dont call preventdefault function, if calling eventlistener manaully
            event.preventDefault();
        }
        // Clear previous paragraphs
        Books.clear();
        const response = await axios(
            `https://potterapi-fedeperin.vercel.app/en/books?index=${event.target.value}`,
            {
                onDownloadProgress: updateProgess
            }
        );
        let img = Books.createBooksItem(
            response.data.cover,
            response.data.title,
            response.data.number
        );
        // console.log("I am before appending img");
        Books.appendBooks(img);
        // Books.start();
        // }
        // getting all he details of the breed selected
        // const res = await axios(`https://api.thedogapi.com/v1/breeds/${event.target.value}`
        // );

        // let bredFor = res.data['bred_for'];
        // if(bredFor==undefined){
        //     bredFor="unknown"
        // }
        createInfoDump(response);
        // infoDump.innerHTML = "";
        // let p = document.createElement("p");
        // p.innerHTML = `<b> ${response.data.title}: </b> <br/><br/>
        // ${response.data.description} <br/><br/>
        // <b>Pages: </b>${response.data.pages}<br/><br/>
        // <b>Release Date: </b>${response.data.releaseDate}`;
        // infoDump.appendChild(p);
        progressBar.style.width = "100%";
    } catch (error) {
        console.error(error.message);
        progressBar.style.width = "0%";
    }
}

async function createInfoDump(response) {
    try {
        infoDump.innerHTML = "";
        let p = document.createElement("p");
        p.innerHTML = `<b> ${response.data.title}: </b> <br/><br/>
        
        ${response.data.description} <br/><br/>
        <b>Pages: </b>${response.data.pages}<br/><br/>
        <b>Release Date: </b>${response.data.releaseDate}`;
        infoDump.appendChild(p);
    }
    catch (error) {
        console.error(error.message);
    }
}
/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */
axios.interceptors.request.use(request => {
    if (progressBar) {
        progressBar.style.width = "0%";
        let body = document.querySelector("body");
        body.style.cursor = "progress"; // show loading cursor
    }
    request.metadata = request.metadata || {};
    request.metadata.startTime = new Date().getTime();
    return request;
});


axios.interceptors.response.use((response) => {
    if (progressBar) {
        progressBar.style.width = "100%";
        let body = document.querySelector("body");
        body.style.cursor = "default"; // reset cursor
    }
    return response;
},
    (error) => {
        if (progressBar) {
            progressBar.style.width = "100%";
            let body = document.querySelector("body");
            body.style.cursor = "default"; // reset cursor
        }
        throw error;
    });
/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */
export function updateProgess(progressEvent) {
    // console.log(progressEvent);
    const { loaded, total } = progressEvent;
    if (total) {
        const percent = Math.floor((loaded / total) * 100);
        progressBar.style.width = percent + "%";
    }
}
form.addEventListener("submit", Cast.getCast);
