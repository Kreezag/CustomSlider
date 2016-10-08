const SLIDER = document.querySelectorAll('[data-slider]')[0];
const SLIDE = document.querySelectorAll('.b-slider__slide');
const COUNT = SLIDE.length;

const ARROW_LEFT = document.querySelectorAll('[data-arrow-left]')[0];
const ARROW_RIGHT = document.querySelectorAll('[data-arrow-right]')[0];
const CROPS = document.querySelectorAll('[data-crop-list]')[0];

const DATA_ACTIVE = 'data-active';


//************ Initialize slider ***********//

function InitCrops (i) {
    const _el = document.createElement('span');
    const _cropClass = 'b-slider__crop-item';

    _el.className = _cropClass;
    _el.setAttribute('data-crop', i );
    CROPS.appendChild(_el);

    if (!i) {
        _el.setAttribute(DATA_ACTIVE, '');
    }
}


function InitSlides (i) {
    SLIDE[i].setAttribute('data-slide', i );
}


function SET_DATA_ATTR () {
    for (var _i = 0; _i < COUNT; _i++) {
        InitCrops(_i);
        InitSlides(_i);
    }
}


SET_DATA_ATTR();



//************ Action functions ***********//

function GetActiveEl (e) {
    return e.querySelectorAll('[data-active]')[0];
}


function SetActiveAttr(e, pos, val = 0, activeClass = DATA_ACTIVE) {
    var nextElem = e[(+pos) + val];

    if (val > 0 && pos == (COUNT - 1)) {
        nextElem = e[0];
    }

    if (val < 0 && pos == 0) {
        nextElem = e[(COUNT - 1)];
    }

    nextElem.setAttribute(activeClass, '');
}


function ChangeSlide (val = 0, pos = 0) {
    const _curSlide = GetActiveEl(SLIDER);
    const _curCrop = GetActiveEl(CROPS);
    const _crop = CROPS.querySelectorAll('[data-crop]');
    const _pos = pos ? pos : _curSlide.getAttribute('data-slide');

    SetActiveAttr(SLIDE, _pos, val);
    SetActiveAttr(_crop, _pos, val);

    _curSlide.removeAttribute(DATA_ACTIVE);
    _curCrop.removeAttribute(DATA_ACTIVE);
}



//************ Response functions ***********//

ARROW_LEFT.onclick = () => ChangeSlide(-1);
ARROW_RIGHT.onclick = () => ChangeSlide(1);

CROPS.onclick = function(e) {
    const _curPos = e.target.getAttribute('data-crop');

    if (_curPos && _curPos != GetActiveEl(SLIDER).getAttribute('data-slide')) { //HUCK
        ChangeSlide(0, _curPos);
    }
};

setInterval(ARROW_RIGHT.onclick, 4000);