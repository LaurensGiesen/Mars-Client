"use strict";

document.addEventListener("DOMContentLoaded", init);

async function init() {
    config = await loadConfig();
    // Small poc
    autoFill()
    document.querySelector("input[type='submit']").addEventListener("click", register);

}

function register(e) {
    e.preventDefault();
    const data = JSON.stringify({
        firstname: document.querySelector("#foreName").value,
        lastname: document.querySelector("#surName").value,
        email: document.querySelector("#email").value,
        birthDay: document.querySelector("#birthDay").value,
        address: document.querySelector("#address").value,
        number: parseInt(document.querySelector("#number").value),
        dome: document.querySelector("#dome").value,
        crop1: document.querySelector("#crop1").value,
        crop2: document.querySelector("#crop2").value,
        crop3: document.querySelector("#crop3").value,
    });
    registerCall("register", 'POST', data).then((response ) => {
        if(response){
            window.location.href = "map.html";
        }else{
            console.log(response);
        }
    });
}

function autoFill(){
    document.querySelector("#foreName").value = "John";
        document.querySelector("#surName").value = "Doe";
        document.querySelector("#email").value = "JohnDoe@gmail.com";
        document.querySelector("#birthDay").value = "01-01-2001";
        document.querySelector("#address").value = "Mountain 1";
        document.querySelector("#number").value = "443";
        document.querySelector("#dome").value = "404";
        document.querySelector("#crop1").value = "Apple";
        document.querySelector("#crop2").value = "Potato";
        document.querySelector("#crop3").value = "Raspberry Pi";
}
