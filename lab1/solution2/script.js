let notes = [];
const add = () => {
    let note = document.getElementById("add").value;
    if (note == "") {
        alert("Please enter note");
        return;
    }
    let color = document.querySelector('input[name="color"]:checked').value;
    notes.push({ note: note, color: color });
    document.getElementById("add").value = "";
    document.getElementById("add").focus();
    display();
};

const edit = (index) => {
    let note = prompt("Edit note", notes[index].note);
    if (note != null) {
        notes[index].note = note;
        display();
    }
};

const remove = (index) => {
    notes.splice(index, 1);
    display();
};

const display = () => {
    let html = "";
    for (let i = 0; i < notes.length; i++) {
        html +=
            "<div class='note' style='background-color: " +
            notes[i].color +
            "'>";
        html += "<p class='n'>" + notes[i].note + "</p>";
        html += "<button onclick='edit(" + i + ")'>Edit</button>";
        html += "<button onclick='remove(" + i + ")'>Delete</button>";
        html +=
            "<button onclick='changeColour(" + i + ")'>Change Colour</button>";
        html += "</div>";
    }
    document.getElementsByClassName("notes")[0].innerHTML = html;
};

const removeAll = () => {
    notes = [];
    display();
};

const removeByColour = () => {
    let color = document.querySelector('input[name="color"]:checked').value;
    let newNotes = [];
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].color != color) {
            newNotes.push(notes[i]);
        }
    }
    notes = newNotes;
    display();
};

const changeColour = (index) => {
    let color = document.querySelector('input[name="color"]:checked').value;
    notes[index].color = color;
    display();
};
