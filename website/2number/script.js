// alert("Be happy\nHappy Happy")
console.log("Hello, my name is Sambriddhi Shrestha.")
console.log("Please be kind in this site.")
//console.log(prompt("Please enter your name: "))

const hamburger = document.querySelector(".hamburger");
const navmenu = document.querySelector(".navmenu");

hamburger.addEventListener("click",() => {
    hamburger.classList.toggle("active");
    navmenu.classList.toggle("active");
})

document.querySelectorAll(".link").forEach(n => n.addEventListener("click",() =>{
    hamburger.classList.remove("active");
    navmenu.classList.remove("active");

}))

