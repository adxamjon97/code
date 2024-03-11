// ==UserScript==
// @name        profil tasks robocontest.uz
// @namespace   Violentmonkey Scripts
// @match       https://robocontest.uz/profile/*
// @grant       none
// @version     1.0
// @author      Adxamjon Nizametdinov
// @description 03.03.2024, 19:12:53
// ==/UserScript==


function main(){
  const div = document.querySelector('[class*="mt-1"]').parentElement.parentElement

  const title = div.children[0];

  // checkbox for hide solved
  const c = document.createElement('input');
  title.appendChild(c);

  c.type = 'checkbox';
  c.addEventListener('change', function(){
    const body = div.children[1].children;

    for(let i=0; i<body.length; i++){
      const domLst=body[i].classList;
      const lst = [].slice.call(domLst);

      if(lst.includes("bg-success")){
        if(c.checked){
          body[i].style.display = "none";
        }else{
          body[i].style.display = "";
        }
      }
    }
  })

  // button for sorting
  const b = document.createElement('button')
  title.appendChild(b);
  b.innerText = "sort"
  b.addEventListener('click', function(){
    const body = div.children[1].children;
    const lst = Array.from(body)

    // function for detection procentage
    function getInt(a){
      const name = a.getAttribute("data-original-title")
      const match = name.match(/(\d+)%/)[1];
      const proc = parseInt(match);

      return proc
    }

    // sort
    lst.sort(function(a, b) {
        return getInt(a) - getInt(b);
    });

    // Clear the container
    div.children[1].innerHTML = '';

    // Append sorted div elements to the container
    lst.forEach(function(e) {
        div.children[1].appendChild(e);
        div.children[1].appendChild(document.createTextNode(' '))
    });

  })
}

window.onload = () => main();
