"use strict";

document.addEventListener("DOMContentLoaded", run);

function run() {
    document.querySelector('#changeData').addEventListener('click', changeDataUser)
    document.querySelector("#change > table > tbody > tr:nth-child(1) > th:nth-child(2) > a")
        .addEventListener("click", openPopupSubscription);
    document.querySelector(".close").addEventListener("click", closePopupSubscription);
}

function changeDataUser() {
    let forename = document.querySelector('#forename').value;
    let surname = document.querySelector('#surname').value;
    let email = document.querySelector('#email').value;
    let dateOfBirth = document.querySelector('#dateOfBirth').value;
    let address = document.querySelector('#address').value;
    let number = document.querySelector('#number').value;
    let dome = document.querySelector('#dome').value;
const data = JSON.stringify({
        firstname: forename,
        lastname: surname,
        email: email,
        birthDay: dateOfBirth,
        address: address,
        number: parseInt(number),
        dome: dome
    });
    apiCall("updateUser/1", "POST", data).then(
        (res) => addSituation(res)
    );
}
function clear() {
    document.querySelector('.timerMessage').innerHTML = "";
}

function addSituation(res) {
    if (res) {
        document.querySelector('.timerMessage').innerHTML = `SUCCESSFULLY CHANGED YOUR DATA`;
        setTimeout(clear, 3000);

    } else {
        document.querySelector('.timerMessage').innerHTML = `FAILED TO CHANGE YOUR DATA`;
        setTimeout(clear, 3000);
    }

}

function openPopupSubscription(e) {
    e.preventDefault();
    document.getElementById("popup").style.display = "flex";

}

function closePopupSubscription(e) {
    e.preventDefault();
    document.getElementById("popup").style.display = "none";
}

