
function RunSlider (id, params = {}) {

    const ACTIVE_CLASS_CROP = 'b-slider__crop-item--active';
    const CURRENT_CLASS_CROP = 'b-slider__crop-item';

    let ACTIVE_CLASS_SLIDE = 'b-slider__slide--active';
    const CURRENT_CLASS_SLIDE = 'b-slider__slide';

    const sliderParams = {
        id: id,
        crops: Number(params.crops) === 0 ? 0 : 1,
        arrows: Number(params.arrows) === 0 ? 0 : 1,
        activeClass: params.activeClass ? params.activeClass : ACTIVE_CLASS_SLIDE,
        timeInterval: Number(params.timeInterval) ? params.timeInterval : 3000
    };

    const $slider = sliderParams.id;

    const $slides = $slider.getElementsByClassName(CURRENT_CLASS_SLIDE);
    const $crops = $slider.getElementsByClassName(CURRENT_CLASS_CROP);
    const $cropwr = $slider.getElementsByClassName('b-slider__crops');

    const $count = $slides.length;

    const $arl = $slider.getElementsByClassName('b-slider__arrow--left');
    const $arr = $slider.getElementsByClassName('b-slider__arrow--right');



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
        $cropwr[0].appendChild(_el);

        if (!i) {
            _el.className = ACTIVE_CLASS_CROP + " " + CURRENT_CLASS_CROP;
        }
    }



    function InitSlides (i) {
        $slides[i].setAttribute('data-slide', i );
    }



    function INIT_DATA_ATTR () {
        for (var _i = 0; _i < $count; _i++) {
            InitCrops(_i);
            InitSlides(_i);
        }
    }



    INIT_DATA_ATTR();



    //************ Action functions ***********//



    function SetActiveEl(elems, e, pos, val = 0, currentClass) {
        var _activeClass = e.className;

        pos = Number(pos);
        val = Number(val);

        const getNextPos = () => {
            if (val > 0 && pos === ($count - 1)) {
                return 0;
            }

            if (val < 0 && pos == 0) {
                return ($count - 1);
            }

            return (pos + val);
        };

        var nexPos = getNextPos();

        e.className = currentClass;
        elems[nexPos].className = _activeClass;
    }


    function ChangeSlide (val = 0, pos = 0) {
        var curSlide = $slider.getElementsByClassName(ACTIVE_CLASS_SLIDE)[0];
        var curCrop = $slider.getElementsByClassName(ACTIVE_CLASS_CROP)[0];
        var curAttr = curSlide.getAttribute('data-slide');

        pos = pos ? pos : curAttr;

        SetActiveEl($slides, curSlide, pos, val, CURRENT_CLASS_SLIDE);
        SetActiveEl($crops, curCrop, pos, val, CURRENT_CLASS_CROP);
    }

    ChangeSlide();





    //************ Response functions ***********//

    $arl[0].onclick = () => {
        ChangeSlide(-1);
    };

    $arr[0].onclick = () => {
        ChangeSlide(1);
    };

    $cropwr[0].onclick = function(e) {
        const curPos = e.target.getAttribute('data-crop');

        if (curPos && curPos != $slides[0].getAttribute(ACTIVE_CLASS_SLIDE)) { //HUCK
            ChangeSlide(0, curPos);
        }
    };


    var timerSlider = setTimeout(function Change() {
        ChangeSlide(1);

        timerSlider = setTimeout(Change, sliderParams.timeInterval);
    }, sliderParams.timeInterval);

}

RunSlider(mainSlider);
RunSlider(secondSlider, {
    crops: 'hide',
    arrows: 'hide',
    timeInterval: 1000
});
