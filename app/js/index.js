const nav = document.querySelector('.main-menu');
const navList = nav.querySelectorAll('li a');

// Look at index.html and you'll see that the Label and links are lower case vs the 1st letter being
//  uppercase.
for (let i = 0; i < navList.length; i++) {
    console.log(i);
    // Probably should be .innerText as .innerHTML opens a security hole that we don't
    //  exactly know how to fix as yet.
    navList[i].innerHTML = navItemsArray[i];
}
