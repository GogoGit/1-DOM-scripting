//Note since we are only importing 1 item, we don't need to use {}

import navItemsObject from './navitems.js';

export function makeNav() {
    const nav = document.querySelector('.main-menu');
    // Note we formated the Template String (Prettier doesn't do it for you; also makes it easier to read)
    const markup = `
        <ul>
        ${navItemsObject
            .map(
                (item, index) =>
                    `<li class="navitem-${index}"><a href="${item.link}">${item.label}</a></li>`,
            )
            .join('')}
        </ul>
    `;

    nav.querySelector('#main-nav').innerHTML = markup;
}
