const name = document.getElementById("name");
const username = document.getElementById("username");
const email = document.getElementById("email");
const loc = document.getElementById("location");
const gists = document.getElementById("gists");
const image = document.getElementById("image");
const repository = document.getElementById("repos");
const details = document.getElementById("details");

const search = async (event) => {
    event.preventDefault();
    const user = document.getElementById("search").value;

    try {
        Promise.all([getUser(user), getUserRepo(user)]).then((values) => {
            const userData = values[0];
            const repoData = values[1];

            name.innerHTML = userData.name;
            username.innerHTML = userData.login;
            email.innerHTML = userData.email;
            loc.innerHTML = userData.location;
            gists.innerHTML = userData.public_gists;
            image.src = userData.avatar_url;

            repository.innerHTML = "";
            repoData.forEach((element) => {
                const item = document.createElement("div");
                item.className = "repo";
                item.innerHTML =
                    "<p><strong>Name</strong> " +
                    element.name +
                    "</p>" +
                    "<p><strong>Description</strong> " +
                    element.description +
                    "</p>";
                repository.appendChild(item);
            });

            if (repoData.length > 6) {
                repository.className = "scrollable";
                repository.style.height = details.offsetHeight + "px";
            }
        }
        );
    } catch (error) {
        console.log(error);
        
    }
};

document.getElementById("searchForm").addEventListener("submit", search);

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
};
