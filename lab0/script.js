const counter = document.getElementById('counter');
let count = 0;

const plus = () => {
    count++;
    counter.innerText = count;
}

const minus = () => {
    count--;
    counter.innerText = count;
}
