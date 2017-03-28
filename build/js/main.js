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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblxuICAgIC8vICAgICAgIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAgIC8vICAgICAgIyMjIyMgQU5JTUFUSU9OUyAjIyMjI1xuICAgIC8vICAgICAgIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4gICAgd2luZG93Lm9uc2Nyb2xsID0gc2hvd0FuaW1hdGlvbnM7XG5cbiAgICBmdW5jdGlvbiBzaG93QW5pbWF0aW9ucygpIHtcbiAgICAgICAgbGV0IHNjcm9sbGVkID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICAgIGxldCBjYXBhYmlsaXRpZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LWNhcGFiaWxpdGllcycpO1xuICAgICAgICBpZiAoc2Nyb2xsZWQgPiAxMjUwICYmIHdpbmRvdy5pbm5lcldpZHRoID49IDEwODApIHtcbiAgICAgICAgICAgIGNhcGFiaWxpdGllcy5jbGFzc0xpc3QuYWRkKCduZXctY2FwYWJpbGl0aWVzLS1hbmltYXRlZCcpXG4gICAgICAgIH0gZWxzZSBpZiAoc2Nyb2xsZWQgPiAyNTApIHtcbiAgICAgICAgICAgIGNhcGFiaWxpdGllcy5jbGFzc0xpc3QuYWRkKCduZXctY2FwYWJpbGl0aWVzLS1hbmltYXRlZCcpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93QW5pbWF0aW9ucygpO1xuXG4gICAgLy8gICAgICAjIyMjIyMjIyMjIyMjIyMjI1xuICAgIC8vICAgICAgIyMjIyMgVklERU8gIyMjIyNcbiAgICAvLyAgICAgICMjIyMjIyMjIyMjIyMjIyMjXG5cbiAgICBsZXQgdmlkZW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd2aWRlbycpO1xuICAgIGxldCB2aWRlb0Jsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZpZGVvLWJsb2NrJyk7XG4gICAgbGV0IGZ1bGxzY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW8tZnVsbHNjcmVlbicpO1xuICAgIGxldCBwbGF5QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZpZGVvLXBsYXknKTtcbiAgICBsZXQgZGVzY3JpcHRpb25IZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW8tZGVzY3JpcHRpb24gaDMnKVxuICAgIGxldCBkZXNjcmlwdGlvblBhcmFncmFwaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1kZXNjcmlwdGlvbiBwJylcblxuICAgIGZ1bmN0aW9uIHRvZ2dsZUZ1bGxTY3JlZW4oZWxlbSkge1xuICAgICAgICBpZiAoIWVsZW0uZnVsbHNjcmVlbkVsZW1lbnQgJiYgLy8gYWx0ZXJuYXRpdmUgc3RhbmRhcmQgbWV0aG9kXG4gICAgICAgICAgICAhZWxlbS5tb3pGdWxsU2NyZWVuRWxlbWVudCAmJiAhZG9jdW1lbnQud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQpIHsgLy8gY3VycmVudCB3b3JraW5nIG1ldGhvZHNcbiAgICAgICAgICAgIGlmIChlbGVtLnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZWxlbS5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlbGVtLm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZWxlbS5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlbGVtLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZWxlbS53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbihFbGVtZW50LkFMTE9XX0tFWUJPQVJEX0lOUFVUKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlby13cmFwcGVyJykuc3R5bGUubWF4V2lkdGggPSAnMTAwJSc7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5jYW5jZWxGdWxsU2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuY2FuY2VsRnVsbFNjcmVlbigpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC53ZWJraXRDYW5jZWxGdWxsU2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQud2Via2l0Q2FuY2VsRnVsbFNjcmVlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZpZGVvLXdyYXBwZXInKS5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxheVBhdXNlKHZpZGVvKSB7XG4gICAgICAgIGlmICh2aWRlby5wYXVzZWQpIHtcbiAgICAgICAgICAgIHZpZGVvLnBsYXkoKTtcbiAgICAgICAgICAgIHBsYXlCdXR0b24uc3R5bGUuekluZGV4ID0gJy0xJztcbiAgICAgICAgICAgIHZhciB0aW1lciA9IHNldEludGVydmFsKHNob3dUZXh0LCAxMDAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZpZGVvLnBhdXNlKCk7XG4gICAgICAgICAgICBwbGF5QnV0dG9uLnN0eWxlLnpJbmRleCA9ICcxJztcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hvd1RleHQoKSB7XG5cbiAgICAgICAgaWYgKHZpZGVvLmN1cnJlbnRUaW1lID4gMykge1xuICAgICAgICAgICAgZGVzY3JpcHRpb25IZWFkZXIuaW5uZXJIVE1MID0gJ1Rlc3QgMic7XG4gICAgICAgICAgICBkZXNjcmlwdGlvblBhcmFncmFwaC5pbm5lckhUTUwgPSAnU2Vjb25kIGxpbmUnXG4gICAgICAgIH0gZWxzZSBpZiAodmlkZW8uY3VycmVudFRpbWUgPiAxKSB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbkhlYWRlci5pbm5lckhUTUwgPSAnVGVzdCc7XG4gICAgICAgICAgICBkZXNjcmlwdGlvblBhcmFncmFwaC5pbm5lckhUTUwgPSAnRmlyc3QgbGluZSdcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZpZGVvLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcGxheVBhdXNlKHZpZGVvKTtcbiAgICB9O1xuXG4gICAgcGxheUJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHBsYXlQYXVzZSh2aWRlbyk7XG4gICAgfTtcblxuICAgIGZ1bGxzY3JlZW4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0b2dnbGVGdWxsU2NyZWVuKHZpZGVvQmxvY2spO1xuXG4gICAgfTtcbiAgICB2aWRlby5vbmRibGNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRvZ2dsZUZ1bGxTY3JlZW4odmlkZW9CbG9jayk7XG4gICAgfTtcblxuICAgIC8vICAgICAgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgICAvLyAgICAgICMjIyMjIERFU0NSSVBUSU9OIFBPSU5UUyAjIyMjXG4gICAgLy8gICAgICAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4gICAgbGV0IGRlc2NyaXB0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZXNjcmlwdGlvbicpO1xuICAgIGRlc2NyaXB0aW9ucy5mb3JFYWNoKGQgPT4ge1xuXG4gICAgICAgIGxldCBwb2ludHMgPSBkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZXNjcmlwdGlvbl9fcG9pbnQnKTtcbiAgICAgICAgcG9pbnRzLmZvckVhY2gocCA9PiB7XG5cbiAgICAgICAgICAgIGxldCBkZXN0aW5hdGlvbiA9IHAuZ2V0QXR0cmlidXRlKCdkYXRhLWRlc3RpbmF0aW9uJyk7XG4gICAgICAgICAgICBsZXQgY3VycmVudFBhcmFncmFwaCA9IGQucXVlcnlTZWxlY3RvcihgW2RhdGEtcG9pbnQ9XCIke2Rlc3RpbmF0aW9ufVwiXWApO1xuXG4gICAgICAgICAgICBwLm9ubW91c2VvdmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQYXJhZ3JhcGguY2xhc3NMaXN0LmFkZCgnZGVzY3JpcHRpb25fX3BhcmFncmFwaC0tY3VycmVudCcpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcC5vbm1vdXNlb3V0ID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQYXJhZ3JhcGguY2xhc3NMaXN0LnJlbW92ZSgnZGVzY3JpcHRpb25fX3BhcmFncmFwaC0tY3VycmVudCcpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0iXSwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
