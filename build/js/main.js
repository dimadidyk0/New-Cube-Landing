
document.addEventListener("DOMContentLoaded", function() {
    let 
        pathArr     = window.location.pathname.split('/'),
        langLists   = Array.from(document.querySelectorAll('.language-list'));
        
    if (pathArr.indexOf('ru')!= -1) {
        setCurrentLang('ru', langLists);
        let descriptionImages = Array.from(document.querySelectorAll('.description__img-wrapper img'));
        descriptionImages.forEach(i => {
            let src = i.getAttribute('data-src-ru');
            i.setAttribute('src', src);
        });
    }

    else if (pathArr.indexOf('jp')!= -1) setCurrentLang('jp', langLists);

    else setCurrentLang('en', langLists);
        
    langLists.forEach(list => {

        list.onclick = function(e) {
            let arr = e.path;
            for(let i = 0; i< arr.length; i++) {
                if (arr[i].tagName === 'LI') return null;
            }
            list.classList.toggle('language-list--current');
        }

        let current = list.querySelector('.current-lang');
        current.onclick = function(e) {
            e.preventDefault();
            list.classList.toggle('language-list--current');
        }
    });

    function setCurrentLang(lang, arr) {
        arr.forEach(l => {
            l.querySelector('.current-lang').classList.remove('current-lang')
            l.querySelector('[data-lg=' +  lang +']').classList.add('current-lang')
        });
    }



    //      ######################
    //      #####   POP-UP   #####
    //      ######################
    // let popUp = document.getElementById('pop-up');
    // let popUpOrder = document.getElementById('pop-up-order');

    let forms = document.querySelectorAll('form');
    forms.forEach(f => {
        let thisForm = f;
        f.onsubmit = function(e) {

            e.preventDefault();
            var message = new FormData(f);

            function ajax(url, callback, message) {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', url);
                xhr.onreadystatechange = function(){
                    if (this.readyState == 4 && this.status == 200) {
                        // console.log(message);
                        let 
                            thank   = document.getElementById('pop-up-thank'),
                            layout  = document.querySelector('.pop-up-layout'),
                            popUp   = document.querySelector('.pop-up[style]');

                        thank.style.visibility = 'inherit';
                        popUp.removeAttribute('style');
                        setTimeout(function() {
                            layout.removeAttribute('style');
                            thank.removeAttribute('style');
                        }, 2000);
                    }
                };
                xhr.send(message);
            }

            

            ajax('/subscribe',function() {}, message);

            // var message = thisForm.serialize();
            // $.ajax({
            //     type: 'POST',
            //     url: '/subscribe',
            //     data: message,
            //     success: function() {
            //         let thank   = document.getElementById('pop-up-thank');
            //             layout  = document.querySelector('.pop-up-layout');
            //         let popUp   = document.querySelector('.pop-up[style]');
            //         thank.style.visibility = 'inherit';
            //         popUp.removeAttribute('style');
            //         setTimeout(function() {
            //             layout.removeAttribute('style');
            //             thank.removeAttribute('style');
            //         }, 2000);
            //     },
            //     error:  function(xhr, str){
            //         alert('Возникла ошибка: ' + xhr.responseCode);
            //     }
            // });
        }
    });


    function showHide(popUp) {

        let layout = document.querySelector('.pop-up-layout');
        let style = layout.getAttribute('style');
        if (style === null) {
            layout.style.display = 'block';
            popUp.style.display = 'block';
        } else {
            layout.removeAttribute('style');
            popUp.removeAttribute('style');
        }

    }





    if (window.innerWidth < 980) {
        let inputs = document.querySelectorAll('input');
        inputs.forEach(i => {
            i.removeAttribute('placeholder');
            let label = i.previousElementSibling;
            i.onfocus = function() {
                label.classList.add('pop-up__label-current');
            };
            i.onblur = function() {
                if (i.value == '') label.classList.remove('pop-up__label-current');
            }
        });
    }

    // let forms = document.querySelectorAll('form');
    // if (forms) forms.forEach(f => {
    //     let btn = f.querySelector('input[type="submit"]');
    //     btn.onclick = (btn) => {
    //         // btn.preventDefault();
    //         let data = {};
    //         let inputs = f.querySelectorAll('input[name]');
    //         inputs.forEach(i => {

    //             let value = i.value;
    //             let name = i.getAttribute('name');
    //             if (value && value != '') data[`${name}`] = (value);

    //         });
    //         data = JSON.stringify(data);
    //         localStorage.setItem('data', data);

    //         f.onsubmit = (f) => {
    //             f.preventDefault();
    //             let thank = document.getElementById('pop-up-thank');
    //             thank.style.visibility = 'inherit';
    //             let layout = document.querySelector('.pop-up-layout');
    //             let popUp = document.querySelector('.pop-up[style]');
    //             popUp.removeAttribute('style');
    //             setTimeout(function() {
    //                 layout.removeAttribute('style');
    //                 thank.removeAttribute('style');
    //             }, 2000);
    //         };
    //     };
    // });

    let popUpBtns = document.querySelectorAll('.pop-up-button');
    popUpBtns.forEach(btn => {

        btn.addEventListener('click', function(e) {
            e.preventDefault();
            let 
                destenation = btn.getAttribute('data-destenation'),
                popUp       = document.getElementById(destenation),
                layout      = document.querySelector('.pop-up-layout'),
                close       = popUp.querySelector('.pop-up__close');

            showHide(popUp);
            layout.onclick = function() { showHide(popUp); }
            close.onclick = function() { showHide(popUp); }
        });

    })

    // let earlyBtn = document.getElementById('early-access');
    // earlyBtn.addEventListener('click', function(b) {
    //     // b
    //     showHide(popUp);

    //     let layout = document.querySelector('.pop-up-layout');
    //     layout.onclick = showHide;

    //     function showHide() {
    //         let layout = document.querySelector('.pop-up-layout');
    //         let body = document.querySelector('body');
    //         let close = popUp.querySelector('.pop-up__close');

    //         let style = layout.getAttribute('style');
    //         if (style === null) {
    //             layout.style.display = 'block';
    //             popUp.style.display = 'block';
    //         } else {
    //             layout.removeAttribute('style');
    //             popUp.removeAttribute('style');
    //         }

    //         close.onclick = showHide;
    //     }
    // });

    //      ######################
    //      ##### ANIMATIONS #####
    //      ######################

    document.onscroll = function()

    {
        let scrolled = window.pageYOffset;

        let capabilities = document.querySelector('.new-capabilities');
        if (scrolled > 1250 && window.innerWidth >= 1080) {
            capabilities.classList.add('new-capabilities--animated')
        } else if (scrolled > 250) {
            capabilities.classList.add('new-capabilities--animated')
        }
    }

    //      #################
    //      ##### VIDEO #####
    //      #################

    let videoBlocks = document.querySelectorAll('.video-block');
    videoBlocks.forEach(b => {
        let video = b.querySelector('video');
        let fullscreen = b.querySelector('.video-fullscreen');
        let playButton = b.querySelector('.video-play');
        let descriptionHeader = b.querySelector('.video-description h3')
        let descriptionParagraph = b.querySelector('.video-description p');

        if(window.clientHeigth > 980) {
            video.onclick = function() {
                playPause(video, playButton);
            };
        }

        playButton.onclick = function() {
            playPause(video, playButton);
        };

        fullscreen.onclick = function() {
            toggleFullScreen(videoBlock);

        };
        video.ondblclick = function() {
            toggleFullScreen(videoBlock);
        };

        function playPause(video, playButton) {
            if (video.paused) {
                video.parentNode.setAttribute('data-status', 'play');
                video.play();
                playButton.style.zIndex = '-1';
                var timer = setInterval(showText, 1000);
            } else {
                video.parentNode.removeAttribute('data-status')
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
    });

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
            currentParagraph.onmouseover = () => {
                p.classList.add('description__point--hover');
            }
            currentParagraph.onmouseout = () => {
                p.classList.remove('description__point--hover');
            }
        });
    });




    window.onscroll = function() {
        let scrolled = window.pageYOffset || document.scrollTop;

        let descriptions = document.querySelectorAll('.description');
        descriptions.forEach(d => {

            let y = d.offsetTop;
            if (scrolled <= y + 10 && scrolled > y) {
                pointActivation(d);
            }
        });

    }
});

function pointActivation(description) {
    let points = description.querySelectorAll('.description__point');
    let paragraphs = description.querySelectorAll('.description__paragraph');
    let y = description.offsetTop;

    let scrolled = window.pageYOffset || document.scrollTop;


    let i = 0;

    setTimeout(function run() {
        points.forEach(p => p.classList.remove('description__point--hover'));
        paragraphs.forEach(p => p.classList.remove('description__paragraph--current'));

        points[i].classList.add('description__point--hover');
        paragraphs[i].classList.add('description__paragraph--current');
        i++;
        if (i < points.length) setTimeout(run, 1000);
        else {
            setTimeout(function() {
                points.forEach(p => p.classList.remove('description__point--hover'));
                paragraphs.forEach(p => p.classList.remove('description__paragraph--current'));
            }, 1000);
        }

    }, 100);




}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgbGV0IFxuICAgICAgICBwYXRoQXJyICAgICA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpLFxuICAgICAgICBsYW5nTGlzdHMgICA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxhbmd1YWdlLWxpc3QnKSk7XG4gICAgICAgIFxuICAgIGlmIChwYXRoQXJyLmluZGV4T2YoJ3J1JykhPSAtMSkge1xuICAgICAgICBzZXRDdXJyZW50TGFuZygncnUnLCBsYW5nTGlzdHMpO1xuICAgICAgICBsZXQgZGVzY3JpcHRpb25JbWFnZXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZXNjcmlwdGlvbl9faW1nLXdyYXBwZXIgaW1nJykpO1xuICAgICAgICBkZXNjcmlwdGlvbkltYWdlcy5mb3JFYWNoKGkgPT4ge1xuICAgICAgICAgICAgbGV0IHNyYyA9IGkuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYy1ydScpO1xuICAgICAgICAgICAgaS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyYyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGVsc2UgaWYgKHBhdGhBcnIuaW5kZXhPZignanAnKSE9IC0xKSBzZXRDdXJyZW50TGFuZygnanAnLCBsYW5nTGlzdHMpO1xuXG4gICAgZWxzZSBzZXRDdXJyZW50TGFuZygnZW4nLCBsYW5nTGlzdHMpO1xuICAgICAgICBcbiAgICBsYW5nTGlzdHMuZm9yRWFjaChsaXN0ID0+IHtcblxuICAgICAgICBsaXN0Lm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBsZXQgYXJyID0gZS5wYXRoO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaTwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFycltpXS50YWdOYW1lID09PSAnTEknKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpc3QuY2xhc3NMaXN0LnRvZ2dsZSgnbGFuZ3VhZ2UtbGlzdC0tY3VycmVudCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN1cnJlbnQgPSBsaXN0LnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LWxhbmcnKTtcbiAgICAgICAgY3VycmVudC5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbGlzdC5jbGFzc0xpc3QudG9nZ2xlKCdsYW5ndWFnZS1saXN0LS1jdXJyZW50Jyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHNldEN1cnJlbnRMYW5nKGxhbmcsIGFycikge1xuICAgICAgICBhcnIuZm9yRWFjaChsID0+IHtcbiAgICAgICAgICAgIGwucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtbGFuZycpLmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQtbGFuZycpXG4gICAgICAgICAgICBsLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWxnPScgKyAgbGFuZyArJ10nKS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LWxhbmcnKVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG4gICAgLy8gICAgICAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICAgLy8gICAgICAjIyMjIyAgIFBPUC1VUCAgICMjIyMjXG4gICAgLy8gICAgICAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICAgLy8gbGV0IHBvcFVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcC11cCcpO1xuICAgIC8vIGxldCBwb3BVcE9yZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcC11cC1vcmRlcicpO1xuXG4gICAgbGV0IGZvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZm9ybScpO1xuICAgIGZvcm1zLmZvckVhY2goZiA9PiB7XG4gICAgICAgIGxldCB0aGlzRm9ybSA9IGY7XG4gICAgICAgIGYub25zdWJtaXQgPSBmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gbmV3IEZvcm1EYXRhKGYpO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBhamF4KHVybCwgY2FsbGJhY2ssIG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgeGhyLm9wZW4oJ1BPU1QnLCB1cmwpO1xuICAgICAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IDQgJiYgdGhpcy5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGFuayAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcC11cC10aGFuaycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dCAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wLXVwLWxheW91dCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcFVwICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wLXVwW3N0eWxlXScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGFuay5zdHlsZS52aXNpYmlsaXR5ID0gJ2luaGVyaXQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9wVXAucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYW5rLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB4aHIuc2VuZChtZXNzYWdlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIGFqYXgoJy9zdWJzY3JpYmUnLGZ1bmN0aW9uKCkge30sIG1lc3NhZ2UpO1xuXG4gICAgICAgICAgICAvLyB2YXIgbWVzc2FnZSA9IHRoaXNGb3JtLnNlcmlhbGl6ZSgpO1xuICAgICAgICAgICAgLy8gJC5hamF4KHtcbiAgICAgICAgICAgIC8vICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAvLyAgICAgdXJsOiAnL3N1YnNjcmliZScsXG4gICAgICAgICAgICAvLyAgICAgZGF0YTogbWVzc2FnZSxcbiAgICAgICAgICAgIC8vICAgICBzdWNjZXNzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgbGV0IHRoYW5rICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9wLXVwLXRoYW5rJyk7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBsYXlvdXQgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcC11cC1sYXlvdXQnKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgbGV0IHBvcFVwICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wLXVwW3N0eWxlXScpO1xuICAgICAgICAgICAgLy8gICAgICAgICB0aGFuay5zdHlsZS52aXNpYmlsaXR5ID0gJ2luaGVyaXQnO1xuICAgICAgICAgICAgLy8gICAgICAgICBwb3BVcC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICAvLyAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBsYXlvdXQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgdGhhbmsucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgLy8gICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgIC8vICAgICB9LFxuICAgICAgICAgICAgLy8gICAgIGVycm9yOiAgZnVuY3Rpb24oeGhyLCBzdHIpe1xuICAgICAgICAgICAgLy8gICAgICAgICBhbGVydCgn0JLQvtC30L3QuNC60LvQsCDQvtGI0LjQsdC60LA6ICcgKyB4aHIucmVzcG9uc2VDb2RlKTtcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICBmdW5jdGlvbiBzaG93SGlkZShwb3BVcCkge1xuXG4gICAgICAgIGxldCBsYXlvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wLXVwLWxheW91dCcpO1xuICAgICAgICBsZXQgc3R5bGUgPSBsYXlvdXQuZ2V0QXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICBpZiAoc3R5bGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGxheW91dC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIHBvcFVwLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGF5b3V0LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgIHBvcFVwLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cblxuXG5cbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA5ODApIHtcbiAgICAgICAgbGV0IGlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0Jyk7XG4gICAgICAgIGlucHV0cy5mb3JFYWNoKGkgPT4ge1xuICAgICAgICAgICAgaS5yZW1vdmVBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJyk7XG4gICAgICAgICAgICBsZXQgbGFiZWwgPSBpLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICBpLm9uZm9jdXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsYWJlbC5jbGFzc0xpc3QuYWRkKCdwb3AtdXBfX2xhYmVsLWN1cnJlbnQnKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpLm9uYmx1ciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmIChpLnZhbHVlID09ICcnKSBsYWJlbC5jbGFzc0xpc3QucmVtb3ZlKCdwb3AtdXBfX2xhYmVsLWN1cnJlbnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gbGV0IGZvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZm9ybScpO1xuICAgIC8vIGlmIChmb3JtcykgZm9ybXMuZm9yRWFjaChmID0+IHtcbiAgICAvLyAgICAgbGV0IGJ0biA9IGYucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cInN1Ym1pdFwiXScpO1xuICAgIC8vICAgICBidG4ub25jbGljayA9IChidG4pID0+IHtcbiAgICAvLyAgICAgICAgIC8vIGJ0bi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vICAgICAgICAgbGV0IGRhdGEgPSB7fTtcbiAgICAvLyAgICAgICAgIGxldCBpbnB1dHMgPSBmLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWVdJyk7XG4gICAgLy8gICAgICAgICBpbnB1dHMuZm9yRWFjaChpID0+IHtcblxuICAgIC8vICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGkudmFsdWU7XG4gICAgLy8gICAgICAgICAgICAgbGV0IG5hbWUgPSBpLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuICAgIC8vICAgICAgICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPSAnJykgZGF0YVtgJHtuYW1lfWBdID0gKHZhbHVlKTtcblxuICAgIC8vICAgICAgICAgfSk7XG4gICAgLy8gICAgICAgICBkYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGF0YScsIGRhdGEpO1xuXG4gICAgLy8gICAgICAgICBmLm9uc3VibWl0ID0gKGYpID0+IHtcbiAgICAvLyAgICAgICAgICAgICBmLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gICAgICAgICAgICAgbGV0IHRoYW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcC11cC10aGFuaycpO1xuICAgIC8vICAgICAgICAgICAgIHRoYW5rLnN0eWxlLnZpc2liaWxpdHkgPSAnaW5oZXJpdCc7XG4gICAgLy8gICAgICAgICAgICAgbGV0IGxheW91dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3AtdXAtbGF5b3V0Jyk7XG4gICAgLy8gICAgICAgICAgICAgbGV0IHBvcFVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcC11cFtzdHlsZV0nKTtcbiAgICAvLyAgICAgICAgICAgICBwb3BVcC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgLy8gICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgbGF5b3V0LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhhbmsucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgIC8vICAgICAgICAgICAgIH0sIDIwMDApO1xuICAgIC8vICAgICAgICAgfTtcbiAgICAvLyAgICAgfTtcbiAgICAvLyB9KTtcblxuICAgIGxldCBwb3BVcEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9wLXVwLWJ1dHRvbicpO1xuICAgIHBvcFVwQnRucy5mb3JFYWNoKGJ0biA9PiB7XG5cbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbGV0IFxuICAgICAgICAgICAgICAgIGRlc3RlbmF0aW9uID0gYnRuLmdldEF0dHJpYnV0ZSgnZGF0YS1kZXN0ZW5hdGlvbicpLFxuICAgICAgICAgICAgICAgIHBvcFVwICAgICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGVzdGVuYXRpb24pLFxuICAgICAgICAgICAgICAgIGxheW91dCAgICAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcC11cC1sYXlvdXQnKSxcbiAgICAgICAgICAgICAgICBjbG9zZSAgICAgICA9IHBvcFVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3AtdXBfX2Nsb3NlJyk7XG5cbiAgICAgICAgICAgIHNob3dIaWRlKHBvcFVwKTtcbiAgICAgICAgICAgIGxheW91dC5vbmNsaWNrID0gZnVuY3Rpb24oKSB7IHNob3dIaWRlKHBvcFVwKTsgfVxuICAgICAgICAgICAgY2xvc2Uub25jbGljayA9IGZ1bmN0aW9uKCkgeyBzaG93SGlkZShwb3BVcCk7IH1cbiAgICAgICAgfSk7XG5cbiAgICB9KVxuXG4gICAgLy8gbGV0IGVhcmx5QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Vhcmx5LWFjY2VzcycpO1xuICAgIC8vIGVhcmx5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oYikge1xuICAgIC8vICAgICAvLyBiXG4gICAgLy8gICAgIHNob3dIaWRlKHBvcFVwKTtcblxuICAgIC8vICAgICBsZXQgbGF5b3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcC11cC1sYXlvdXQnKTtcbiAgICAvLyAgICAgbGF5b3V0Lm9uY2xpY2sgPSBzaG93SGlkZTtcblxuICAgIC8vICAgICBmdW5jdGlvbiBzaG93SGlkZSgpIHtcbiAgICAvLyAgICAgICAgIGxldCBsYXlvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wLXVwLWxheW91dCcpO1xuICAgIC8vICAgICAgICAgbGV0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgLy8gICAgICAgICBsZXQgY2xvc2UgPSBwb3BVcC5xdWVyeVNlbGVjdG9yKCcucG9wLXVwX19jbG9zZScpO1xuXG4gICAgLy8gICAgICAgICBsZXQgc3R5bGUgPSBsYXlvdXQuZ2V0QXR0cmlidXRlKCdzdHlsZScpO1xuICAgIC8vICAgICAgICAgaWYgKHN0eWxlID09PSBudWxsKSB7XG4gICAgLy8gICAgICAgICAgICAgbGF5b3V0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIC8vICAgICAgICAgICAgIHBvcFVwLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIC8vICAgICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgICAgICBsYXlvdXQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgIC8vICAgICAgICAgICAgIHBvcFVwLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAvLyAgICAgICAgIH1cblxuICAgIC8vICAgICAgICAgY2xvc2Uub25jbGljayA9IHNob3dIaWRlO1xuICAgIC8vICAgICB9XG4gICAgLy8gfSk7XG5cbiAgICAvLyAgICAgICMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgICAvLyAgICAgICMjIyMjIEFOSU1BVElPTlMgIyMjIyNcbiAgICAvLyAgICAgICMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuICAgIGRvY3VtZW50Lm9uc2Nyb2xsID0gZnVuY3Rpb24oKVxuXG4gICAge1xuICAgICAgICBsZXQgc2Nyb2xsZWQgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG5cbiAgICAgICAgbGV0IGNhcGFiaWxpdGllcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctY2FwYWJpbGl0aWVzJyk7XG4gICAgICAgIGlmIChzY3JvbGxlZCA+IDEyNTAgJiYgd2luZG93LmlubmVyV2lkdGggPj0gMTA4MCkge1xuICAgICAgICAgICAgY2FwYWJpbGl0aWVzLmNsYXNzTGlzdC5hZGQoJ25ldy1jYXBhYmlsaXRpZXMtLWFuaW1hdGVkJylcbiAgICAgICAgfSBlbHNlIGlmIChzY3JvbGxlZCA+IDI1MCkge1xuICAgICAgICAgICAgY2FwYWJpbGl0aWVzLmNsYXNzTGlzdC5hZGQoJ25ldy1jYXBhYmlsaXRpZXMtLWFuaW1hdGVkJylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vICAgICAgIyMjIyMjIyMjIyMjIyMjIyNcbiAgICAvLyAgICAgICMjIyMjIFZJREVPICMjIyMjXG4gICAgLy8gICAgICAjIyMjIyMjIyMjIyMjIyMjI1xuXG4gICAgbGV0IHZpZGVvQmxvY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnZpZGVvLWJsb2NrJyk7XG4gICAgdmlkZW9CbG9ja3MuZm9yRWFjaChiID0+IHtcbiAgICAgICAgbGV0IHZpZGVvID0gYi5xdWVyeVNlbGVjdG9yKCd2aWRlbycpO1xuICAgICAgICBsZXQgZnVsbHNjcmVlbiA9IGIucXVlcnlTZWxlY3RvcignLnZpZGVvLWZ1bGxzY3JlZW4nKTtcbiAgICAgICAgbGV0IHBsYXlCdXR0b24gPSBiLnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1wbGF5Jyk7XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbkhlYWRlciA9IGIucXVlcnlTZWxlY3RvcignLnZpZGVvLWRlc2NyaXB0aW9uIGgzJylcbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uUGFyYWdyYXBoID0gYi5xdWVyeVNlbGVjdG9yKCcudmlkZW8tZGVzY3JpcHRpb24gcCcpO1xuXG4gICAgICAgIGlmKHdpbmRvdy5jbGllbnRIZWlndGggPiA5ODApIHtcbiAgICAgICAgICAgIHZpZGVvLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwbGF5UGF1c2UodmlkZW8sIHBsYXlCdXR0b24pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBsYXlCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcGxheVBhdXNlKHZpZGVvLCBwbGF5QnV0dG9uKTtcbiAgICAgICAgfTtcblxuICAgICAgICBmdWxsc2NyZWVuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRvZ2dsZUZ1bGxTY3JlZW4odmlkZW9CbG9jayk7XG5cbiAgICAgICAgfTtcbiAgICAgICAgdmlkZW8ub25kYmxjbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdG9nZ2xlRnVsbFNjcmVlbih2aWRlb0Jsb2NrKTtcbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBwbGF5UGF1c2UodmlkZW8sIHBsYXlCdXR0b24pIHtcbiAgICAgICAgICAgIGlmICh2aWRlby5wYXVzZWQpIHtcbiAgICAgICAgICAgICAgICB2aWRlby5wYXJlbnROb2RlLnNldEF0dHJpYnV0ZSgnZGF0YS1zdGF0dXMnLCAncGxheScpO1xuICAgICAgICAgICAgICAgIHZpZGVvLnBsYXkoKTtcbiAgICAgICAgICAgICAgICBwbGF5QnV0dG9uLnN0eWxlLnpJbmRleCA9ICctMSc7XG4gICAgICAgICAgICAgICAgdmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoc2hvd1RleHQsIDEwMDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2aWRlby5wYXJlbnROb2RlLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zdGF0dXMnKVxuICAgICAgICAgICAgICAgIHZpZGVvLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgcGxheUJ1dHRvbi5zdHlsZS56SW5kZXggPSAnMSc7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzaG93VGV4dCgpIHtcblxuICAgICAgICAgICAgLy8gaWYgKHZpZGVvLmN1cnJlbnRUaW1lID4gMykge1xuICAgICAgICAgICAgLy8gICAgIGRlc2NyaXB0aW9uSGVhZGVyLmlubmVySFRNTCA9ICdUZXN0IDInO1xuICAgICAgICAgICAgLy8gICAgIGRlc2NyaXB0aW9uUGFyYWdyYXBoLmlubmVySFRNTCA9ICdTZWNvbmQgbGluZSdcbiAgICAgICAgICAgIC8vIH0gZWxzZSBpZiAodmlkZW8uY3VycmVudFRpbWUgPiAxKSB7XG4gICAgICAgICAgICAvLyAgICAgZGVzY3JpcHRpb25IZWFkZXIuaW5uZXJIVE1MID0gJ1Rlc3QnO1xuICAgICAgICAgICAgLy8gICAgIGRlc2NyaXB0aW9uUGFyYWdyYXBoLmlubmVySFRNTCA9ICdGaXJzdCBsaW5lJ1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiB0b2dnbGVGdWxsU2NyZWVuKGVsZW0pIHtcbiAgICAgICAgaWYgKCFlbGVtLmZ1bGxzY3JlZW5FbGVtZW50ICYmIC8vIGFsdGVybmF0aXZlIHN0YW5kYXJkIG1ldGhvZFxuICAgICAgICAgICAgIWVsZW0ubW96RnVsbFNjcmVlbkVsZW1lbnQgJiYgIWRvY3VtZW50LndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50KSB7IC8vIGN1cnJlbnQgd29ya2luZyBtZXRob2RzXG4gICAgICAgICAgICBpZiAoZWxlbS5yZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgICAgIGVsZW0ucmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxlbS5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgICAgICAgICAgIGVsZW0ubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxlbS53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgICAgIGVsZW0ud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oRWxlbWVudC5BTExPV19LRVlCT0FSRF9JTlBVVCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW8td3JhcHBlcicpLnN0eWxlLm1heFdpZHRoID0gJzEwMCUnO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuY2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmNhbmNlbEZ1bGxTY3JlZW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQud2Via2l0Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LndlYmtpdENhbmNlbEZ1bGxTY3JlZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlby13cmFwcGVyJykucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8vICAgICAgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgICAvLyAgICAgICMjIyMjIERFU0NSSVBUSU9OIFBPSU5UUyAjIyMjXG4gICAgLy8gICAgICAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4gICAgbGV0IGRlc2NyaXB0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZXNjcmlwdGlvbicpO1xuICAgIGRlc2NyaXB0aW9ucy5mb3JFYWNoKGQgPT4ge1xuXG4gICAgICAgIGxldCBwb2ludHMgPSBkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZXNjcmlwdGlvbl9fcG9pbnQnKTtcbiAgICAgICAgcG9pbnRzLmZvckVhY2gocCA9PiB7XG5cbiAgICAgICAgICAgIGxldCBkZXN0aW5hdGlvbiA9IHAuZ2V0QXR0cmlidXRlKCdkYXRhLWRlc3RpbmF0aW9uJyk7XG4gICAgICAgICAgICBsZXQgY3VycmVudFBhcmFncmFwaCA9IGQucXVlcnlTZWxlY3RvcihgW2RhdGEtcG9pbnQ9XCIke2Rlc3RpbmF0aW9ufVwiXWApO1xuXG4gICAgICAgICAgICBwLm9ubW91c2VvdmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQYXJhZ3JhcGguY2xhc3NMaXN0LmFkZCgnZGVzY3JpcHRpb25fX3BhcmFncmFwaC0tY3VycmVudCcpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHAub25tb3VzZW91dCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UGFyYWdyYXBoLmNsYXNzTGlzdC5yZW1vdmUoJ2Rlc2NyaXB0aW9uX19wYXJhZ3JhcGgtLWN1cnJlbnQnKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjdXJyZW50UGFyYWdyYXBoLm9ubW91c2VvdmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHAuY2xhc3NMaXN0LmFkZCgnZGVzY3JpcHRpb25fX3BvaW50LS1ob3ZlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudFBhcmFncmFwaC5vbm1vdXNlb3V0ID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHAuY2xhc3NMaXN0LnJlbW92ZSgnZGVzY3JpcHRpb25fX3BvaW50LS1ob3ZlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuXG5cblxuICAgIHdpbmRvdy5vbnNjcm9sbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgc2Nyb2xsZWQgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuc2Nyb2xsVG9wO1xuXG4gICAgICAgIGxldCBkZXNjcmlwdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGVzY3JpcHRpb24nKTtcbiAgICAgICAgZGVzY3JpcHRpb25zLmZvckVhY2goZCA9PiB7XG5cbiAgICAgICAgICAgIGxldCB5ID0gZC5vZmZzZXRUb3A7XG4gICAgICAgICAgICBpZiAoc2Nyb2xsZWQgPD0geSArIDEwICYmIHNjcm9sbGVkID4geSkge1xuICAgICAgICAgICAgICAgIHBvaW50QWN0aXZhdGlvbihkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG59KTtcblxuZnVuY3Rpb24gcG9pbnRBY3RpdmF0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgbGV0IHBvaW50cyA9IGRlc2NyaXB0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZXNjcmlwdGlvbl9fcG9pbnQnKTtcbiAgICBsZXQgcGFyYWdyYXBocyA9IGRlc2NyaXB0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZXNjcmlwdGlvbl9fcGFyYWdyYXBoJyk7XG4gICAgbGV0IHkgPSBkZXNjcmlwdGlvbi5vZmZzZXRUb3A7XG5cbiAgICBsZXQgc2Nyb2xsZWQgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuc2Nyb2xsVG9wO1xuXG5cbiAgICBsZXQgaSA9IDA7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uIHJ1bigpIHtcbiAgICAgICAgcG9pbnRzLmZvckVhY2gocCA9PiBwLmNsYXNzTGlzdC5yZW1vdmUoJ2Rlc2NyaXB0aW9uX19wb2ludC0taG92ZXInKSk7XG4gICAgICAgIHBhcmFncmFwaHMuZm9yRWFjaChwID0+IHAuY2xhc3NMaXN0LnJlbW92ZSgnZGVzY3JpcHRpb25fX3BhcmFncmFwaC0tY3VycmVudCcpKTtcblxuICAgICAgICBwb2ludHNbaV0uY2xhc3NMaXN0LmFkZCgnZGVzY3JpcHRpb25fX3BvaW50LS1ob3ZlcicpO1xuICAgICAgICBwYXJhZ3JhcGhzW2ldLmNsYXNzTGlzdC5hZGQoJ2Rlc2NyaXB0aW9uX19wYXJhZ3JhcGgtLWN1cnJlbnQnKTtcbiAgICAgICAgaSsrO1xuICAgICAgICBpZiAoaSA8IHBvaW50cy5sZW5ndGgpIHNldFRpbWVvdXQocnVuLCAxMDAwKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHBvaW50cy5mb3JFYWNoKHAgPT4gcC5jbGFzc0xpc3QucmVtb3ZlKCdkZXNjcmlwdGlvbl9fcG9pbnQtLWhvdmVyJykpO1xuICAgICAgICAgICAgICAgIHBhcmFncmFwaHMuZm9yRWFjaChwID0+IHAuY2xhc3NMaXN0LnJlbW92ZSgnZGVzY3JpcHRpb25fX3BhcmFncmFwaC0tY3VycmVudCcpKTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9XG5cbiAgICB9LCAxMDApO1xuXG5cblxuXG59Il0sImZpbGUiOiJtYWluLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
