
function RunSlider (id, params = {}) {

    const sliderParams = {
        id: id,
        crops: Number(params.crops) === 0 ? 0 : 1,
        arrows: Number(params.arrows) === 0 ? 0 : 1,
        activeClass: Number(params.activeClass) === 0 ? params.activeClass : 'slide-active',
        timeInterval: Number(params.timeInterval) ? params.timeInterval : 6
    };


    const $slider = sliderParams.id;

    const CURRENT_CLASS_CROP = 'b-slider__crop-item';
    const ACTIVE_CLASS_CROP = 'crop-active';

    const CURRENT_CLASS_SLIDE = 'b-slider__slide';
    const ACTIVE_CLASS_SLIDE = sliderParams.activeClass;

    const ADD_CLASS_CROP = ACTIVE_CLASS_CROP + " " + CURRENT_CLASS_CROP;

    const $slide = $slider.getElementsByClassName(CURRENT_CLASS_SLIDE);
    const $crops = $slider.getElementsByClassName('b-slider__crops');

    const $arl = $slider.getElementsByClassName('b-slider__arrow--left');
    const $arr = $slider.getElementsByClassName('b-slider__arrow--right');
;
    const $count = $slide.length;


    // /*
    // TODO сделать ядро слайдера с API и возможностью кастомизировать
    // (регулировать скорость мотания, добовлять управляющие элементы, имена классов и тд)
    // ряд дефолтных значений
    //
    // idElem : id;
    // activeClass : class;
    // controls : [el1, el2, el3] || el;
    // timeChangeSlide : time;
    // visible preview : boolean;
    // */
    //


    //************ Initialize slider ***********//

    function InitCrops (i) {
        const _el = document.createElement('span');


        _el.className = CURRENT_CLASS_CROP;
        _el.setAttribute('data-crop', i );
        $crops[0].appendChild(_el);

        if (!i) {
            _el.className = ADD_CLASS_CROP;
        }
    }



    function InitSlides (i) {
        $slide[i].setAttribute('data-slide', i );
    }



    function SET_DATA_ATTR () {
        for (var _i = 0; _i < $count; _i++) {
            InitCrops(_i);
            InitSlides(_i);
        }
    }



    SET_DATA_ATTR();



    //************ Action functions ***********//

    function SetActiveNextEl(e, pos, val = 0, currentClass) {
        const _addedClass = e[0].className ;

        let nextElem = e[(+pos) + val];

        if (val > 0 && pos == ($count - 1)) {
            nextElem = e[0];
        }

        if (val < 0 && pos == 0) {
            nextElem = e[($count - 1)];
        }

        e.className = currentClass;
        nextElem.className = _addedClass;
    }


    function ChangeSlide (val = 0, pos = 0) {
        const curSlide = $slider.getElementsByClassName(ACTIVE_CLASS_SLIDE)[0];
        const curCrop = $slider.getElementsByClassName(ACTIVE_CLASS_CROP)[0];
        const crop = $slider.getElementsByClassName(CURRENT_CLASS_CROP);

        pos = pos ? pos : curSlide.getAttribute('data-slide');

        SetActiveNextEl($slide, pos, val, CURRENT_CLASS_SLIDE);
        SetActiveNextEl(crop, pos, val, CURRENT_CLASS_CROP);
    }

    ChangeSlide();

    //************ Response functions ***********//
    //
    // $arl.onclick = () => ChangeSlide(-1);
    // $arr.onclick = () => ChangeSlide(1);
    //
    // $crops.onclick = function(e) {
    //     const curPos = e.target.getAttribute('data-crop');
    //
    //     if (curPos && curPos != GetActiveEl($slider).getAttribute('data-slide')) { //HUCK
    //         ChangeSlide(0, curPos);
    //     }
    // };
    //
    // setTimeout( function Change() {
    //     ChangeSlide(1);
    //
    //     if ($arl.onclick && $arl.onclick && $crops.onclick) {
    //         setTimeout(Change(), 2000);
    //     }
    // }, 2000);

}

RunSlider(mainSlider);
