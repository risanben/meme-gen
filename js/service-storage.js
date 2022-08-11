'use strict'



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
    let savedMemes = loadFromStorage('memesDB')

    var strHtml = `<a href="${savedMemes[0].url}" target="_blank"></a>`
 
    // strHtml = strHtml.join('')
    document.querySelector('.saved-container').innerHTML = strHtml
    
    // var strHtml = savedMemes.map(meme =>`<a href="${meme.url}" target="_blank"></a>` )
 
    // strHtml = strHtml.join('')
    // document.querySelector('.saved-container').innerHTML = strHtml

}