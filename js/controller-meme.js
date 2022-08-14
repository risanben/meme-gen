'use strict'

//////////////// meme-controller////////////////////////////////

const elMemeContainer = document.querySelector('.meme-container')
const elGallery = document.querySelector('.gallery-container')
const elAboutContainer = document.querySelector('.about-container')
const elBody = document.querySelector('body')
const elMain = document.querySelector('main')
const elFilterContainer = document.querySelector('.filter-container')
const elSavedContainer = document.querySelector('.saved-container')
const elNavList = document.querySelector(".nav-list")
let gElCanvas


function initMemeEditor(imgId) {
    showOnlyMeme()
    createGmeme(imgId)
    // gMeme = createGmeme(imgId)
    initCanvas()
    drawCanvas()
    renderTxtsEditor()
    addListeners()
}

function initCanvas() {
    gElCanvas = document.querySelector('.memeCanvas')
    gCtx = gElCanvas.getContext('2d')

    gImgObj = new Image()
    gImgObj.src = getImgSrc()
    gImgObj.onload = function () {
        gElCanvas.width = gImgObj.width
        gElCanvas.height = gImgObj.height
        fitTxtToCanvas(gElCanvas.height, gElCanvas.width)
        drawCanvas()
    }
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas')
}

function renderTxtsEditor() {
    var strHtml =
        `
        <div class="txt-editor">
                   
                  
                    
                    <input type="text" data-property="line" data-trans="your-text"placeholder="${gMeme.txts[gMeme.selectedTxtIdx].line}" oninput="editTxt(this,${gMeme.selectedTxtIdx})"> 
                    <img src="img/icons/up-down.png" class="icon" title="Switch line"onClick="onSwitchLine()">
                    <img src="img/icons/font-size-increase.png" class="icon" title="Increase font size"onClick="onChangeTxtSize('up')">
                    <img src="img/icons/decrease-font-icon.png" class="icon" title="Decrease font size"onClick="onChangeTxtSize('down')">
                    <button onClick="onChangeTxtLocation('x','left')" title="Move text left">&#8592</button>
                    <button onClick="onChangeTxtLocation('y','down')" title="Move text down">&#8595</button>
                    <button onClick="onChangeTxtLocation('y','up')" title="Move text up">&#8593</button>
                    <button onClick="onChangeTxtLocation('x','right')" title="Move text right">&#8594</button>
                    <input type="color" value="${gMeme.txts[gMeme.selectedTxtIdx].color}" data-property="color" oninput="editTxt(this,${gMeme.selectedTxtIdx})">
                    <br>        
                    <span data-trans="family">Family:</span> 
                    <select data-property="fontFamily" oninput="editTxt(this,${gMeme.selectedTxtIdx})">
                    <option value="${gMeme.txts[gMeme.selectedTxtIdx].fontFamily}">${gMeme.txts[gMeme.selectedTxtIdx].fontFamily}</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Geneva">Geneva</option>
                    <option value="Verdana">Verdana</option>
                    </select>
                    <select data-property="align" oninput="editTxt(this,${gMeme.selectedTxtIdx})">
                    <option value="left">left</option>
                    <option value="center">center</option>
                    <option value="right">right</option>
                     </select>
                     <br>
                    <input id="outline" type="checkbox" data-property="isOutline" checked onclick="editTxt(this,${gMeme.selectedTxtIdx})">
                    <label for="outline"data-trans="outline">Outline</label>
                    <span data-trans="width">Width:</span> <input type="number" value="${gMeme.txts[gMeme.selectedTxtIdx].lineWidth}"  min="0" step="1" data-property="lineWidth" oninput="editTxt(this ,${gMeme.selectedTxtIdx})">
                    <input type="color" value="${gMeme.txts[gMeme.selectedTxtIdx].strokeStyle}" data-property="strokeStyle" oninput="editTxt(this,${gMeme.selectedTxtIdx})">
                   
                    
                    <select oninput="onAddEmoji(this.value)" >
                    <option value="add-emoji">Add Emoji</option>
                    <option value="😎">😎</option>
                    <option value="😍">😍</option>
                    <option value="😪">😪</option>
                    <option value="🤐">🤐</option>
                    <option value="🤣">🤣</option>
                     </select>

                    <button onclick="deleteTxt(${gMeme.selectedTxtIdx})" class=" btn fa bin"></button>
        </div>
        `
    strHtml += `<button onclick="onNewLine()" class="btn meme-features-btn" data-trans="addline">
        <img src="img/icons/add.png" class="addLineIcon"> Add Line
    </button>
    <div class="bottom-buttons">
    <a href="#" onclick="downloadCanvas(this)" class="download-btn fa download" data-trans="download"download="cool-canvas"> Download</a>
    <a href="#"class="download-btn fa share " onclick="uploadImg()"data-trans="share"> Share</a>
    <p class="user-msg flex"></p>
    <div class="share-container"></div>
    </div>
    `
    document.querySelector('.txts-list').innerHTML = strHtml
    doTrans()
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data;
    elLink.download = 'my-meme';
    openModal("Meme downloaded")
}

function uploadImg() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.user-msg').innerHTML =
            `<a href="${uploadedImgUrl}"target="_blank" class="show-friend-btn fa friends"data-trans="show-friend"> show a friend</a>

            <button value="${uploadedImgUrl}"onclick="onSave(this.value)" class="btn saving-btn fa save"> save </button>
    
        <a class="btn facebook-btn ga facebook" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           <span data-trans="share-fb"> Share to Facebook </span> 
        </a>`
    }
    doUploadImg(imgDataUrl, onSuccess);
    doTrans()
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}

function onSave(url) {
    saveMeme(url)
    openModal("Meme saved successfully")

}

function onSwitchLine() {
    switchLineDown()
    openModal("Selected line switched")
}

function onChangeTxtSize(direction) {
    //move to service
    if (direction === "up") {
        console.log('gMeme.txts:', gMeme.txts)
        gMeme.txts[gMeme.selectedTxtIdx].size += 2
    }
    if (direction === "down") {
        gMeme.txts[gMeme.selectedTxtIdx].size -= 2
    }
    drawCanvas()
}

function onChangeTxtLocation(axis, direction) {
    if (axis === "y") {
        changeTxtVertically(direction)
    }
    if (axis === "x") {
        changeTxtHorizontally(direction)
    }
    drawCanvas()
}

