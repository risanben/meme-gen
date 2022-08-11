'use strict'

function createImgs() {
    var imgs = []

    imgs.push(
        createImage('./img/gallery/1.jpg', ['happy']),
        createImage('./img/gallery/2.jpg', ['fun']),
        createImage('./img/gallery/3.jpg', ['happy']),
        createImage('./img/gallery/4.jpg', ['happy']),
        createImage('./img/gallery/5.jpg', ['happy']),
        createImage('./img/gallery/6.jpg', ['happy']),
        createImage('./img/gallery/7.jpg', ['sad']),
        createImage('./img/gallery/8.jpg', ['fun']),
        createImage('./img/gallery/9.jpg', ['happy']),
        createImage('./img/gallery/10.jpg', ['happy']),
        createImage('./img/gallery/11.jpg', ['happy']),
        createImage('./img/gallery/12.jpg', ['happy']),
        createImage('./img/gallery/13.jpg', ['sad']),
        createImage('./img/gallery/14.jpg', ['happy']),
        createImage('./img/gallery/15.jpg', ['happy']),
        createImage('./img/gallery/16.jpg', ['happy']),
        createImage('./img/gallery/17.jpg', ['happy']),
        createImage('./img/gallery/18.jpg', ['happy'])
        )

    return imgs
}

function createImage(url, keywords) {
    return {
        id: gNextId++,
        url: url,
        keywords: keywords
    }
}