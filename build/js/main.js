window.onload = function() {

    window.onscroll = showAnimations;

    function showAnimations() {
        let scrolled = window.pageYOffset || document.documentElement.scrollTop;
        let capabilities = document.querySelector('.new-capabilities');
        if (scrolled > 1300) {
            capabilities.classList.add('new-capabilities--animated')
        };
    }

    showAnimations();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblxuICAgIHdpbmRvdy5vbnNjcm9sbCA9IHNob3dBbmltYXRpb25zO1xuXG4gICAgZnVuY3Rpb24gc2hvd0FuaW1hdGlvbnMoKSB7XG4gICAgICAgIGxldCBzY3JvbGxlZCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgICBsZXQgY2FwYWJpbGl0aWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy1jYXBhYmlsaXRpZXMnKTtcbiAgICAgICAgaWYgKHNjcm9sbGVkID4gMTMwMCkge1xuICAgICAgICAgICAgY2FwYWJpbGl0aWVzLmNsYXNzTGlzdC5hZGQoJ25ldy1jYXBhYmlsaXRpZXMtLWFuaW1hdGVkJylcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzaG93QW5pbWF0aW9ucygpO1xufSJdLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
