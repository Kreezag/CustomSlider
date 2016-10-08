const SLIDER = document.querySelectorAll('[data-slider]')[0];
const SLIDE = document.querySelectorAll('.b-slider__slide');
const COUNT = SLIDE.length;

const ARROW_LEFT = document.querySelectorAll('[data-arrow-left]')[0];
const ARROW_RIGHT = document.querySelectorAll('[data-arrow-right]')[0];

const CROPS = document.querySelectorAll('[data-crop-list]')[0];
const CROP_CLASS = 'b-slider__crop-item';

const ATTR_ACTIVE = 'data-active';



function InitCrops (i) {
    const _elem = document.createElement('span');

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


function GetActiveEl (e) {
    return e.querySelectorAll('[data-active]')[0];
}

function SetActiveAttr(e, position, value = 0, activeClass = ATTR_ACTIVE) {

    var nextElem = e[(+position) + (+value)];

    if (value > 0 && position == (COUNT - 1)) {
        nextElem = e[0];
    }

    if (value < 0 && position == 0) {
        nextElem = e[(COUNT - 1)];
    }

    nextElem.setAttribute(activeClass, '');
}



function ChangeSlide (value = 0, position = 0) {

    const activeSlide = GetActiveEl(SLIDER);
    const activeCrop = GetActiveEl(CROPS);
    const _crop = CROPS.querySelectorAll('[data-crop]');
    const _position = position ? position : activeSlide.getAttribute('data-slide');

    if (_position != activeSlide.getAttribute('data-crop')) {
        SetActiveAttr(SLIDE, _position, value);
        SetActiveAttr(_crop, _position, value);
        activeSlide.removeAttribute(ATTR_ACTIVE);
        activeCrop.removeAttribute(ATTR_ACTIVE);
    }
}


CROPS.onclick = function(e) {

    if (e.target.getAttribute('data-crop')) { //HUCK


        const activeSlide = GetActiveEl(SLIDER);
        const activeCrop = GetActiveEl(CROPS);
        const _crop = CROPS.querySelectorAll('[data-crop]');
        const _position = e.target.getAttribute('data-crop');

        if (_position != activeCrop.getAttribute('data-crop')) {
            SetActiveAttr(SLIDE, _position);
            SetActiveAttr(_crop, _position);
            activeSlide.removeAttribute(ATTR_ACTIVE);
            activeCrop.removeAttribute(ATTR_ACTIVE);
        }
    }
};




ARROW_LEFT.onclick = () => ChangeSlide(-1);
ARROW_RIGHT.onclick = () => ChangeSlide(1);

setInterval(ARROW_RIGHT.onclick, 4000);