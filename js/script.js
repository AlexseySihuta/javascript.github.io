'use strict'

document.addEventListener('DOMContentLoaded', () => {

    //Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsPerent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsPerent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //Timer

    const deadLine = '2022-05-30';

    function getTimerRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / (1000 * 60) % 60)),
              seconds = Math.floor((t / 1000 % 60));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endTime) {
        const time = document.querySelector(selector),
              days = time.querySelector('#days'),
              hours = time.querySelector('#hours'),
              minutes = time.querySelector('#minutes'),
              seconds = time.querySelector('#seconds'),
              timeinterval = setInterval(upDateClock, 1000);

        upDateClock();

        function upDateClock() {
            const t = getTimerRemaining(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML =getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }
    }

    setClock('.timer', deadLine);

    //slider

    const buttonNext = document.querySelector('.offer__slider-next'),
          buttonPrev = document.querySelector('.offer__slider-prev'),
          showNumberPhoto = document.querySelector('#current'),
          photoOffer = document.querySelectorAll('.offer__slide');
    let visibleImage = 0;

    function hiddenPhotOffer() {
        photoOffer.forEach(item => {
            item.classList.remove('show')
            item.classList.add('hide')
        })
    }

    function showPhotoOffer() {
        photoOffer[visibleImage].classList.remove('hide')
        photoOffer[visibleImage].classList.add('show')
    }

    hiddenPhotOffer()
    showPhotoOffer()

    function nextPhotoOffer() {
        showNumberPhoto.innerHTML = `0${visibleImage + 1}`
        visibleImage++;
        photoOffer.forEach((item) => {
            item.classList.remove('show')
        })
        hiddenPhotOffer()
        if (visibleImage > 3) {
            visibleImage = 0
        }
        photoOffer[visibleImage].classList.remove('hide')
        photoOffer[visibleImage].classList.add('show')

    }

    function prevPhotoOffer() {
        showNumberPhoto.innerHTML = `0${visibleImage + 1}`
        visibleImage--;
        photoOffer.forEach((item) => {
            item.classList.remove('show')
        })
        hiddenPhotOffer()
        if (visibleImage < 0) {
            visibleImage = 3
        }
        photoOffer[visibleImage].classList.remove('hide')
        photoOffer[visibleImage].classList.add('show')

    }

    buttonNext.addEventListener('click', nextPhotoOffer)
    buttonPrev.addEventListener('click', prevPhotoOffer)

    // modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modalWindow = document.querySelector('.modal'),
          modal__close = document.querySelector('[data-close]');

    function openModal() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');

        document.body.style.overflow = 'hidden';

        clearInterval(setTimeoutId);
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show');

        document.body.style.overflow = '';
    }

    modal__close.addEventListener('click', closeModal);

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalWindow.classList.contains('show')) {
            closeModal();
        }
    });

    const setTimeoutId = setInterval(openModal, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();

            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
})