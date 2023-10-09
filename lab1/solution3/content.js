//array of images
let catsImages = [
    "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
    "https://e3.365dm.com/21/03/768x432/skynews-cats-missing-microchip_5315182.jpg?20210323142004",
    "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fc3836660-7846-11eb-80c3-8cc375faed89.jpg?crop=5729%2C3222%2C187%2C805&resize=1200",
    "https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/petting_pet_cat-1296x728-header.jpg?w=1155&h=1528",
    "https://lh3.googleusercontent.com/pw/AL9nZEXYJlrVkYoKIkpx07_3F4HOiTiOheaoaiRAcwrUg3C613-jkzEubJ3k8Z9fDjG5IfVqCzorphZ00vp6mIyB79GtCsoyV69xXe9cqrA0zglgrcvYhH2UP4cDR88WTm1AmuyCxQHAWCB5JzKD7eD94dtNZA=w690-h920-no",
];

// import font
var link = document.createElement("link");
link.setAttribute("rel", "stylesheet");
link.setAttribute("type", "text/css");
link.setAttribute("href", "https://fonts.cdnfonts.com/css/cat-cat");
document.head.appendChild(link);

const randomRgba = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r},${g},${b},1)`;
};

const body = document.getElementsByTagName("body")[0];
body.style.fontFamily = "Arial, sans-serif";
body.style.background =
    "linear-gradient(90deg, " +
    randomRgba() +
    " 0%, " +
    randomRgba() +
    " 35%, " +
    randomRgba() +
    " 100%)";

//reverse through array of images
//getting random image from the array we created before (we use math.floor and math.random to grab a random index in the array)
const imgs = document.getElementsByTagName("img");
for (let i = 0; i < imgs.length; i++) {
    const randomImg = Math.floor(Math.random() * catsImages.length);
    imgs[i].src = catsImages[randomImg];
}

// random emoji generator
const emojis = ["😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾"];
const randomEmoji = () => {
    const random = Math.floor(Math.random() * emojis.length);
    return emojis[random];
};

//do the same for h1 elements
const headers = document.getElementsByTagName("h1");
for (let i = 0; i < headers.length; i++) {
    headers[i].innerText = "Cats are awesome." + randomEmoji();
    headers[i].style.fontFamily = "Cat Cat";
}

// change emoji every 1 seconds
setInterval(() => {
    for (let i = 0; i < headers.length; i++) {
        headers[i].innerText = "Cats are awesome." + randomEmoji();
    }
}, 1000);

// //do the same for p elements
// const p = document.getElementsByTagName("p");
// for (let i = 0; i < p.length; i++) {
//     p[i].innerText = "This website is now about cats.";
// }

// change p to "meow"
const p = document.getElementsByTagName("p");
for (let i = 0; i < p.length; i++) {
    let words = p[i].innerText.split(" ");
    let newWords = [];
    for (let j = 0; j < words.length; j++) {
        newWords.push("meow");
    }
    p[i].innerText = newWords.join(" ");
}

// get all elements and change cursor to help
const allElements = document.getElementsByTagName("*");
for (let i = 0; i < allElements.length; i++) {
    allElements[i].style.cursor = "help";
    allElements[i].style.color = randomRgba();
}
