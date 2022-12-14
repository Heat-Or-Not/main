'use strict';

fetch('http://localhost:3000/getUserInfo')
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        const email = data[0].email;
        const user = data[0].Username;
        const id = data[0].UserID;

        document.getElementById("nimi").innerHTML = user;
        document.getElementById("email").innerHTML = email;
        document.querySelector('input[name="UserID"]').value = id;

        const getImg = `http://localhost:3000/getUsers/${id}`;

        fetch(getImg)
            .then(response => response.json())
            .then(datas => {

                const imgID = datas[0].Image;

                // Tämä linkki pitää vaihtaa sitten serverin osoitteeseen!
                const url2 = "https://users.metropolia.fi/~adamah/images/" + imgID;
                document.getElementById('pic').src = url2;


            });
    });
///////////////////////////////////

//Car Uploading through profile



