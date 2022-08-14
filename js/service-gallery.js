'use strict'

function createImgs() {
    var imgs = []

    imgs.push(
        createImage('./img/gallery/1.jpg', ['celebs','politicians'],"s"),
        createImage('./img/ununiformedSizes/2.jpg', ['red-heads'],"l"),
        createImage('./img/gallery/2.jpg', ['cute','animals','dogs'],"l"),
        createImage('./img/gallery/3.jpg', ['cute','animals','dogs','babies'],"l"),
        createImage('./img/gallery/4.jpg', ['animal','cute'],"l"),
        createImage('./img/ununiformedSizes/drevil.jpg', ['movie-stars'],"m"),
        createImage('./img/ununiformedSizes/19.jpg', ['cute','babies'],"l"),
        createImage('./img/gallery/5.jpg', ['cute','babies'],"l"),
        createImage('./img/gallery/6.jpg', ['happy'],"s"),
        createImage('./img/gallery/7.jpg', ['babies','cute'],"s"),
        createImage('./img/gallery/8.jpg', ['funny','red-heads'],"m"),
        createImage('./img/gallery/9.jpg', ['babies','cute','funny'],"s"),
        createImage('./img/gallery/10.jpg', ['celebs','politicians'],"s"),
        createImage('./img/gallery/11.jpg', ['funny'],"s"),
        createImage('./img/gallery/12.jpg', ['celebs'],"m"),
        createImage('./img/gallery/13.jpg', ['celebs','movie-stars'],"m"),
        createImage('./img/gallery/14.jpg', ['celebs','movie-stars'],"s"),
        createImage('./img/gallery/15.jpg', ['movie-stars','red-heads'],"m"),
        createImage('./img/gallery/16.jpg', ['funny','movie-stars'],"m"),
        createImage('./img/gallery/17.jpg', ['celebs','politicians'],"xl"),
        createImage('./img/gallery/18.jpg', ['celebs','politicians'],"m"),
        createImage('./img/ununiformedSizes/img2.jpg', ['funny','babies'],"xl"),
        createImage('./img/ununiformedSizes/img4.jpg', ['red-heads','politicians'],"xs"),
        createImage('./img/ununiformedSizes/img5.jpg', ['babies','funny'],"s"),
        createImage('./img/ununiformedSizes/img6.jpg', ['funny','dogs'],"xs"),
        createImage('./img/ununiformedSizes/leo.jpg', ['movie-stars','celebs'],"m"),
        createImage('./img/ununiformedSizes/005.jpg', ['babies','dogs','cute'],"xl"),
        createImage('./img/ununiformedSizes/Oprah-You-Get-A.jpg', ['celebs'],"xl"),
        )

    return imgs
}

function createImage(url, keywords,height) {
    return {
        id: gNextId++,
        height,
        url: url,
        keywords: keywords
    }
}