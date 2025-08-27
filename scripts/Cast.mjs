// This mjs script handles functions related to Cast.
// When get cast by name button is clicked. It:
// Fetches one character based on search name
// Displays details of that character

// when get entire cast button is clicked, it:
// fetches entire cast array and uses cast carousal mjs to display characters in carousal format

import * as Books from "./Books.mjs";
import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/esm/axios.min.js";
import * as castCarousal from "./castCarousal.mjs"

// This fn gets one character and its info based on the search string entered
export async function getCast(event) {
    try {
        event.preventDefault();
        infoDump.innerHTML = "";
        castCarousal.castClear();
        Books.clear();
        // remove the div classes that were created for cast carousal
        const divItem = document.querySelector(".carousel-item");
        const divCard = document.querySelector(".card");
        if (divItem!=null || divCard!=null){
            divItem.remove();
            divCard.remove();
        }
        let castName = document.getElementById("searchBox");
        let searchRes = await axios.get(`https://potterapi-fedeperin.vercel.app/en/characters?search=${castName.value}`);
        // throw error if no name was entered in search
        if (castName.value == "") {
            throw new Error("Enter a cast name");
        }
        // if right name was entered and data was returned 
        if (searchRes.data.length != 0) {
            Books.clear();
            for (let i = 0; i < searchRes.data.length; i++) {
                let img = Books.createBooksItem(searchRes.data[i].image, "", searchRes.data[i].index)
                Books.appendBooks(img);
                createCharProfile(searchRes);
            }
        }
        else {
            // if wrong name was entered and no data was returned 
            alert("Incorrect first name of the book character");
            throw new Error("Incorrect first name of the book character");
        }
        castName.value="";
        castName.focus();
    }
    catch (error) {
        console.error(error.message);
    }}
// This fn displays the info section for the character
async function createCharProfile(response) {
    infoDump.innerHTML = "";
    let p = document.createElement("p");
    p.innerHTML = `<b> Full Name: </b> ${response.data[0].fullName} <br/><br/>
    <b> Nickname: </b> ${response.data[0].nickname} <br/><br/>
    <b> Hogwarts House: </b>  ${response.data[0].hogwartsHouse} <br/><br/>
    <b> Interpreted By: </b>  ${response.data[0].interpretedBy} <br/><br/>
    <b> Children: </b> ${response.data[0].children}  <br/><br/>
    <b> Birthdate: </b> ${response.data[0].birthdate}  <br/><br/>`;
    infoDump.appendChild(p);
}

// This fn returns an array of characters when get entire cast button is clicked.
export async function getAllCast(event) {
    try {
        event.preventDefault();
        console.log("I am in all cast function");
        infoDump.innerHTML = "";
        castCarousal.castClear();
        Books.clear();
        let castName = document.getElementById("searchBox");
        let searchRes = await axios.get(`https://potterapi-fedeperin.vercel.app/en/characters?search=${castName.value}`);
        console.log("my all cast array is",searchRes.data);
        if (searchRes.data.length != 0) {
            const divItem = document.createElement("div");
            divItem.classList.add("carousel-item");
            const divCard = document.createElement("div");
            divCard.classList.add("card","d-flex");
            divItem.appendChild(divCard);
            const carouselCast = document.querySelector(".infoImg");
            carouselCast.appendChild(divItem)

            for (let i = 0; i < searchRes.data.length; i++) {
                let img = castCarousal.createCastItem(searchRes.data[i].image, "", searchRes.data[i].index)
                castCarousal.appendCast(img);
            }
            castCarousal.start();
        }
        else {
            alert("Incorrect first name of the book character");
            throw new Error("Incorrect first name of the book character");
        }
        castName.value = "";
        castName.focus();
    }
    catch (error) {
        console.error(error.message);
    }
}
