const slider = document.querySelectorAll('[data-slider]');
const crops = document.querySelectorAll('[data-crop-list]')[0];
const activeSlide = document.querySelectorAll('[data-slide-active]')[0];


const arrowLeft = document.querySelectorAll('[data-arrow-left]')[0];
const arrowRight = document.querySelectorAll('[data-arrow-right]')[0];


const slide = document.querySelectorAll('.b-slider__slide');
const slidesCount = slide.length;



function AddDataCrops (i) {
    const _elem = document.createElement('li');

    _elem.className = 'b-slider__crop-item';
    _elem.setAttribute('data-crop', i );
    crops.appendChild(_elem);

    if (i === 0) {
        _elem.setAttribute('data-crop-active', '');
    }
}




function AddDataSlides (i) {
    slide[i].setAttribute('data-slide', i );
}



function SET_DATA_ATTR () {
    for (var _i = 0; _i < slidesCount; _i++) {
        AddDataCrops(_i);
        AddDataSlides(_i);
    }
}



SET_DATA_ATTR();