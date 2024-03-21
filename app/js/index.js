import { makeNav } from './modules/nav.js';
// some people use .mjs (modular) vs .js

const root = document.querySelector('.site-wrap');
// const nytapi = "KgGi6DjX1FRV8AlFewvDqQ8IYFGzAcHM"; // note this should be your API key
const nytapi = 'oPLG8YzOchvb5TKZ1nBt4wGD4EpD2NcB'; // note this should be your API key
const nytUrl = `https://api.nytimes.com/svc/topstories/v2/travel.json?api-key=${nytapi}`;

// fetch(nytUrl)
//     .then(function (response) {
//         return response.json(); //Look it's a promise (returns response )
//     })
//     .then(function (myJson) {
//         console.log(myJson);
//         console.dir(myJson);    //Look it's another promise
//     });

//Refactor using arrow functions
fetch(nytUrl)
    .then((response) => response.json())
    .then((myJson) => localStorage.setItem('stories', JSON.stringify(myJson)))
    .then(renderStories);

// function renderStories() {
//     let data = JSON.parse(localStorage.getItem('stories'));
//     // using forEach method as it does not return anything!!!
//     data.results.forEach((story) => {
//         console.log(story);
//     });
// }

function renderStories() {
    let data = JSON.parse(localStorage.getItem('stories'));
    data.results.forEach((story) => {
        let storyEl = document.createElement('div');
        storyEl.className = 'entry';
        storyEl.innerHTML = `
        <img src="${story.multimedia ? story.multimedia[0].url : ''}" alt="${
            story.title
        }" />
        <div>
          <h3><a target="_blank" href="${story.url}">${story.title}</a></h3>
          <p>${story.abstract}</p>
        </div>
        `;
        root.prepend(storyEl);
    });
}

makeNav();
