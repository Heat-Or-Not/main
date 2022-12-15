//TODO get car likes and username from database and display it in ranking with for loop.

const getLikes = async () => {
    const response = await fetch(`${env.baseUrl}/like`);
    const json = await response.json();
    if (response.status >= 400) {
        console.error("Failed to fetch likes", {
            status: response.status,
            error: json,
        })
        return []
    }
    console.log('Get likes', json);
    return json;
}

const getCar = async (id) => {
    const response = await fetch(`${env.baseUrl}/car/${id}`);
    const json = await response.json()
    if (response.status >= 400) {
        console.error("Failed to fetch car details for " + id, {
            status: response.status,
            error: json,
        })
        return undefined
    }
    console.log('Get car ' + id, json);
    return json;
}

const getUser = async (id) => {
    const response = await fetch(`${env.baseUrl}/user/${id}`);
    const json = await response.json()
    if (response.status >= 400) {
        console.error("Failed to fetch user info for " + id, {
            status: response.status,
            error: json,
        })
        return undefined
    }
    console.log('Get user ' + id, json);
    return json;
}

const getRankings = async () => {





}

getLikes();
getCar(3);
getUser(4);


const createUser = () => {
    const listContainer = document.querySelector(".list_container");
    const div_List_Container = document.createElement("div");
    div_List_Container.setAttribute('class', 'list');
    listContainer.appendChild(div_List_Container);
    const line = document.createElement("div");
    //line jonka sisälle laitetaan kaikki!
    line.setAttribute('class', 'line');
    div_List_Container.appendChild(line)
    const user = document.createElement("div");
    user.setAttribute('class', 'user');
    line.appendChild(user);
    const profile = document.createElement("div");
    profile.setAttribute('class', 'profile');
    user.appendChild(profile)

    //profile image
    const image = document.createElement("img");
    image.src = userdata[0].image;

    profile.appendChild(image);
    const details = document.createElement("div");
    profile.setAttribute('class', 'details');

    //username
    const username = document.createElement("h3");
    username.innerText = userdata[1].Brand;
    username.setAttribute('class', 'username');
    details.appendChild(username);
    user.appendChild(details);

    const likes = document.createElement("div");
    likes.setAttribute('class', 'likes');
    const fireicon = document.createElement("i");
    fireicon.setAttribute('class', 'fa-solid fa-fire');
    likes.appendChild(fireicon);

    // likes value
    const likesNumber = document.createElement("h3");

    likes.appendChild(likesNumber);
    line.appendChild(likes);
    const contact = document.createElement("div");
    contact.setAttribute('class', 'contact');
    //link to profile
    const linkToProfile = document.createElement("a");

    contact.appendChild(linkToProfile);
    line.appendChild(contact);
}
