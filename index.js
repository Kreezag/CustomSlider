
function RunSlider (id, params = {}) {

    const ACTIVE_CLASS_CROP = 'b-slider__crop-item--active';
    const CURRENT_CLASS_CROP = 'b-slider__crop-item';

    let ACTIVE_CLASS_SLIDE = 'b-slider__slide--active';
    const CURRENT_CLASS_SLIDE = 'b-slider__slide';
    const CURRENT_CROP_LEFT = 'b-slider__arrow--left';
    const CURRENT_CROP_RIGHT = 'b-slider__arrow--right';

    const sliderParams = {
        id: id,
        crops: Number(params.crops) === 0 ? 0 : 1,
        controls: Number(params.controls) === 0 ? 0 : 1,
        activeClass: params.activeClass ? params.activeClass : ACTIVE_CLASS_SLIDE,
        timeInterval: Number(params.timeInterval) ? params.timeInterval : 3000
    };

    const $slider = sliderParams.id;

    const $slides = $slider.getElementsByClassName(CURRENT_CLASS_SLIDE);
    const $crops = $slider.getElementsByClassName(CURRENT_CLASS_CROP);
    const $cropwr = $slider.getElementsByClassName('b-slider__crops');

    const $count = $slides.length;

    const $arl = $slider.getElementsByClassName(CURRENT_CROP_LEFT);
    const $arr = $slider.getElementsByClassName(CURRENT_CROP_RIGHT);




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
            sliderParams.crops ? InitCrops(_i) : '';
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
        sliderParams.crops ? SetActiveEl($crops, curCrop, pos, val, CURRENT_CLASS_CROP) : false;
    }

    ChangeSlide();





    //************ Response functions ***********//

    var timerSlider = setTimeout(function Change() {
        ChangeSlide(1);

        timerSlider = setTimeout(Change, sliderParams.timeInterval);
    }, sliderParams.timeInterval);


    if (sliderParams.controls) {
        $arl[0].onclick = () => {
            ChangeSlide(-1);
            clearInterval(timerSlider);
        };

        $arr[0].onclick = () => {
            ChangeSlide(1);
            clearInterval(timerSlider);
        };
    } else {
        $arl[0].className = CURRENT_CROP_LEFT;
        $arr[0].className = CURRENT_CROP_RIGHT;
    }


    $cropwr[0].onclick = function(e) {
        const curPos = e.target.getAttribute('data-crop');

        if (curPos && curPos != $slides[0].getAttribute(ACTIVE_CLASS_SLIDE)) { //HUCK
            ChangeSlide(0, curPos);
        }

        clearInterval(timerSlider);
    };
}

RunSlider(mainSlider);

RunSlider(secondSlider, {
    crops: false,
    controls: false,
    timeInterval: 1000
});
