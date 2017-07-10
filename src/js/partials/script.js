window.onload = function() {

    let windowH = window.innerHeight;
    let thisDoc = document;
    //      ######################
    //      ##### ANIMATIONS #####
    //      ######################

    thisDoc.addEventListener('scroll', addCapClass)

    function addCapClass() {
        let scrolled = window.pageYOffset,
            block = thisDoc.querySelector('.new-capabilities'),
            blockH = block.clientHeight,
            top = block.offsetTop,
            y = top - (windowH - blockH);


        if (scrolled > y && window.innerWidth >= 1080) {
            block.classList.add('new-capabilities--animated');
            thisDoc.removeEventListener('scroll', addCapClass);
        } else if (scrolled > top && window.innerWidth < 1080) {
            block.classList.add('new-capabilities--animated')
            thisDoc.removeEventListener('scroll', addCapClass);
        }

    }

    //      #################
    //      ##### VIDEO #####
    //      #################

    let video = thisDoc.querySelector('video');
    let videoBlock = thisDoc.querySelector('.video-block');
    let fullscreen = thisDoc.querySelector('.video-fullscreen');
    let playButton = thisDoc.querySelector('.video-play');
    let descriptionHeader = thisDoc.querySelector('.video-description h3')
    let descriptionParagraph = thisDoc.querySelector('.video-description p')

    function toggleFullScreen(elem) {
        if (!elem.fullscreenElement && // alternative standard method
            !elem.mozFullScreenElement && !thisDoc.webkitFullscreenElement) { // current working methods
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
            thisDoc.querySelector('.video-wrapper').style.maxWidth = '100%';

        } else {
            if (thisDoc.cancelFullScreen) {
                thisDoc.cancelFullScreen();
            } else if (thisDoc.mozCancelFullScreen) {
                thisDoc.mozCancelFullScreen();
            } else if (thisDoc.webkitCancelFullScreen) {
                thisDoc.webkitCancelFullScreen();
            }
            thisDoc.querySelector('.video-wrapper').removeAttribute('style');

        }

    }

    function playPause(video) {

        if (video.paused) {
            video.play();
            playButton.style.zIndex = '-1';
            let timer = setInterval(showText, 1000);
        } else {
            video.pause();
            playButton.style.zIndex = '1';
            clearInterval(timer);
        }
    }

    function showText() {

        // if (video.currentTime > 3) {
        //     descriptionHeader.innerHTML = 'Test 2';
        //     descriptionParagraph.innerHTML = 'Second line'
        // } else if (video.currentTime > 1) {
        //     descriptionHeader.innerHTML = 'Test';
        //     descriptionParagraph.innerHTML = 'First line'
        // }

    }

    video.onclick = () => { playPause(video); };
    playButton.onclick = () => { playPause(video); };
    fullscreen.onclick = () => { toggleFullScreen(videoBlock); };
    video.ondblclick = () => { toggleFullScreen(videoBlock); };

    //      #############################
    //      ##### DESCRIPTION POINTS ####
    //      #############################

    let descriptions = thisDoc.querySelectorAll('.description'),
        descrMarkerArr = [],
        yArr = [];

    descriptions.forEach(d => {

        descrMarkerArr.push(true);

        let top = d.offsetTop,
            h = d.clientHeight,
            y = top - (windowH - h);
        yArr.push(y);

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
            currentParagraph.onmouseover = () => {
                p.classList.add('description__point--hover');
            }
            currentParagraph.onmouseout = () => {
                p.classList.remove('description__point--hover');
            }
        });
    });

    window.onscroll = function() {
        let scrolled = window.pageYOffset || thisDoc.scrollTop;

        descriptions.forEach((d, i) => {
            let y = d.offsetTop;
            if (scrolled > yArr[i] && descrMarkerArr[i] === true) {
                pointActivation(d);
                descrMarkerArr[i] = false;
            }
        });

    }
}


function pointActivation(description) {
    let scrolled = window.pageYOffset || thisDoc.scrollTop;

    let points = description.querySelectorAll('.description__point');
    let paragraphs = description.querySelectorAll('.description__paragraph');
    let y = description.offsetTop;


    let i = 0;
    setTimeout(function showPoint() {
        points.forEach(p => p.classList.remove('description__point--hover'));
        paragraphs.forEach(p => p.classList.remove('description__paragraph--current'));

        points[i].classList.add('description__point--hover');
        paragraphs[i].classList.add('description__paragraph--current');
        i++;
        if (i < points.length) setTimeout(showPoint, 1000);
        else {
            setTimeout(function() {
                points.forEach(p => p.classList.remove('description__point--hover'));
                paragraphs.forEach(p => p.classList.remove('description__paragraph--current'));
            }, 1000);
        }
    }, 100);


}