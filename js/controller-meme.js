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

function initMemeEditor(imgId) {
    showOnlyMeme()
    gMeme = createGmeme(imgId)
    initCanvas()
    renderTxtsEditor()
    addListeners()
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
                    <select data-property="align" oninput="editTxt(this,${idx})">
                    <option value="left">left</option>
                    <option value="center">center</option>
                    <option value="right">right</option>
                     </select>
                    </p>

                    <p>
                    <input id="outline" type="checkbox" data-property="isOutline" checked onclick="editTxt(this,${idx})">
                    <label for="outline"data-trans="outline">Outline</label>
                    <span data-trans="width">Width:</span> <input type="number" value="${txt.lineWidth}"  min="0" step="1" data-property="lineWidth" oninput="editTxt(this ,${idx})">
                    <input type="color" value="${txt.strokeStyle}" data-property="strokeStyle" oninput="editTxt(this,${idx})">
                    </p>
                    
                    <select oninput="onAddEmoji(this.value)" >
                    <option value="add-emoji">Add Emoji</option>
                    <option value="😎">😎</option>
                    <option value="😍">😍</option>
                    <option value="😪">😪</option>
                    <option value="🤐">🤐</option>
                    <option value="🤣">🤣</option>
                     </select>

                    <button onclick="deleteTxt(${idx})" class=" btn fa bin"></button>
        </div>
        `
    })
        .join(' ')
    strHtml += `<button onclick="onNewLine()" class="btn meme-features-btn" data-trans="addline">
        <img src="img/icons/add.png" class="addLineIcon"> Add Line
    </button>
    <div class="bottom-buttons">
    <a href="#" onclick="downloadCanvas(this)" class="download-btn fa download" data-trans="download"download="cool-canvas"> Download</a>
    <a href="#"class="download-btn fa share " onclick="uploadImg()"data-trans="share"> Share</a>
    <p class="user-msg "></p>
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
}

function uploadImg() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.user-msg').innerHTML = 
        `<a href="${uploadedImgUrl}"target="_blank" class="show-friend-btn fa friends"data-trans="show-friend"> show a friend</a>
        <button value="${uploadedImgUrl}"onclick="onSave(this.value)" class="btn saving-btn fa save"> save </button>
        `

        // gCurrMemeUrl = uploadedImgUrl
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

function onSave(url) {
    let meme = {
        url: url
    }
    gSavedMemes.push(meme)
}
