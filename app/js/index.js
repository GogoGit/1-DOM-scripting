// Dynamically creating headers.  You'll see a second Nav List get created!
const nav = document.querySelector('.main-menu');
const navList = document.createElement('ul');

for (let i = 0; i < navItemsArray.length; i++) {
    let listItem = document.createElement('li');
    let linkText = navItemsArray[i];
    listItem.innerHTML = '<a href="#">' + linkText + '</a>';
    navList.append(listItem);
}

nav.append(navList);
