"use strict";
const url =
  /*"https://users.metropolia.fi/~veetiso/Heat-or-not"*/ "http://localhost:3000"; // change url when uploading to server

// select existing html elements
const addForm = document.querySelector("#addCarForm");
const userList = document.querySelector(".add-owner");

// submit add car form
addForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const fd = new FormData(addForm);
  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: fd,
  };
  const response = await fetch(url + "/car", fetchOptions);
  const json = await response.json();
  alert(json.message);
  //   location.href = "frontPage.html";
});
