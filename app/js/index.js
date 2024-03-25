import { makeNav } from './modules/nav.js';
import navItemsObject from './modules/navitems.js';

const root = document.querySelector('.site-wrap');
// const nytapi = "KgGi6DjX1FRV8AlFewvDqQ8IYFGzAcHM"; // note Instructor API key
// const nytapi = 'oPLG8YzOchvb5TKZ1nBt4wGD4EpD2NcB'; // note this should be your API key
const nytapi = '87INHgSZyqypdcXwAnjLDiWSVT0mW7vA'; // note this should be your API key

// const nytUrl = `https://api.nytimes.com/svc/topstories/v2/travel.json?api-key=${nytapi}`;

const lstSort = document.getElementById('sort-Data');

// Not sure why this doen't work ?
// const chkFilter = document.getElementById('filter');

makeNav();

const categories = navItemsObject.map((item) => item.link); //creating our own array
// Note you need to makeNav() before you can manipulate it! LOL (order of operations)
const navItems = document.querySelectorAll('nav li');
// const navItems = document.querySelectorAll("li[class^='navitem-']"); //This is an attribute selector
// const navItems = document.querySelectorAll('nav li');  //This is the same as the above code.

// document.addEventListener("click", () =>{})
for (let i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener('click', () => {
        fetchArticles(categories[i]);
    });
}

function fetchArticles(section) {
    section = section.substring(1);
    if (!localStorage.getItem(section)) {
        console.log('section not in local storage, fetching');
        fetch(
            `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${nytapi}`,
        )
            .then((response) => response.json())
            .then((data) => setLocalStorage(section, data))
            .catch((error) => {
                console.warn(error);
            });
    } else {
        console.log('section in local storage');
        renderStories(section);
    }
}

function setLocalStorage(section, myJson) {
    localStorage.setItem(section, JSON.stringify(myJson));
    renderStories(section);
}

function setActiveTab(section) {
    const activeTab = document.querySelector('a.active');
    if (activeTab) {
        activeTab.classList.remove('active');
    }
    const tab = document.querySelector(`nav li a[href="#${section}"]`);
    tab.classList.add('active');
}

function renderStories(section) {
    console.log(section);
    setActiveTab(section);
    let data = JSON.parse(localStorage.getItem(section));

    if (data) {
        processStories(data);
    } else {
        console.log('data not ready yet');
    }
}

function processStories(data) {
    console.log(`Process Stories Count: ${data.results.length}`);
    data.results.forEach((story) => {
        let storyEl = document.createElement('div');
        storyEl.className = 'entry';
        storyEl.innerHTML = `
        <img src="${story.multimedia ? story.multimedia[0].url : ''}" 
        alt="${story.title}" />
        <div>
          <h3><a target="_blank" href="${story.url}">${story.title}</a></h3>
          <p>${story.abstract}</p>
        </div>
        `;
        root.append(storyEl);
        // root.prepend(storyEl);
    });
}

function removeEntries() {
    let entries = document.getElementsByClassName('entry');
    // for (let i = 0; i < entries.length; i++) {
    for (let i = entries.length - 1; i > -1; i--) {
        entries[i].remove();
        console.log(i);
    }
}

// entry

// const btn = document.getElementsByClassName("btn-Modify");
// btn.addEventListener("click", btnDo);

document.addEventListener('click', btnDo);

function modifyData(mySection, data) {}

function btnDo(event) {
    // console.dir(event.target);
    // console.dir(event);

    if (event.target.className === 'btn-Modify') {
        // console.dir('My button was clicked');

        try {
            var section = document.querySelector('a.active').text.toLowerCase();

            var sectionData = JSON.parse(localStorage.getItem(section));

            // Sort
            if (lstSort.value != 'None') {
                sectionData = SectionSort(
                    document.getElementById('sort-Data').value,
                    sectionData,
                );
            }

            // Filter
            if (document.getElementById('filter').checked === true) {
                sectionData = sectionFilter(section, sectionData);
            }

            removeEntries();
            processStories(sectionData);
        } catch (error) {
            console.log('No Section selected');
        }

        event.preventDefault();
    }
}

function sectionFilter(mySection, data) {
    let myDataFiltered = data.results.filter(
        (item) => item.section === mySection,
    );
    console.table(myDataFiltered);
    data.results = myDataFiltered;
    return data;
}

function SectionSort(mySort, data) {
    let results = data.results;
    var mySortedData;

    switch (mySort) {
        case 'byline':
            mySortedData = results.sort((a, b) =>
                String(a.byline).localeCompare(String(b.byline)),
            );
            break;
        case 'title':
            mySortedData = results.sort((a, b) =>
                String(a.title).localeCompare(String(b.title)),
            );
            break;
        case 'published_date':
            mySortedData = results.sort(
                (a, b) => a.published_date - b.published_date,
            );
            break;
        case 'created_date':
            mySortedData = results.sort(
                (a, b) => a.created_date - b.created_date,
            );
            break;
        default:
            mySortedData = data.results;
            console.log(`Unhandled sort type: '${mySort}'`);
    }

    console.table(mySortedData);
    data.results = mySortedData;
    return data;
}

function checkData(section, data) {
    console.log(`Section: ${section}`);
    let tmp;

    for (let i = 0; i < data.length; i++) {
        tmp = data[i][section];

        console.log(`\t${data[i].title}>>>>  ${tmp}`);
    }
}

// for(let i=0; i < data.length; i++){
//     console.log(`\t${data[i].title}, ${data[i].[section]}`);
// }

// for(let i=0; i < data.length; i++){
//     console.log(`\t${data[i].title}, ${data[i].[section]} `);
// }

/*
Filter out by section:
    var myDataFilter = JSON.parse( Data from fetch or from local storage  )
    var myDataFilter = myResults.filter((item) => item.section === "arts")

    document.getElementById("filter").checked



Sort by:  byline, title, published_date or created_date
https://www.freecodecamp.org/news/how-to-sort-array-of-objects-by-property-name-in-javascript/
    Array.sort((a, b) => a.age - b.age)
    Sort Strings
        mySortedData = myResults.sort((a, b) => String(a.byline).localeCompare(String(b.byline)))
    
    I Think this works by Date
        mySortedData = myResults.sort((a, b) => a.created_date - b.created_date)

    document.getElementById("sort-Data").value
    
*/
