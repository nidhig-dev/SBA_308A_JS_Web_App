import * as Carousel from "./Carousel.mjs";
import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/esm/axios.min.js";
import * as bootstrap from "https://esm.sh/bootstrap@5.3.2";

export async function getCast(event) {
    try {
        infoDump.innerHTML = "";
        let castName = document.getElementById("searchBox");
        console.log("cast name is", castName.value);
        console.log("inside new fun");
        let searchRes = await axios.get(`https://potterapi-fedeperin.vercel.app/en/characters?search=${castName.value}`);
        console.log("data lenght is", searchRes.data.length)
        if (searchRes.data.length != 0) {
            console.log("fav list is", searchRes.data);
            Carousel.clear();
            for (let i = 0; i < searchRes.data.length; i++) {
                console.log("url is", searchRes.data[i].image);
                console.log("image id is", searchRes.data[i].index);

                let img = Carousel.createCarouselItem(searchRes.data[i].image, "", searchRes.data[i].index)
                Carousel.appendCarousel(img);
                // Carousel.start();
                createCharProfile(searchRes);
            }
        }
        else {
            alert("Incorrect first name of the book character");
            throw new Error("Incorrect first name of the book character");
        }
    }
    catch (error) {
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
    <b> Birthdate: </b> ${response.data[0].birthdate}  <br/><br/>
    `;
    infoDump.appendChild(p);
}
