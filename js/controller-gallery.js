'use strict'

let gImgs
let gNextId = 1
let gCtx
let gImgObj
let gCurrMemeUrl
var gFilterBy = []

function init() {
    gImgs = createImgs()
    renderImgs(gImgs)
}

function renderImgs(imgs) {

    if (!gFilterBy.length || gFilterBy.includes('all')) {
        var strHtml = imgs.map(function (img, idx) {
            return `
        <img id='${img.id}' src='${img.url}'class="${img.height} meme-img" onclick="initMemeEditor(${img.id},this)" alt='meme picture'/>
        `
        })
            .join(' ')
    } else {
        let filteredgImgs = gImgs.filter(img => gFilterBy.some(x => img.keywords.includes(x)))
        var strHtml = filteredgImgs.map(function (img, idx) {
            return `<img id='${img.id}' src='${img.url}'class="${img.height} meme-img" onclick="initMemeEditor(${img.id},this)" alt='meme picture'/>`
        }).join(' ')
    }
    document.querySelector('.gallery').innerHTML = strHtml
}

function onSetFilterBy(filterBy, btnClass) {
    console.log('filterBy:', filterBy)
    // console.log('btnClass:', btnClass)
    const currBtn = document.querySelector(btnClass)
    const allBtns = document.querySelectorAll('.filter-btn')
    const elAllBtn = document.querySelector('.filter1')

    // allBtns.forEach(btn => btn.style.fontSize = "14px")
    if (filterBy !== "all") {

        if (currBtn.style.fontSize === "20px") {
            currBtn.style.fontSize = "14px"
            const theFilter = (element) => element === filterBy
            gFilterBy.splice(gFilterBy.findIndex(theFilter), 1)
        } else {
            elAllBtn.style.fontSize = "14px"
            currBtn.style.fontSize = "20px"
            if (!gFilterBy.includes(filterBy)) {
                gFilterBy.push(filterBy)
            }
        }
    } else {
        if (currBtn.style.fontSize === "20px") {
            gFilterBy = []
            allBtns.forEach(btn => btn.style.fontSize = "14px")
        } else {
            allBtns.forEach(btn => btn.style.fontSize = "14px")
            currBtn.style.fontSize = "20px"
            gFilterBy = []
            
        }
    }
    renderImgs(gImgs)
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl')
    else { document.body.classList.remove('rtl') }
    doTrans();

    //   making sure menu closes on phone mood
    if(elNavList.classList.contains("open")){
        toggleNav()
       }

       openModal("language was changed")
}








