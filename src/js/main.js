
document.addEventListener("DOMContentLoaded", function() {
    var slider = document.querySelector('.slides');

    if (slider) {
        var slides = slider.querySelectorAll('.slider__image');
        var sliderList = slider.querySelector('.slides__list');
        var slidesLength = slides.length;

        slider.addEventListener('click', function(e) {
            var currentIndex = parseInt(slider.getAttribute('data-index'), 10);
            var nextIndex = (currentIndex + 1) % slidesLength;

            slider.setAttribute('data-index', nextIndex);
            sliderList.style.left = nextIndex * -100 + '%';
            // sliderList.style.left = `${nextIndex * -100}%`;
        });

        // prevButton.addEventListener('click', function() {
        //     var currentIndex = parseInt(slider.getAttribute('data-index'), 10);
        // })
    }
});
