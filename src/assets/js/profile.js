"use strict";

document.addEventListener("DOMContentLoaded", init);

async function init() {
    config = await loadConfig();
    requestFillingUsersDAta();
    document.querySelector("#change > table > tbody > tr:nth-child(1) > th:nth-child(2) > a")
        .addEventListener("click", openPopupSubscription);
    document.querySelector(".close").addEventListener("click", closePopupSubscription);

}

function requestFillingUsersDAta() {
    apiCall("getUser/1", "GET", null).then(
        (res) => {fillValuesInProfile(res)
    document.querySelector('#changeData').addEventListener('click', changeDataUser)});
}

function fillValuesInProfile(res) {
    let firstName = res.firstName;
    let lastName = res.lastName;
    let email = res.email;
    let dateOfBirth = res.dateOfBirth.dayOfMonth + "-" + res.dateOfBirth.monthValue + "-" + res.dateOfBirth.year;
    let street = res.address.street;
    let number = res.address.number;
    let dome = res.address.dome;

    document.querySelector('form div:nth-child(1)').innerHTML =
        `
        <label for="forename">Forename: </label>
    <input type="text" id="forename" name="forename" value="${firstName}">

        <label for="email">Email: </label>
    <input type="email" id="email" name="email" value="${email}">

        <label for="address">Street: </label>
    <input type="text" id="address" name="address" value="${street}">

        <label for="dome">Dome: </label>
    <input type="text" id="dome" name="dome" value="${dome}">
        `
    document.querySelector('form div:nth-child(2)').innerHTML =
        `
        <label for="surname">Surname: </label>
        <input type="text" id="surname" name="surname" value="${lastName}">

        <label for="dateOfBirth">Date of Birth: </label>
        <input type="text" required pattern="\\d{2}-\\d{2}-\\d{4}" id="dateOfBirth" value="${dateOfBirth}">


        <label for="number">House Number:</label>
        <input type="number" id="number" name="number" value="${number}" min="1" >

        <label for="changeData"></label>
        <p class="timerMessage"></p>
        <input type="button" id="changeData" value="Change data">
        `
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
        (res) =>  { addSituation(res);
    });
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

