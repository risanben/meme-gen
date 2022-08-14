'use strict'

const elModal = document.querySelector(".modal")
const elModalMessage = document.querySelector(".modal-msg")
let modalMsg

function onGoToSaved() {
    if (!elMemeContainer.classList.contains("hidden")) {
        elMemeContainer.classList.add("hidden")
    }
    if (!elGallery.classList.contains("hidden")) {
        elGallery.classList.add("hidden")
        elFilterContainer.classList.add("hidden")
    }
    if (!elAboutContainer.classList.contains("hidden")) {
        elAboutContainer.classList.add("hidden")
        elBody.classList.remove("background-black")
    }
    if(elSavedContainer.classList.contains("hidden")){
        elSavedContainer.classList.remove("hidden")
    }

    if(elNavList.classList.contains("open")){
        toggleNav()
       }

    displaySaved()
}

function toggleNav() {
    const elNavList = document.querySelector('.nav-list')
    if (elNavList.classList.contains("open")) {
        elNavList.classList.remove("open")
    } else { elNavList.classList.add("open") }
}

function onGoToAbout() {
    if (!elMemeContainer.classList.contains("hidden")) {
        elMemeContainer.classList.add("hidden")
    }
    if (!elGallery.classList.contains("hidden")) {
        elGallery.classList.add("hidden")
        elFilterContainer.classList.add("hidden")
    }
    if (elAboutContainer.classList.contains("hidden")) {
        elAboutContainer.classList.remove("hidden")
        elBody.classList.add("background-black")
    }
    if(!elSavedContainer.classList.contains("hidden")){
        elSavedContainer.classList.add("hidden")
    }

    // making sure the menu closes in phone mood
    const elNavList = document.querySelector(".nav-list")
    if (elNavList.classList.contains("open")) {
        toggleNav()
    }
}

function onGoToGallery() {
    elGallery.classList.remove("hidden")
    elFilterContainer.classList.remove("hidden")
    elMemeContainer.classList.add("hidden")
  
    if(!elAboutContainer.classList.contains("hidden")){
      elAboutContainer.classList.add("hidden")
      elBody.classList.remove("background-black")
    }
  
    if(!elSavedContainer.classList.contains("hidden")){
      elSavedContainer.classList.add("hidden")
    }
  
  //   making sure menu closes on phone mood
     if(elNavList.classList.contains("open")){
      toggleNav()
     }
  }

  function showOnlyMeme() {
    elMemeContainer.classList.remove("hidden")
    elGallery.classList.add("hidden")
    elFilterContainer.classList.add("hidden")
}

function openModal(msg){
elModalMessage.innerText = msg
elModal.classList.add("open")
setTimeout(closemodal,2000)
}

function closemodal(){
    elModal.classList.remove("open")
}
