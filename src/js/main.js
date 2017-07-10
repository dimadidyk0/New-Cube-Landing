
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

