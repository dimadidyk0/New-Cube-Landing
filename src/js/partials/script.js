window.onload = function() {

    //      ######################
    //      ##### ANIMATIONS #####
    //      ######################

    window.onscroll = showAnimations;

    function showAnimations() {
        let scrolled = window.pageYOffset || document.documentElement.scrollTop;
        let capabilities = document.querySelector('.new-capabilities');
        if (scrolled > 1250 && window.innerWidth >= 1080) {
            capabilities.classList.add('new-capabilities--animated')
        } else if (scrolled > 250) {
            capabilities.classList.add('new-capabilities--animated')
        }
    }

    showAnimations();

    //      #################
    //      ##### VIDEO #####
    //      #################

    let video = document.querySelector('video');
    let videoBlock = document.querySelector('.video-block');
    let fullscreen = document.querySelector('.video-fullscreen');
    let playButton = document.querySelector('.video-play');
    let descriptionHeader = document.querySelector('.video-description h3')
    let descriptionParagraph = document.querySelector('.video-description p')

    function toggleFullScreen(elem) {
        if (!elem.fullscreenElement && // alternative standard method
            !elem.mozFullScreenElement && !document.webkitFullscreenElement) { // current working methods
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
            document.querySelector('.video-wrapper').style.maxWidth = '100%';

        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
            document.querySelector('.video-wrapper').removeAttribute('style');

        }

    }

    function playPause(video) {
        if (video.paused) {
            video.play();
            playButton.style.zIndex = '-1';
            var timer = setInterval(showText, 1000);
        } else {
            video.pause();
            playButton.style.zIndex = '1';
            clearInterval(timer);
        }
    }

    function showText() {

        if (video.currentTime > 3) {
            descriptionHeader.innerHTML = 'Test 2';
            descriptionParagraph.innerHTML = 'Second line'
        } else if (video.currentTime > 1) {
            descriptionHeader.innerHTML = 'Test';
            descriptionParagraph.innerHTML = 'First line'
        }
    }

    video.onclick = function() {
        playPause(video);
    };

    playButton.onclick = function() {
        playPause(video);
    };

    fullscreen.onclick = function() {
        toggleFullScreen(videoBlock);

    };
    video.ondblclick = function() {
        toggleFullScreen(videoBlock);
    };

    //      #############################
    //      ##### DESCRIPTION POINTS ####
    //      #############################

    let descriptions = document.querySelectorAll('.description');
    descriptions.forEach(d => {

        let points = d.querySelectorAll('.description__point');
        points.forEach(p => {

            let destination = p.getAttribute('data-destination');
            let currentParagraph = d.querySelector(`[data-point="${destination}"]`);

            p.onmouseover = () => {
                currentParagraph.classList.add('description__paragraph--current');
            };

            p.onmouseout = () => {
                currentParagraph.classList.remove('description__paragraph--current');
            };
        });
    });

}