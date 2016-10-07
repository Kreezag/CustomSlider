const SLIDER = document.querySelectorAll('[data-slider]')[0];
const SLIDE = document.querySelectorAll('.b-slider__slide');
const COUNT = SLIDE.length;

const ARROW_LEFT = document.querySelectorAll('[data-arrow-left]')[0];
const ARROW_RIGHT = document.querySelectorAll('[data-arrow-right]')[0];

const CROPS = document.querySelectorAll('[data-crop-list]')[0];
const CROP_CLASS = 'b-slider__crop-item';

const ATTR_ACTIVE = 'data-active';



function InitCrops (i) {
    const _elem = document.createElement('li');

    _elem.className = CROP_CLASS;
    _elem.setAttribute('data-crop', i );
    CROPS.appendChild(_elem);

    if (i === 0) {
        _elem.setAttribute(ATTR_ACTIVE, '');
    }
}

function InitSlides (i) {
    SLIDE[i].setAttribute('data-slide', i );
}

function Counter (e) {
    for (var _i = 0; _i < COUNT; _i++) {
        e(_i);
    }
}

function SET_DATA_ATTR () {
    Counter(InitCrops);
    Counter(InitSlides);
}

SET_DATA_ATTR();


function GetElActive (e) {
    return e.querySelectorAll('[data-active]')[0];
}






function SetActive(e, position, boolean, activeClass = ATTR_ACTIVE) {
    var nextElem = e[(+position + (boolean ? 1 : -1) )];

    if (boolean && position == (COUNT - 1)) {
        nextElem = e[0];
    }

    if (!boolean && position == 0) {
        nextElem = e[(COUNT - 1)];
    }

    nextElem.setAttribute(activeClass, '');
}


function SetActiveWithCrop(e, position, activeClass = ATTR_ACTIVE) {
    var nextElem = e[(+position)];

    nextElem.setAttribute(activeClass, '');
}



function ChangeEl (boolean) {

    const activeSlide = GetElActive(SLIDER);
    const activeCrop = GetElActive(CROPS);
    const _crop = CROPS.querySelectorAll('[data-crop]');
    const position = activeSlide.getAttribute('data-slide');

    SetActive(SLIDE, position, boolean);
    SetActive(_crop, position, boolean);

    activeSlide.removeAttribute(ATTR_ACTIVE);
    activeCrop.removeAttribute(ATTR_ACTIVE);
}






CROPS.onclick = function(e) {

    if (e.target.getAttribute('data-crop')) { //HUCK

        const _dataAttr = e.target.getAttribute('data-crop');

        const _crop = CROPS.querySelectorAll('[data-crop]');
        const activeSlide = GetElActive(SLIDER);
        const activeCrop = GetElActive(CROPS);

        if (_dataAttr != activeCrop.getAttribute('data-crop')) {
            SetActiveWithCrop(SLIDE, _dataAttr);
            SetActiveWithCrop(_crop, _dataAttr);

            activeSlide.removeAttribute(ATTR_ACTIVE);
            activeCrop.removeAttribute(ATTR_ACTIVE);
        }
    }
};




ARROW_LEFT.onclick = () => ChangeEl(false);
ARROW_RIGHT.onclick = () => ChangeEl(true);

setInterval(ARROW_RIGHT.onclick, 4000);