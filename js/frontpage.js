"use strict";
const url = "http://localhost:3000";
const swipe = document.querySelector(".swipe");
const link = document.querySelector(".link");

let isSwiping = false;
let carID = 1; //vaihda tämä databasessa olevaan numeroon

document.querySelector("#likeButton").addEventListener("click", () => {
  rateCar(true);
  isSwiping = true;
});
document.querySelector("#dislikeButton").addEventListener("click", () => {
  rateCar(false);
  isSwiping = true;
});

function createStartCards() {
  getCar(true);
  carID++;
  getCar(false);
}

function rateCar(isLike) {
  if (isSwiping) {
    return;
  }

  const card1 = document.querySelector(".card1");
  const card2 = document.querySelector(".card2");
  const profileContent = document.querySelector(".profile-content");

  profileContent.remove();
  if (isLike) {
    if (card1.classList.contains("disliked")) {
      card1.classList.remove("disliked");
    }
    card1.classList.add("liked");
    card2.classList.remove("behind");
    setTimeout(() => {
      deleteOldCard(card1, card2);
    }, 1000);
    return;
  }

  console.log("dislike");
  if (card1.classList.contains("liked")) {
    card1.classList.remove("liked");
  }
  card1.classList.add("disliked");
  card2.classList.remove("behind");
  setTimeout(() => {
    deleteOldCard(card1, card2);
  }, 1000);
}
function deleteOldCard(card1, card2) {
  console.log("delete element");
  card1.remove();
  card2.classList.add("card1");
  card2.classList.remove("card2");
  const profile2 = document.querySelector(".hidden");
  if (profile2 != null) {
    profile2.classList.remove("hidden");
    profile2.classList.add("visible");
  }
  getCar();
}
const getCar = async (isFirst) => {
  try {
    const response = await fetch(url + "/car/" + carID);
    const nextCar = await response.json();
    //console.log(nextCar);
    createCard(nextCar, isFirst);
  } catch (e) {
    console.log(e.message);
  }
};

function createCard(car, isFirstCard) {
  const newCarCard = document.createElement("img");
  newCarCard.src = url + "/" + car.Image;
  newCarCard.alt = car.Brand;
  newCarCard.classList.add("car-image");
  if (isFirstCard) {
    newCarCard.classList.add("card1");
    swipe.appendChild(newCarCard);
    createProfile(car, false);
    return;
  }
  newCarCard.classList.add("card2");
  newCarCard.classList.add("behind");
  swipe.appendChild(newCarCard);
  carID++;
  createProfile(car, true);
}

function createProfile(car, hide) {
  const profileContent = document.createElement("div");
  profileContent.classList.add("profile-content");
  if (!hide) {
    profileContent.classList.add("visible");
  }

  const profileName = document.createElement("h2");
  profileName.id = "profileName";
  profileName.classList.add("profile-name");
  profileName.innerHTML = car.Brand + " " + car.Model;

  const profileDesc = document.createElement("p");
  profileDesc.id = "profileDesc";
  profileDesc.classList.add("profile-desc");
  if (hide) {
    profileContent.classList.add("hidden");
  }
  profileDesc.innerHTML = car.Description;

  profileContent.appendChild(profileName);
  profileContent.appendChild(profileDesc);
  link.appendChild(profileContent);
  isSwiping = false;
}
// getCar();
createStartCards();
