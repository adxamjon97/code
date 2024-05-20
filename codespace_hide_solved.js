// ==UserScript==
// @name        New script cyberspace.uz
// @namespace   Violentmonkey Scripts
// @match       https://cyberspace.uz/challenges/
// @grant       none
// @version     1.0
// @author      Adxamjon Nizametdinov
// @description 20.05.2024, 19:32:13
// ==/UserScript==


function view(){
  const h2 = document.querySelector(".lead")

  const btn = document.createElement("button")
  btn.innerText="hide solved"
  btn.onclick = () => {
    myfunk()
  }

  h2.appendChild(document.createElement("br"))
  h2.appendChild(btn)
}

function myfunk(){
  console.log("started")

  const lst = document.querySelectorAll(".col-md-3.d-inline-block")

  for(const itm of lst){
    const svg = itm.querySelector("svg")
    const atr = svg.getAttribute("data-icon")

    if(atr=="check"){
      itm.classList.remove("d-inline-block")
      itm.style.display="none"

      console.log(itm)
    }


  }
}

window.onload = () => {
  // myfunk()
  view()
}
