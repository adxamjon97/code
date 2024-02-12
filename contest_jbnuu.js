// ==UserScript==
// @name        contest jbnuu.uz
// @namespace   Violentmonkey Scripts
// @match       http://contest.jbnuu.uz/tasks
// @grant       none
// @version     1.0
// @author      Adxamjon Nizametdinov
// @description 05.01.2024, 18:06:34
// ==/UserScript==

function sort(){
  let n=3;
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.querySelector(".best-table > tbody");
  switching = true;

  dir = "asc";

  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 2; i++) {
      shouldSwitch = false;

      x = rows[i  ].getElementsByTagName("td")[n];
      y = rows[i+1].getElementsByTagName("td")[n];
      if (dir == "asc" && parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
        shouldSwitch = true;
        break;
      }

      if (dir == "desc" && parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
        shouldSwitch = true;
        break;
      }
    }

    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } else if (switchcount == 0 && dir == "asc") {
      dir = "desc";
      switching = true;
    }
  }
}


function tartiblash(){
  const trs = document.querySelectorAll(".best-table > tbody > tr");
  const div = document.querySelector(".card-heads2")

  const btn=document.createElement("button")
  btn.innerText = "sort"
  btn.addEventListener("click", ()=>{
    sort()
  })
  div.append(btn)
}

function yechilmagan(){
  let trigger=true;
  const trs = document.querySelectorAll(".best-table > tbody > tr");
  const div = document.querySelector(".card-heads2")

  const btn=document.createElement("button")
  btn.innerText = "Yechilmagan"
  btn.addEventListener("click", ()=>{
    for(let tr of trs){
      if(tr.children[1].innerHTML.trim()!==''){
        if(trigger){
          tr.style.cssText="display: none;"
        }else{
          tr.style.cssText=""
        }
      }
    }
    trigger=!trigger
  })
  div.append(btn)
}

function jamini_husoblash(){
  const trs = document.querySelectorAll(".best-table > tbody > tr");

  // so'mmani husoblashga
  let summa = 0
  let bajargan_ball=0
  let bajarmagan_ball=0
  let bajargan=0
  let bajarmagan=0

  for (let tr of trs){
    const ball = parseInt(tr.children[3].innerText)

    summa += ball;

    // bo'sh bo'lsa
    if(tr.children[1].innerHTML.trim()===''){
      bajarmagan++
      bajarmagan_ball+=ball
    }else{ // bajarilgan bo'lsa
      bajargan++
      bajargan_ball+=ball
    }
  }

  // jadval uchun satir yaratish
  const tr = document.createElement("tr")
  tr.innerHTML = `
    <td>S</td>
    <td style="margin:0px !important; padding:0px !important;"></td>
    <td style="text-align:left !important;">
       Jami ballar yig'indisi: -${bajarmagan} +${bajargan}
    </td>
    <td>-${bajarmagan_ball}/+${bajargan_ball}/${summa}</td>
    <td></td>
  `

  const tbody = document.querySelector(".best-table > tbody")
  tbody.append(tr)
}


window.onload = ()=>{
  console.log("ishladi")

  jamini_husoblash()
  yechilmagan()
  tartiblash()
}
