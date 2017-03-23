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