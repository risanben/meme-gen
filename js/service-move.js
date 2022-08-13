'use strict'

let gDraggedTxtPos 

// const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function addListeners() {
    addMouseListeners()
    // addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    // gElCanvas.addEventListener('touchmove', onMove)
    // gElCanvas.addEventListener('touchstart', onDown)
    // gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    // Getting the clicked position
    ev.preventDefault()
    const pos = getEvPos(ev)
    
    // // { x: 15, y : 15 }
    if (!isLineClicked(pos)) return
    setTxtDrag(true)
    gDraggedTxtPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    ev.preventDefault()
    const line = getCurrLine();
    if(!line)return
    if (!line.isDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - gDraggedTxtPos.x
    const dy = pos.y - gDraggedTxtPos.y
    moveLine(dx, dy)
    gDraggedTxtPos = pos
    drawCanvas()
    
}

function onUp() {
    setTxtDrag(false)
    document.body.style.cursor = 'default'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    return pos
}

function isLineClicked(clickedPos) {
    for (let i = 0; i < gMeme.txts.length; i++) {
        const txt = gMeme.txts[i];
        const width = txt.width / 1.7
        const height = txt.height / 2
        if (clickedPos.x >= txt.x - width && clickedPos.x <= txt.x + width && clickedPos.y >= txt.y - height && clickedPos.y <= txt.y + height) {
            gMeme.selectedTxtIdx = i
            console.log('true:')
            return true
        }
    }
    console.log('false:')
    return false
}

function setTxtDrag(isDrag) {
    gMeme.txts[gMeme.selectedTxtIdx].isDrag = isDrag
}

function getCurrLine() {
    return gMeme.txts[gMeme.selectedTxtIdx]
}

function moveLine(distanceX, distanceY) {
    if (gMeme.txts[gMeme.selectedTxtIdx].x < 0 && distanceX < 0) return
    if (gMeme.txts[gMeme.selectedTxtIdx].y < 0 && distanceY < 0) return
    if (gMeme.txts[gMeme.selectedTxtIdx].x > gElCanvas.width && distanceX > 0) return
    if (gMeme.txts[gMeme.selectedTxtIdx].y > gElCanvas.height && distanceY > 0) return
    gMeme.txts[gMeme.selectedTxtIdx].x += distanceX
    gMeme.txts[gMeme.selectedTxtIdx].y += distanceY
}