'use strict'

function createGmeme(imgId) {

    return {
        selectedImgId: imgId,
        selectedTxtIdx: null,
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

function initCanvas() {
    gElCanvas = document.querySelector('.memeCanvas')

    // fixing lines location 
    // let gElCanvasSize = {width:gElCanvas.width,height:gElCanvas.height}
    // for (let i = 0; i < gMeme.txts.length; i++){
    //     gMeme.txts[i].x = gElCanvasSize.width / 2
    // }
    
    gCtx = gElCanvas.getContext('2d')
    
    gImgObj = new Image()
    gImgObj.src = getImgSrc()
    
    // addListeners()

    gImgObj.onload = function () {
        gElCanvas.width = gImgObj.width
        gElCanvas.height = gImgObj.height
        gMeme.txts[1].y = gImgObj.height - 70

        drawCanvas()
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
    gMeme.txts.splice(txtIdx, 1)
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
            console.log('elinput.value:', elinput.value)
            break;
    }
    console.log('gMeme.txts:', gMeme)
    gMeme.txts[txtIdx][property] = value
    console.log('gMeme.txts:', gMeme)

    drawCanvas()
}

function onNewLine() {
    gMeme.txts.push(createTxt('New Line', 150, 150))
    drawCanvas()
    renderTxtsEditor()
}

function onAddEmoji(emoji){
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

