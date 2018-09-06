
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcclxuICAgIHZhciBzbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVzJyk7XHJcblxyXG4gICAgaWYgKHNsaWRlcikge1xyXG4gICAgICAgIHZhciBzbGlkZXMgPSBzbGlkZXIucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlcl9faW1hZ2UnKTtcclxuICAgICAgICB2YXIgc2xpZGVyTGlzdCA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCcuc2xpZGVzX19saXN0Jyk7XHJcbiAgICAgICAgdmFyIHNsaWRlc0xlbmd0aCA9IHNsaWRlcy5sZW5ndGg7XHJcblxyXG4gICAgICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IHBhcnNlSW50KHNsaWRlci5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xyXG4gICAgICAgICAgICB2YXIgbmV4dEluZGV4ID0gKGN1cnJlbnRJbmRleCArIDEpICUgc2xpZGVzTGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgc2xpZGVyLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIG5leHRJbmRleCk7XHJcbiAgICAgICAgICAgIHNsaWRlckxpc3Quc3R5bGUubGVmdCA9IG5leHRJbmRleCAqIC0xMDAgKyAnJSc7XHJcbiAgICAgICAgICAgIC8vIHNsaWRlckxpc3Quc3R5bGUubGVmdCA9IGAke25leHRJbmRleCAqIC0xMDB9JWA7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIHByZXZCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyAgICAgdmFyIGN1cnJlbnRJbmRleCA9IHBhcnNlSW50KHNsaWRlci5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xyXG4gICAgICAgIC8vIH0pXHJcbiAgICB9XHJcbn0pOyJdLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
