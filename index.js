
function RunSlider (id) {
    const $slider = id;

    const $slide = $slider.querySelectorAll('.b-slider__slide');
    const $count = $slide.length;

    const $arl = $slider.querySelectorAll('[data-arrow-left]')[0];
    const $arr = $slider.querySelectorAll('[data-arrow-right]')[0];
    const $crops = $slider.querySelectorAll('[data-crop-list]')[0];

    const DATA_ACTIVE = 'data-active';


    //************ Initialize slider ***********//

    function Init$crops (i) {
        const _el = document.createElement('span');

        _el.className = 'b-slider__crop-item';
        _el.setAttribute('data-crop', i );
        $crops.appendChild(_el);

        if (!i) {
            _el.setAttribute(DATA_ACTIVE, '');
        }
    }


    function InitSlides (i) {
        $slide[i].setAttribute('data-slide', i );
    }


    function SET_DATA_ATTR () {
        for (var _i = 0; _i < $count; _i++) {
            Init$crops(_i);
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

        if (val > 0 && pos == ($count - 1)) {
            nextElem = e[0];
        }

        if (val < 0 && pos == 0) {
            nextElem = e[($count - 1)];
        }

        nextElem.setAttribute(activeClass, '');
    }


    function ChangeSlide (val = 0, pos = 0) {
        const _curSlide = GetActiveEl($slider);
        const _curCrop = GetActiveEl($crops);
        const _crop = $crops.querySelectorAll('[data-crop]');
        const _pos = pos ? pos : _curSlide.getAttribute('data-slide');

        SetActiveAttr($slide, _pos, val);
        SetActiveAttr(_crop, _pos, val);

        _curSlide.removeAttribute(DATA_ACTIVE);
        _curCrop.removeAttribute(DATA_ACTIVE);
    }



    //************ Response functions ***********//

    $arl.onclick = () => ChangeSlide(-1);
    $arr.onclick = () => ChangeSlide(1);

    $crops.onclick = function(e) {
        const _curPos = e.target.getAttribute('data-crop');

        if (_curPos && _curPos != GetActiveEl($slider).getAttribute('data-slide')) { //HUCK
            ChangeSlide(0, _curPos);
        }
    };

    setInterval($arr.onclick, 4000);

}

RunSlider(mainSlider);
