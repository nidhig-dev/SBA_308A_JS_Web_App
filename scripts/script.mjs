import * as Carousel from "./Carousel.mjs";
import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/esm/axios.min.js";
import * as Cast from "./Cast.mjs";
// import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");
const getcarouselInner = document.getElementById("carouselInner");
// Step 0: Store your API key here for reference and easy access.
const API_KEY = "live_ZJwDKQB0Is5vcGkkS2rWk5AaiZbsONSgEsbVeGXJwdNkHtBkwcK9GoZRc6nEuJMy";

axios.defaults.headers.common["x-api-key"] = "live_ZJwDKQB0Is5vcGkkS2rWk5AaiZbsONSgEsbVeGXJwdNkHtBkwcK9GoZRc6nEuJMy"
axios.defaults.headers.common["Accept"] = "application/json";


(async function initialLoadBooks() {
    try {
        // get all harry potter books
        const response = await axios.get("https://potterapi-fedeperin.vercel.app/en/books"
            // "https://api.thedogapi.com/v1/breeds?limit=20&page=0"
        );
        console.log("response obj is", response.data);
        for (let i = 0; i < response.data.length; i++) {
            let option = document.createElement("option");
            console.log("index is", breedSelect.selectedIndex);
            // get index of book
            option.setAttribute("value", i);
            // response.data[i].number);
            // get title of book
            option.textContent = response.data[i].title;
            // option.setAttribute("value", response.data[i].id);
            // option.textContent = response.data[i].name;
            breedSelect.appendChild(option);
        }

        // Automatically select first item and trigger handler
        if (breedSelect.options.length > 0) {
            breedSelect.selectedIndex = 0;
            handleGetBookInfo({ target: breedSelect }); // manually call handler
        }




    } catch (error) {
        console.error(error.message);
    }
})();

breedSelect.addEventListener("change", handleGetBookInfo);

async function handleGetBookInfo(event) {
    try {
        // Clear previous paragraphs
        Carousel.clear();

        // console.log("this is what u clciked",event.target)
        // console.log(`get image for ${event.target.value}`);
        // getting the selected book's details object
        const response = await axios(
            `https://potterapi-fedeperin.vercel.app/en/books?index=${event.target.value}`,
            {
                onDownloadProgress: updateProgess
            }
        );
        // console.log("potter book is",response.data);
        // console.log("potter name is", response.data.title);
        // console.log("cover is", response.data.cover);
        // for (let i = 0; i < response.data.length; i++) {
        //     // creating a carousal of dog images by calling fn
        let img = Carousel.createCarouselItem(
            response.data.cover,
            response.data.title,
            response.data.number
        );
        console.log("I am before appending img");
        Carousel.appendCarousel(img);
        // Carousel.start();
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
    infoDump.innerHTML = "";
    let p = document.createElement("p");
    p.innerHTML = `<b> ${response.data.title}: </b> <br/><br/>
        
        ${response.data.description} <br/><br/>
        <b>Pages: </b>${response.data.pages}<br/><br/>
        <b>Release Date: </b>${response.data.releaseDate}`;
    infoDump.appendChild(p);
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

    response.config.metadata.endTime = new Date().getTime();
    response.config.metadata.durationInMS = response.config.metadata.endTime - response.config.metadata.startTime;

    console.log(`Request took ${response.config.metadata.durationInMS} milliseconds.`)
    return response;
},
    (error) => {
        if (progressBar) {
            progressBar.style.width = "100%";
            let body = document.querySelector("body");
            body.style.cursor = "default"; // reset cursor

        }

        error.config.metadata.endTime = new Date().getTime();
        error.config.metadata.durationInMS = error.config.metadata.endTime - error.config.metadata.startTime;

        console.log(`Request took ${error.config.metadata.durationInMS} milliseconds.`)
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
function updateProgess(progressEvent) {
    // console.log(progressEvent);
    const { loaded, total } = progressEvent;
    if (total) {
        const percent = Math.floor((loaded / total) * 100);
        progressBar.style.width = percent + "%";
    }
}
/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
export async function favourite(imgId) {
    // your code here
    console.log("img Id is", imgId);
    try {
        let existRes = await axios.get("https://api.thedogapi.com/v1/favourites", {
            params: { image_id: imgId }
        });
        console.log("existing fav is", existRes.data);
        // if image is already favorited then delete it
        if (existRes.data.length > 0) {
            console.log("I am deleting", existRes.data[0].id);
            await axios.delete(
                `https://api.thedogapi.com/v1/favourites/${existRes.data[0].id}`
            );
        } else {
            console.log("I am posting", existRes.data);
            const response = await axios.post(
                "https://api.thedogapi.com/v1/favourites",
                { image_id: imgId }
            );
        }

        progressBar.style.width = "100%";
    } catch (error) {
        console.error(error.message);
        progressBar.style.width = "0%";
    }
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */
getFavouritesBtn.addEventListener("click", Cast.getCast);
// Cast.getCast();
// async function getCast(event) {
//     try {
//         infoDump.innerHTML = "";
//         let castName=document.getElementById("searchBox");
//         console.log("cast name is",castName.value);
//         console.log("inside new fun");
//         let searchRes = await axios.get(`https://potterapi-fedeperin.vercel.app/en/characters?search=${castName.value}`);
//         console.log("data lenght is", searchRes.data.length)
//         if (searchRes.data.length!=0) {
//             console.log("fav list is", searchRes.data);
//             Carousel.clear();
//             for (let i = 0; i < searchRes.data.length; i++) {
//                 console.log("url is", searchRes.data[i].image);
//                 console.log("image id is", searchRes.data[i].index);

//                 let img = Carousel.createCarouselItem(searchRes.data[i].image, "", searchRes.data[i].index)
//                 Carousel.appendCarousel(img);
//                 // Carousel.start();
//                 createCharProfile(searchRes);
//             }
//         }
//         else{
//             alert("Incorrect first name of the book character");
//             throw new Error("Incorrect first name of the book character");
//         }
//     }
//     catch (error) {
//         console.error(error.message);
//     }
// }

// async function createCharProfile(response) {
//     infoDump.innerHTML = "";
//     console.log("reponse in get cast is",response);
//     let p = document.createElement("p");
//     p.innerHTML = `<b> Full Name: </b> ${response.data[0].fullName} <br/><br/>
//     <b> Nickname: </b> ${response.data[0].nickname} <br/><br/>
//     <b> Hogwarts House: </b>  ${response.data[0].hogwartsHouse} <br/><br/>
//     <b> Interpreted By: </b>  ${response.data[0].interpretedBy} <br/><br/>
//     <b> Children: </b> ${response.data[0].children}  <br/><br/>
//     <b> Birthdate: </b> ${response.data[0].birthdate}  <br/><br/>
//     `;
//     infoDump.appendChild(p);
// }
/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */
