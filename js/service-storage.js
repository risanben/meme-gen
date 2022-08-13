'use strict'

let projectNumber = 1



function saveToStorage(key, val) {
    const str = JSON.stringify(val)
    localStorage.setItem(key, str)
}

function loadFromStorage(key) {
    const str = localStorage.getItem(key)
    const val = JSON.parse(str)
    return val
}

function displaySaved(){
    if(!gSavedMemes.length) return
    let htmls = gSavedMemes.map(meme=> `<a href="${meme.url}"target="_blank"class="saved-memes-link">project - ${projectNumber++}</a>`).join(' ')
    document.querySelector('.saved-memes').innerHTML = htmls
}