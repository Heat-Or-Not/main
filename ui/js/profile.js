'use strict';


async function getUserdata() {
    let response = await fetch('http://localhost:3000/getUserInfo')
    let users = await response.json()
    console.log(users)

    const email = users[0].email;
    const user = users[0].Username;
    const imageID = users[0].Image;
    console.log(email);
    console.log(user);
    console.log(imageID);

    document.getElementById("nimi").innerHTML = user;
    document.getElementById("email").innerHTML = email;

    // Tämä linkki pitää vaihtaa sitten serverin osoitteeseen!
    const url = "https://users.metropolia.fi/~adamah/images/" + imageID;
    console.log(url);
    document.getElementById('pic').src = url;

}

getUserdata()