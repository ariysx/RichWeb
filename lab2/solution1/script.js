let contacts = [
    {
        name: "John",
        number: "1234567890",
        email: "test@gmail.com",
    },
    {
        name: "Jane",
        number: "0987654321",
        email: "jane@gmail.com",
    },
    {
        name: "Bob",
        number: "1234567890",
        email: "bob@gmail.com",
    },
];

let sortDirection = 'asc';

let searchResults = [];

const showError = (message) => {
    document.getElementById("error").innerText = "⚠️ " + message;
    console.log(message);

    setTimeout(() => {
        document.getElementById("error").innerText = "";
    }, 3000);
};

const add = (event) => {
    // prevent form from submitting
    event.preventDefault();

    let name = document.getElementById("name").value;
    let number = document.getElementById("number").value;
    let email = document.getElementById("email").value;

    if (name == "" || number == "" || email == "") {
        showError("Please fill in all fields");
        return;
    }

    // name validation
    if (name.length >= 20) {
        showError("Name must be less than 20 characters");
        return;
    }

    if (!isNaN(name)) {
        showError("Name must be a string");
        return;
    }

    // number validation
    if (number.length != 10) {
        showError("Number must be 10 digits");
        return;
    }

    if (isNaN(number)) {
        showError("Number must be a number");
        return;
    }

    // email validation
    if (!email.includes("@")) {
        showError("Email must contain @");
        return;
    }

    if (!email.includes(".")) {
        showError("Email must contain .");
        return;
    }

    if (email.length > 40) {
        showError("Email must be less than 40 characters");
        return;
    }

    contacts.push({ name: name, number: number, email: email });
    document.getElementById("name").value = "";
    document.getElementById("number").value = "";
    document.getElementById("email").value = "";
    display(contacts);
};

const display = (list) => {
    document.getElementById("contacts").innerHTML = list
        .map((contact) => {
            return `
                <tr>
                    <td>${contact.name}</td>
                    <td>${contact.number}</td>
                    <td>${contact.email}</td>
                </tr>
            `;
        })
        .join("");
};

display(contacts);

const search = () => {
    let search = document.getElementById("search").value;
    searchResults = contacts.filter((contact) => {
        return contact.number.includes(search);
    });
    display(searchResults);
};

const sort = () => {
    const listToSort = searchResults.length > 0 ? searchResults : contacts;

    listToSort.sort((a, b) => {
        if (sortDirection == 'asc') {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });

    sortDirection = sortDirection == 'asc' ? 'desc' : 'asc';

    display(listToSort);
}
