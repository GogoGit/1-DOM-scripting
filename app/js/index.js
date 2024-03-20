// Dynamically creating headers.  You'll see a second Nav List get created!
// const nav = document.querySelector('.main-menu');
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
// navItemsArray.forEach(item => {
//     let listItem = document.createElement('li');
//     listItem.innerHTML = `<a href="#">${item}</a>`;
//     navList.appendChild(listItem);
// });

//Now we are using the nav object vs nav array (see navitems.js)
// navItemsObject.forEach(function (item) {
//     let listItem = document.createElement('li');
//     listItem.innerHTML = `<a href="${item.link}">${item.label}</a>`;
//     navList.appendChild(listItem);
// });

// nav.append(navList);

// EXERCISE III - Using Array.prototype.map()
// const nav = document.querySelector('.main-menu');

// const markup = `
//     <ul>
//       ${navItemsObject.map(function (item) {
//           return `<li><a href="${item.link}">${item.label}</a></li>`;
//       })}
//     </ul>
//     `;

// console.log(markup);

// nav.innerHTML = markup;

// Refactored
const nav = document.querySelector('.main-menu');

//Note Prettier by default wraps text longer than 80 characters!!!
//  Join removes the ","
const markup = `
    <ul>
      ${navItemsObject
          .map((item) => `<li><a href="${item.link}">${item.label}</a></li>`)
          .join('')}
    </ul>
    `;

console.log(markup);

// This messes up our responsive design becuase it replaces the anchor tab in the index.html
// nav.innerHTML = markup;

nav.querySelector('#main-nav').innerHTML = markup;
