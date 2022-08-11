'use strict'

var gCurrLang = 'en';

function doTrans() {
    
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const translateVal = getTrans(transKey)
        if (typeof el.placeholder === 'string') el.placeholder = translateVal
        else el.innerText = translateVal
    })
    console.log('translation made!')
}

function getTrans(transKey) {
    // if key is unknown return 'UNKNOWN'
    const key = gTrans[transKey]
    if (!key) return 'UNKNOWN'
    // get from gTrans
    // If translation not found - use english
    let translateStr = (key[gCurrLang]) ? key[gCurrLang] : key['en']
    return translateStr;
}

function setLang(lang){
    gCurrLang = lang
}

var gTrans = {
    'gallery': {
        en: 'Gallery',
        he: 'גלריה'
    },
    'saved': {
        en: 'Saved Memes',
        he: 'שמורים',
    },
    'about': {
        en: 'About',
        he: 'אודות',
    },
    'your-text': {
        en: 'Your-Text',
        he: 'הקלד טקסט',
    },
    'family': {
        en: 'Font-Family:',
        he: 'גופן'
    },
    'horizontal': {
        en: 'Left/Right',
        he: 'ימינה/שמאלה',
    },
    'vertical': {
        en: 'Up/Down',
        he: 'מעלה/מטה',
    },
    'outline': {
        en: 'Outline',
        he:'קו מתאר',
    },
    'width': {
        en: 'Width',
        he: 'עובי',
    },
    'addline': {
        en: 'Add Line',
        he: 'הוסף שורה',
    },
    'download': {
        en: 'Download',
        he: 'הורד'
    },
    'share': {
        en: 'Share',
        he: 'שתף'
    },
    'show-friend': {
        en: 'Show A Friend',
        he: 'שתף חבר'
    },
    'share-fb': {
        en: 'Share To Facebook',
        he: 'שתף בפייסבוק'
    },
    'book-name-filter': {
        en: 'Book Name',
        he: 'שם הספר'
    },
    'modal-book-rate': {
        en: 'Book Rate',
        he: 'ביקורת הספר'
    },
    'read': {
        en: 'read',
        he: 'קרא'
    },
    'update': {
        en: 'update',
        he: 'עדכן'
    },
    'delete': {
        en: 'delete',
        he: 'מחק'
    },
    'no-match': {
        en: 'Unfortunately no book is matching your search',
        he: 'לא נמצא ספר זה'
    }
}