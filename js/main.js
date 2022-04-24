window.onload = () => {
  'use strict';
  }
navigator.serviceWorker
    .register('./sw.js')
    .then(res => console.log("service worker registered"))

var currentPageId = "page-home";
var currentSelectorId = "home";

function getButtons() {
    return ["home", "cashFlows", "create", "account"];
}

window.onload = function(){
    var pageIdList = getButtons();
    pageIdList.forEach(function(page){
        document.getElementById(page).addEventListener("click", changePage, false);
    });
}

function changePage(){
    var currentSelector = document.getElementById(currentSelectorId);
    var currentPage = document.getElementById(currentPageId);
    var pageId = "page-"+this.id;
    var page = document.getElementById(pageId);
    var pageSelector = document.getElementById(this.id);

    if(page.classList.contains("active")){
        return;
    }

    currentSelector.classList.remove("button-active");
    currentSelector.classList.add("button-inactive");
    currentPage.classList.remove("active");
    currentPage.classList.add("inactive");

    pageSelector.classList.remove("button-inactive");
    pageSelector.classList.add("button-active");

    page.classList.remove("inactive");
    page.classList.add("active");

    // Reset the scroll
    window.scrollTo(0,0); 

    currentSelectorId = this.id;
    currentPageId = pageId;
}