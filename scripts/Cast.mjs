// This mjs script is handling functions related to Cast.
// when get cast by name button is clicked. It:
// Fetches one character based on search name
// Displays details of that character

// when get entire cast button is clicked, it:
// fetches entire cast array and uses cast carousal mjs to display in carousal format



import * as Books from "./Books.mjs";
import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/esm/axios.min.js";
import * as bootstrap from "https://esm.sh/bootstrap@5.3.2";
// import { updateProgess} from "./script.mjs";
import * as castCarousal from "./castCarousal.mjs"

export async function getCast(event) {
    try {
        event.preventDefault();
        infoDump.innerHTML = "";
        castCarousal.castClear();
        Books.clear();
        // remove the div classes that were created for cast carousal
        const divItem = document.querySelector(".carousel-item");
        const divCard = document.querySelector(".card");
        console.log("right now is",divItem,divCard);
        if (divItem!=null || divCard!=null){
            divItem.remove();
            divCard.remove();
        }

        let castName = document.getElementById("searchBox");
        let searchRes = await axios.get(`https://potterapi-fedeperin.vercel.app/en/characters?search=${castName.value}`,
            // {
            //     onDownloadProgress: updateProgess
            // }
        );
        if (castName.value == "") {
            throw new Error("Enter a cast name");
        }


        if (searchRes.data.length != 0) {
            Books.clear();
            for (let i = 0; i < searchRes.data.length; i++) {
                console.log("url is", searchRes.data[i].image);
                console.log("image id is", searchRes.data[i].index);

                let img = Books.createBooksItem(searchRes.data[i].image, "", searchRes.data[i].index)
                Books.appendBooks(img);
                createCharProfile(searchRes);
            }
        }
        else {
            alert("Incorrect first name of the book character");
            throw new Error("Incorrect first name of the book character");
        }
        // progressBar.style.width = "100%";
        castName.value="";
        castName.focus();
    }
    catch (error) {
        // progressBar.style.width = "0%";
        console.error(error.message);
    }
}

async function createCharProfile(response) {
    infoDump.innerHTML = "";
    console.log("reponse in get cast is", response);
    let p = document.createElement("p");
    p.innerHTML = `<b> Full Name: </b> ${response.data[0].fullName} <br/><br/>
    <b> Nickname: </b> ${response.data[0].nickname} <br/><br/>
    <b> Hogwarts House: </b>  ${response.data[0].hogwartsHouse} <br/><br/>
    <b> Interpreted By: </b>  ${response.data[0].interpretedBy} <br/><br/>
    <b> Children: </b> ${response.data[0].children}  <br/><br/>
    <b> Birthdate: </b> ${response.data[0].birthdate}  <br/><br/>`;
    infoDump.appendChild(p);
}


export async function getAllCast(event) {
    try {
        event.preventDefault();
        console.log("I am in all cast function");
        infoDump.innerHTML = "";
        castCarousal.castClear();
        Books.clear();
        let castName = document.getElementById("searchBox");
        let searchRes = await axios.get(`https://potterapi-fedeperin.vercel.app/en/characters?search=${castName.value}`,
            // {
            //     onDownloadProgress: updateProgess
            // }
        );
        console.log("my all cast array is",searchRes.data);
        if (searchRes.data.length != 0) {
            // Books.castClear();
            // const infodiv=document.getElementById("infoDump");
            // infodiv.remove();
            
            // const wrapDiv = document.createElement("div");
            // wrapDiv.classList.add("img-wrapper")
            // divCard.appendChild(wrapDiv);
            const divItem = document.createElement("div");
            divItem.classList.add("carousel-item");
            const divCard = document.createElement("div");
            divCard.classList.add("card","d-flex");
            divItem.appendChild(divCard);
            const carouselCast = document.querySelector(".infoImg");
            carouselCast.appendChild(divItem)

            for (let i = 0; i < searchRes.data.length; i++) {
                console.log("url is", searchRes.data[i].image);
                console.log("image id is", searchRes.data[i].index);

                let img = castCarousal.createCastItem(searchRes.data[i].image, "", searchRes.data[i].index)
                

                
                castCarousal.appendCast(img);
               
                // createCharProfile(searchRes);
            }
            castCarousal.start();
        }
        else {
            alert("Incorrect first name of the book character");
            throw new Error("Incorrect first name of the book character");
        }
        // progressBar.style.width = "100%";
        castName.value = "";
        castName.focus();
    }
    catch (error) {
        // progressBar.style.width = "0%";
        console.error(error.message);
    }
}
