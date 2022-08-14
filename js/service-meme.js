'use strict'
let gMeme
let gSavedMemes = []

function createGmeme(imgId) {

  gMeme = {

      selectedImgId: imgId,
      selectedTxtIdx: 0,
      txts: [createTxt('Your Text', 150, 70), createTxt('Your Text', 150, 300)]

  }
    
}

function createTxt(line, x, y) {
    return {
        line,
        size: 40,
        width: 250,
        height: 50,
        align: 'left',
        color: '#000000',
        fontFamily: 'Impact',
        isOutline: true,
        lineWidth: 2, //  - outline width
        strokeStyle: '#ffffff',
        isShadow: false,
        shadowColor: '#000000',
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowBlur: 0,
        x,
        y,
        isDrag: false
    }
}



function getImgSrc() {
    var imgIdx = gImgs.findIndex(function (img) {
        return gMeme.selectedImgId === img.id
    })
    return gImgs[imgIdx].url
}

function drawCanvas() {

    gCtx.drawImage(gImgObj, 0, 0,)
    gMeme.txts.forEach(function (txt) {
        drawTxt(txt)
    })

}

function drawTxt(txt) {

    gCtx.font = txt.size + 'px' + ' ' + txt.fontFamily
    gCtx.textAlign = txt.align
    gCtx.fillStyle = txt.color
    if (txt.isShadow) addTxtShadow(txt)
    if (txt.isOutline) addTxtOutline(txt)
    gCtx.fillText(txt.line, txt.x, txt.y)
}

function deleteTxt(txtIdx) {
    gMeme.txts.splice(gMeme.selectedTxtIdx, 1)
    gMeme.selectedTxtIdx = gMeme.txts.length - 1
    drawCanvas()
    renderTxtsEditor()
}

function editTxt(elinput, txtIdx) {
    var property = elinput.dataset.property
    var value

    switch (elinput.type) {
        case 'select-one':
            value = elinput.options[elinput.selectedIndex].value
            break;
        case 'checkbox':
            value = elinput.checked
            break;
        default:
            value = elinput.value;
            break;
    }
    gMeme.txts[gMeme.selectedTxtIdx][property] = value
    drawCanvas()
}

function onNewLine() {
    gMeme.txts.push(createTxt('New Line', gElCanvas.width / 3, 150))
    gMeme.selectedTxtIdx = gMeme.txts.length - 1
    drawCanvas()
    renderTxtsEditor()
}

function onAddEmoji(emoji) {
    if (emoji === "add-emoji") return
    gMeme.txts.push(createTxt(emoji, 150, 150))
    drawCanvas()
    renderTxtsEditor()
}

function addTxtOutline(txt) {
    gCtx.strokeStyle = txt.strokeStyle
    gCtx.lineWidth = txt.lineWidth
    gCtx.strokeText(txt.line, txt.x, txt.y)
}

function switchLineUp() {
    gMeme.selectedTxtIdx--
    if (gMeme.selectedTxtIdx <= -1) {
        gMeme.selectedTxtIdx = gMeme.txts.length - 1
    }
    // console.log('gMeme.selectedTxtIdx:', gMeme.selectedTxtIdx)
}
function switchLineDown() {
    gMeme.selectedTxtIdx++
    if (gMeme.selectedTxtIdx >= gMeme.txts.length) {
        gMeme.selectedTxtIdx = 0
    }
    // console.log('gMeme.selectedTxtIdx:', gMeme.selectedTxtIdx)
}
function changeTxtVertically(direction){
    gMeme.txts[gMeme.selectedTxtIdx].y += direction === "up" ? -2 : +2
}

function changeTxtHorizontally(direction){
    gMeme.txts[gMeme.selectedTxtIdx].x += direction === "left" ? -2 : +2
}

function fitTxtToCanvas(height, width){
    gMeme.txts.forEach((txt,i) =>{
         txt.x = width / 3 
        if (i === 1){
            txt.y = height - 70
        }
})
}

function saveMeme(url){
    let meme = {
        url: url
    }
    gSavedMemes.push(meme)
    saveToStorage('memeDB',gSavedMemes)
}