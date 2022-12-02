"use strict";
const swipe = document.querySelector(".swipe");
const profileName = document.querySelector("#profileName");
let isSwiping = false;

document.querySelector("#likeButton").addEventListener("click", () => {
  rateCar(true);
  isSwiping = true;
});
document.querySelector("#dislikeButton").addEventListener("click", () => {
  rateCar(false);
  isSwiping = true;
});

function rateCar(status) {
  if (isSwiping) {
    return;
  }
  const card1 = document.querySelector(".card1");
  const card2 = document.querySelector(".card2");
  if (status) {
    console.log("like");
    if (card1.classList.contains("disliked")) {
      card1.classList.remove("disliked");
    }
    card1.classList.add("liked");
    card2.classList.remove("behind");
    profileName.innerHTML = "Uus username";
    setTimeout(() => {
      deleteOldCar(card1, card2);
    }, 1000);
    return;
  }
  console.log("dislike");
  if (card1.classList.contains("liked")) {
    card1.classList.remove("liked");
  }
  card1.classList.add("disliked");
  card2.classList.remove("behind");
  profileName.innerHTML = "Uus username";
  setTimeout(() => {
    deleteOldCar(card1, card2);
  }, 1000);
}
function deleteOldCar(card1, card2) {
  console.log("delete element");
  card1.remove();
  card2.classList.add("card1");
  card2.classList.remove("card2");
  createCarTwo();
  isSwiping = false;
}
function createCarTwo() {
  const newCarCard = document.createElement("img");
  newCarCard.src = "images/car2.jpeg";
  newCarCard.classList.add("card2");
  newCarCard.classList.add("car-image");
  newCarCard.classList.add("behind");
  swipe.appendChild(newCarCard);
}
