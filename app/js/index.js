//imports
import { makeNav } from './modules/nav.js';
import navItemsObject from './modules/navitems.js';

//variables
let bolDebug = false;
//Need to figure out how to use Environmental Varibles from netlify
// Local: .env, Web: Stored in Netlify Environment Variable
const nytapi = '87INHgSZyqypdcXwAnjLDiWSVT0mW7vA';

// const nytUrl = `https://api.nytimes.com/svc/topstories/v2/travel.json?api-key=${nytapi}`;

makeNav();

const btn = document.getElementsByClassName('btn-Modify');
const root = document.querySelector('.site-wrap');
// const lstSort = document.getElementById('sort-Data'); //Not sure why this doesn't work?
// const chkFilter = document.getElementById('filter'); // Not sure why this doen't work ?

const categories = navItemsObject.map((item) => item.link); //creating our own array
// Note you need to makeNav() before you can manipulate it! LOL (order of operations)
const navItems = document.querySelectorAll('nav li');
// const navItems = document.querySelectorAll("li[class^='navitem-']"); //This is an attribute selector
// const navItems = document.querySelectorAll('nav li');  //This is the same as the above code.

// document.addEventListener("click", () =>{})

// functions
for (let i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener('click', () => {
        fetchArticles(categories[i]);
    });
}

function fetchArticles(section) {
    section = section.substring(1);
    if (!localStorage.getItem(section)) {
        if (bolDebug) {
            console.log(
                `funciton fetchArticles - section not in local storage, fetching`,
            );
        }
        fetch(
            `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${nytapi}`,
        )
            .then((response) => response.json())
            .then((data) => setLocalStorage(section, data))
            .catch((error) => {
                console.warn(error);
            });
    } else {
        if (bolDebug) {
            console.log(
                `funciton fetchArticles - section in local storage, render`,
            );
        }
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
    if (bolDebug) {
        console.log(`funciton renderStories - Process ${section}`);
    }
    setActiveTab(section);
    let data = JSON.parse(localStorage.getItem(section));
    removeEntries();
    data = UpdateData(section, data);

    if (data) {
        processStories(data);
    } else {
        console.log('data not ready yet');
    }
}

function processStories(data) {
    if (bolDebug) {
        console.log(
            `funciton processStories - Process Stories Count: ${data.results.length}`,
        );
    }
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
        //root.prepend(storyEl);
    });
}

function removeEntries() {
    let entries = document.getElementsByClassName('entry');

    if (bolDebug) {
        console.log(`function removeEntries - Before count: ${entries.length}`);
    }

    for (let i = entries.length - 1; i > -1; i--) {
        entries[i].remove();
    }

    if (bolDebug) {
        console.log(`function removeEntries - After count: ${entries.length}`);
    }
}

function UpdateData(section, dataJSON) {
    /* 
Notes
    Filter out by section:
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

    let results = dataJSON.results;

    if (bolDebug) {
        console.log(`function UpdataData - Before updates:  ${results.length}`);
    }

    // check if we Filter Data
    if (document.getElementById('filter').checked === true) {
        //Know your data??? Filter on Food = 0, looking at the data I think we can filter by 'dining'
        if (section === 'food') {
            if (bolDebug) {
                console.log(`function UpdataData - filter 'food' by 'dining'`);
            }
            results = results.filter((item) => item.section === 'dining');
        } else {
            results = results.filter((item) => item.section === section);
        }

        if (bolDebug) {
            console.log(
                `function UpdataData (Filter Data) - After updates:  ${results.length}`,
            );
        }
    }

    // check if we sort Data
    let lstSort = document.getElementById('sort-Data');
    if (lstSort.value != 'none') {
        switch (lstSort.value) {
            case 'byline':
                results = results.sort((a, b) =>
                    String(a.byline).localeCompare(String(b.byline)),
                );
                break;
            case 'title':
                results = results.sort((a, b) =>
                    String(a.title).localeCompare(String(b.title)),
                );
                break;
            case 'published_date':
                results = results.sort(
                    (a, b) => a.published_date - b.published_date,
                );
                break;
            case 'created_date':
                results = results.sort(
                    (a, b) => a.created_date - b.created_date,
                );
                break;
            default:
                console.log(`Unhandled sort type: '${mySort}'`);
        }

        if (bolDebug) {
            console.log(
                `function UpdataData (Sort Data) - After updates:  ${results.length}`,
            );
        }
    }

    dataJSON.results = results;
    return dataJSON;
}

function btnModify(event) {
    if (bolDebug) {
        console.log(`function btnModify - Event Clicked:  ${event.value}`);
    }
    if (event.target.className === 'btn-Modify') {
        try {
            //Is anything selected?
            // event.preventDefault();
            let section = document.querySelector('a.active').text.toLowerCase();

            if (bolDebug) {
                console.log(`function btnModify - Modify Data!`);
            }
            renderStories(section);
        } catch {
            if (bolDebug) {
                console.log(
                    `function btnModify - Nothing Selected to display.`,
                );
            }
        }
    }
}

//Listeners
document.addEventListener('click', btnModify);
