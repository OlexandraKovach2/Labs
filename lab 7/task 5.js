function OpenSearch() {
  menu.style.width = "300px";
  btns.style.filter = "brightness(0.8)";
  document.getElementById("text").textContent = "Whoa! You found me";
  document.body.style.backgroundColor = "rgb(36, 30, 71)";
  menu.addEventListener("transitionend", AllowClick);
}

function OpenRun() {
  menu.style.width = "300px";
  btns.style.filter = "brightness(0.8)";
  document.getElementById("text").textContent = "Please, don't run!";
  document.body.style.backgroundColor = "rgb(36, 30, 71)";
  menu.addEventListener("transitionend", AllowClick);
}

function Close() {
  menu.style.width = "0px";
  btns.style.filter = "brightness(1)";
  document.body.style.backgroundColor = "darkslateblue";
  menu.removeEventListener("transitionend", AllowClick);
}

var menu = document.getElementById("pop-menu");
var btns = document.getElementById("btn-box");

let allow = false;

function AllowClick() {
  allow = true;
}

window.addEventListener("mousedown", ClickOutside);

function ClickOutside(event) {
  if (event.target !== menu && allow) {
    Close();
  }
}
