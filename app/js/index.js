// Dynamically creating headers.  You'll see a second Nav List get created!
const nav = document.querySelector('.main-menu');
const navList = document.createElement('ul');

//3 ways to write loops

//1) First, switch out the old school concatenation for a template string:
// for (let i = 0; i < navItemsArray.length; i++) {
//     let listItem = document.createElement('li');
//     let linkText = navItemsArray[i];
//     listItem.innerHTML = '<a href="#">' + linkText + '</a>';
//     navList.append(listItem);
// }

//2) forEach
// navItemsArray.forEach(function (item) {
//     let listItem = document.createElement("li");
//     listItem.innerHTML = `<a href="#">${item}</a>`;
//     navList.appendChild(listItem);
// });

//3)Use an arrow function in the final script:
navItemsArray.forEach(item => {
    let listItem = document.createElement('li');
    listItem.innerHTML = `<a href="#">${item}</a>`;
    navList.appendChild(listItem);
});

nav.append(navList);
