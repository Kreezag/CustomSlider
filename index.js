const slider = document.querySelectorAll('[data-slider]');
const pointer = document.querySelectorAll('[data-pointer]');


const arrowLeft = document.querySelectorAll('[data-arrow-left]');
const arrowRight = document.querySelectorAll('[data-arrow-right]');

console.log(arrowLeft);
console.log(arrowRight);


arrowLeft.onclick = function() {
    console.log(slider)
};

arrowRight.onclick =function() {
    console.log(pointer)
};