const name = document.getElementById("name");
const username = document.getElementById("username");
const email = document.getElementById("email");
const loc = document.getElementById("location");
const gists = document.getElementById("gists");
const image = document.getElementById("image");
const repository = document.getElementById("repos");
const details = document.getElementById("details");

const search = () => {
    const user = document.getElementById("search").value;
    const result = getUser(user);
    result.then((data) => {
        name.innerHTML = data.name;
        username.innerHTML = data.login;
        email.innerHTML = data.email;
        loc.innerHTML = data.location;
        gists.innerHTML = data.public_gists;
        image.src = data.avatar_url;
    });

    const repo = getUserRepo(user);
    repo.then((data) => {
        data.forEach((element, index) => {
            const item = document.createElement("div");
            item.className = "repo";
            item.innerHTML = "<p><strong>Name</strong> " + element.name + "</p>" +
            "<p><strong>Description</strong> " + element.description + "</p>";
            repository.appendChild(item);

            if(index > 5) {
                repository.className = "scrollable";
                repository.style.height = details.offsetHeight + "px";
            }
        });
    });
};

const getUser = async (user) => {
    const response = await fetch(`https://api.github.com/users/${user}`);
    const data = await response.json();
    console.log(data);
    return data;
};

const getUserRepo = async (user) => {
    const response = await fetch(`https://api.github.com/users/${user}/repos`);
    const data = await response.json();
    console.log(data);
    return data;
}