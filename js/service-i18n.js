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
    'all': {
        en: 'All',
        he: "הכל"
    },
    'funny': {
        en: 'Funny',
        he: "מצחיק"
    },
    'cute': {
        en: 'Cute',
        he: "חמוד"
    },
    'celebs': {
        en: 'Celebs',
        he: "סלבס"
    },
    'babies': {
        en: 'Babies',
        he: "תינוקות"
    },
    'politicians': {
        en: 'Politicians',
        he: "פוליטיקאים"
    },
    'red-heads': {
        en: 'Red-heads',
        he: "ג'ינג'ים"
    },
    'dogs': {
        en: 'Dogs',
        he: "כלבים"
    },
    'movie-stars': {
        en: 'Movie-stars',
        he: "כוכבי-סרטים"
    }
}