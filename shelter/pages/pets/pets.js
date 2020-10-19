
//Hamb
let checkbox = document.querySelector('#menu__toggle');
let overlay = document.querySelector("body > div > header > header > div.hamburger-menu > div");
console.log(checkbox);

overlay.addEventListener('click', () => checkbox.checked = false);