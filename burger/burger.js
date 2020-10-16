let pop  = document.querySelector("body > div > label");
let check = document.querySelector("#menu__toggle");
let buttonCheck = document.querySelector(".menu__btn");

document.onclick = function (event) {
    if(event.target.className != "menu__btn"){
        check.checked = false;
        buttonCheck.style.transform = 'rotate(0deg)';
    }
console.log(event.target);
}

buttonCheck.onclick = (event) => {
    if(check.checked == false){
        check.checked = true;
        buttonCheck.style.transform = 'rotate(90deg)';
    }
    else 
    {check.checked = false;
    buttonCheck.style.transform = 'rotate(0deg)';}
}
    

