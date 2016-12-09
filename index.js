
function RunSlider (id, params = {}) {

    const $then = this;

    const sliderParams = {
        id: id,
        crops: Number(params.crops) === 0 ? 0 : 1,
        arrows: Number(params.arrows) === 0 ? 0 : 1,
        activeClass: Number(params.activeClass) === 0 ? params.activeClass : 'slide-active',
        timeInterval: Number(params.timeInterval) ? params.timeInterval : 6
    };
}

RunSlider(mainSlider);
