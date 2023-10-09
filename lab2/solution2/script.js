const API = "https://jsonplaceholder.typicode.com/posts";

const getPosts = async () => {
    const response = await fetch(API);
    const data = await response.json();
    return data;
};

const posts = getPosts().then((data) => {
    const posts = data;

    const titlesWithMoreThan6Words = posts.filter(
        (post) => post.title.split(" ").length > 6
    );

    console.log(titlesWithMoreThan6Words);

    const words = posts.map((post) => post.body.split(" "));
    const wordsFlattened = words.flat();
    const wordFrequency = {};

    wordsFlattened.forEach((word) => {
        if (wordFrequency[word]) {
            wordFrequency[word]++;
        } else {
            wordFrequency[word] = 1;
        }
    });

    console.log(wordFrequency);
});
