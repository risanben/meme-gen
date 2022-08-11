'use strict'

let gImgs
let gNextId = 1
let gMeme
let gCtx
let gImgObj
let gElCanvas
let gCurrMemeUrl
let gSavedMemes = []

function init() {
    gImgs = createImgs()
    // doTrans()
    renderImgs(gImgs)
}

function renderImgs(imgs) {
    var strHtml = imgs.map(function (img, idx) {
        return `
        <img id='${img.id}' src='${img.url}' onclick="initMemeEditor(${img.id},this)" alt='meme picture'/>
        `
    })
        .join(' ')

    document.querySelector('.gallery').innerHTML = strHtml
}



//////////////// meme-controller////////////////////////////////

function initMemeEditor(imgId) {
    toggleView()
    gMeme = createGmeme(imgId)
    initCanvas()
    renderTxtsEditor()
}

function toggleView() {
    const elMemeContainer = document.querySelector('.meme-container')
    const elGallery = document.querySelector('.gallery')
    elMemeContainer.classList.toggle('hidden')
    elGallery.classList.toggle('hidden')
}

function backToGallery() {
    const elMemeContainer = document.querySelector('.meme-container')
    const elGallery = document.querySelector('.gallery')
    if (elGallery.classList.contains('hidden')) {
        elMemeContainer.classList.toggle('hidden')
        elGallery.classList.toggle('hidden')
    }
}

function renderTxtsEditor() {
    var strHtml = gMeme.txts.map(function (txt, idx) {

        return `
        <div class="txt-editor">
                   
                    <p>
                    <input type="text" data-property="line" data-trans="your-text"placeholder="${txt.line}" oninput="editTxt(this,${idx})">
                    <img src="img/icons/font-size-increase.png" class="icon"><input type="range" value="${txt.size}"  min="10" step="2" data-property="size" oninput="editTxt(this ,${idx})">
                    <input type="color" value="${txt.color}" data-property="color" oninput="editTxt(this,${idx})">
                    <span data-trans="family">Family:</span> 
                    <select data-property="fontFamily" oninput="editTxt(this,${idx})">
                    <option value="${txt.fontFamily}">${txt.fontFamily}</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Geneva">Geneva</option>
                    <option value="Verdana">Verdana</option>
                    </select>
                    </p>

                    <p>
                    <i class="guides"data-trans="horizontal">Horizontal Axis </i> <input type="number" value="${txt.x}"  min="0" step="5" data-property="x" oninput="editTxt(this ,${idx})">
                    <i class="guides"data-trans="vertical">Vertical Axis </i> <input type="number" value="${txt.y}"  min="0" step="5" data-property="y" oninput="editTxt(this ,${idx})">
                    </p>

                    <p>
                    <input id="outline" type="checkbox" data-property="isOutline" checked onclick="editTxt(this,${idx})">
                    <label for="outline"data-trans="outline">Outline</label>
                    <span data-trans="width">Width:</span> <input type="number" value="${txt.lineWidth}"  min="0" step="1" data-property="lineWidth" oninput="editTxt(this ,${idx})">
                    <input type="color" value="${txt.strokeStyle}" data-property="strokeStyle" oninput="editTxt(this,${idx})">
                    </p>
                    <button onclick="deleteTxt(${idx})" class="fa bin"></button>
        </div>
        `
    })
        .join(' ')
    strHtml += `<button onclick="onNewLine()" class="btn meme-features-btn" data-trans="addline">
        <img src="img/icons/add.png" class="addLineIcon"> Add Line
    </button>
    <div>
    <button  href="#" onclick="downloadCanvas(this)" class="download-btn fa download" download="cool-canvas" data-trans="download"> Download</button>
    <button class="download-btn fa share " onclick="uploadImg()"data-trans="share"> Share</button>
    <p class="user-msg flex flex-row"></p>
    <div class="share-container"></div>
    </div>
    `

    document.querySelector('.txts-list').innerHTML = strHtml

    doTrans()
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-meme';
}

function uploadImg() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.user-msg').innerHTML = `<a href="${uploadedImgUrl}"target="_blank" class="show-friend-btn fa friends"data-trans="show-friend"> show a friend</a>
        <a href="#" onclick="onSaveMemeToStorage()">save</a>`

        gCurrMemeUrl = uploadedImgUrl
        document.querySelector('.share-container').innerHTML = `
        <a class="btn facebook-btn ga facebook" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           <span data-trans="share-fb"> Share to Facebook  </span> 
        </a>
        `
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


function onSetLang(lang) {
    setLang(lang);

    if (lang === 'he') document.body.classList.add('rtl')
    else { document.body.classList.remove('rtl') }
    doTrans();

}

/////////////////////////saved controller//////////////////////

function onSaved() {
    document.querySelector('.saved-container').classList.remove('hidden')
    document.querySelector('.gallery').classList.add('hidden')
    document.querySelector('.meme-container').classList.add('hidden')
    displaySaved()
}

function onSaveMemeToStorage() {
    let meme = {
        url: gCurrMemeUrl
    }

    gSavedMemes.push(meme)
    saveToStorage('memesDB', gSavedMemes)
    gCurrMemeUrl = null
}