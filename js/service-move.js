'use strict'

// const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function addListeners() {
    addMouseListeners()
    // addTouchListeners()
    // window.addEventListener('resize', () => {
    //     resizeCanvas() 
    // })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

// function addTouchListeners() {
//     gElCanvas.addEventListener('touchmove', onMove)
//     gElCanvas.addEventListener('touchstart', onDown)
//     gElCanvas.addEventListener('touchend', onUp)
// }

function onDown(ev) {
    // Getting the clicked position
    const pos = getEvPos(ev)
    console.log('pos:', pos)
    // // { x: 15, y : 15 }
    if (!isCircleClicked(pos)) return
    // setCircleDrag(true)
    // gStartPos = pos
    // document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    // const circle = getCircle();
    // if (!circle.isDrag) return
    // const pos = getEvPos(ev)
    // const dx = pos.x - gStartPos.x
    // const dy = pos.y - gStartPos.y
    // moveCircle(dx, dy)
    // gStartPos = pos
    // renderCanvas()
}

function onUp() {
    // setCircleDrag(false)
    // document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
    // if (gTouchEvs.includes(ev.type)) {
    //     ev.preventDefault()
    //     ev = ev.changedTouches[0]
    //     pos = {
    //         x: ev.pageX - ev.target.offsetLeft,
    //         y: ev.pageY - ev.target.offsetTop
    //     }
    // }
    return pos
}

function isCircleClicked(clickedPos) {
    console.log('gmem:', gMeme.txts)
    
    // console.log('gmeme11111:', gMeme.txts[0]['value'])
    //let canvas = displayTextWidth.canvas || (displayTextWidth.canvas = document.createElement("canvas"));
  let canvas = gElCanvas
    let context = canvas.getContext("2d");
  context.font = gMeme.txts[0].size;
  let metrics = context.measureText(gMeme.txts[0].line);
  console.log("cmcmcm:",metrics.width)
    // const metrics = gCtx.measureText('text');
    // const fontHeight =
    // metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
    // const actualHeight =
    // metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    // console.log('fontHeight:', fontHeight)
    // console.log('actualHeight:', actualHeight)
    
    // gMeme.txts[0].x
    // gMeme.txts[0].y
    // const pos = gCircle.pos
    // const { pos } = findLinePos()
    // const rect = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    // return distance <= gCircle.size


}

function findLinePos() {

    var x = gMeme.txts.map(function (txt) {
        return { x: txt.x, y: txt.y, fontsize: txt.size }
    })


}

// rect = {
//     x: 32,
//     y: 32,
//     w: 70,
//     h: 30
// };