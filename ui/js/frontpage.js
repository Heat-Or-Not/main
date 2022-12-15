"use strict";
const url = "http://localhost:3000";
const swipe = document.querySelector(".swipe");
const link = document.querySelector(".link");

let isSwiping = false;
let isAtEnd = false;
let lastViewed; //curernt viewed to store to database
let swipeCarID; // car id behind the first one
let loggedInUser;

document.querySelector("#likeButton").addEventListener("click", () => {
  if (isAtEnd) {
    deleteLastCard(true);
    return;
  }
  rateCar(true);
  isSwiping = true;
});
document.querySelector("#dislikeButton").addEventListener("click", () => {
  if (isAtEnd) {
    deleteLastCard(false);
    return;
  }
  rateCar(false);
  isSwiping = true;
});

function createStartCards() {
  getCar(true);
  swipeCarID++;
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
    incrementCarID();
    sendRating(true);
    setTimeout(() => {
      deleteOldCard(card1, card2);
    }, 1000);
    return;
  }
  if (card1.classList.contains("liked")) {
    card1.classList.remove("liked");
  }
  card1.classList.add("disliked");
  card2.classList.remove("behind");
  incrementCarID();
  sendRating(false);
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
    const response = await fetch(url + "/car/" + swipeCarID);
    const nextCar = await response.json();
    //console.log(nextCar);
    if (nextCar.Brand === undefined && nextCar.Model === undefined) {
      // if database does not have any more cars
      isAtEnd = true;
      return;
    }
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
  swipeCarID++;
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

const sendRating = async (status) => {
  try {
    const fd = new FormData();
    const inFrontCarID = swipeCarID - 2;
    if (status === true) {
      fd.append("status", 1); //status
    } else {
      fd.append("status", 0); //status
    }
    fd.append("CarID", inFrontCarID); //inFrontCarID
    fd.append("UserID", loggedInUser);

    const fetchOptions = {
      method: "POST",
      body: fd,
    };

    const response = await fetch(url + "/like", fetchOptions);
    const json = await response.json();
    console.log(json.message);
  } catch (e) {
    console.log(e.message);
  }
};

function deleteLastCard(isLike) {
  const card1 = document.querySelector(".card1");
  const profileContent = document.querySelector(".profile-content");

  if (profileContent === null && card1 === null) {
    return;
  }
  profileContent.remove();
  if (isLike) {
    if (card1.classList.contains("disliked")) {
      card1.classList.remove("disliked");
    }
    card1.classList.add("liked");
    sendRating(true);
    setTimeout(() => {
      card1.remove();
    }, 1000);
    return;
  }
  console.log("dislike");
  if (card1.classList.contains("liked")) {
    card1.classList.remove("liked");
  }
  card1.classList.add("disliked");
  sendRating(false);
  setTimeout(() => {
    card1.remove();
  }, 1000);
}
const getLoggedInUser = async () => {
  try {
    const response = await fetch(url + "/getUserInfo");
    const loggedInUser = await response.json();
    getLastViewed(loggedInUser);
    getLoggedInUserID(loggedInUser);
  } catch (e) {
    console.log(e.message);
  }
};
function getLastViewed(user) {
  lastViewed = parseInt(user[0].LastViewed);
  swipeCarID = lastViewed;
  createStartCards();
}
const getLoggedInUserID = async (user) => {
  loggedInUser = user[0].UserID;
};
const incrementCarID = async () => {
  try {
    // route to lastViewed update
    lastViewed++;
    const formdata = new FormData();
    formdata.append("LastViewed", lastViewed);
    formdata.append("UserID", loggedInUser);
    // console.log("cid: " + lastViewed + " user: " + loggedInUser);
    const options = {
      method: "PUT",
    };
    // console.log(fetchOptions);
    const response = await fetch(
      url + `/car/getLW?LastViewed=${lastViewed}&UserID=${loggedInUser}`,
      options
    );
    // const json = await response.json();
  } catch (e) {
    console.log(e.message);
  }
};
getLoggedInUser();
// getCar();
