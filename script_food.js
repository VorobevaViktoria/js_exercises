"use strict";
window.addEventListener('DOMContentLoaded', () => {

    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabsContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabsContent(0);

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabsContent(i);
                }
            });
        }
    });

    // Timer
    const deadline = '2020-10-20';

    function getTimeRemaining(endtime) {
        const remainder = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(remainder / (1000 * 60 * 60 * 24)),
            hours = Math.floor((remainder / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((remainder / (1000 * 60)) % 60),
            seconds = Math.floor((remainder / 1000) % 60);

        return {
            'total': remainder,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num > 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }

    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        updateClock(); // чтобы не было мигания верстки

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // Modal 
    const modal = document.querySelector('.modal'),
        openModal = document.querySelectorAll('[data-modal]');
    // modalCloseBtn = document.querySelector('[data-close]');

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
        clearInterval(timeModal);
    }

    function showModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    // modalCloseBtn.addEventListener('click', closeModal);
    openModal.forEach(btn => {
        btn.addEventListener('click', showModal);
    });

    modal.addEventListener('click', (e) => {
        // if (e.target === modal) {closeModal();}
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const timeModal = setTimeout(showModal, 50000);

    window.addEventListener('scroll', showModalByScroll);

    // Menu cards  
    class MenuCards {
        constructor(img, alt, title, description, price, parent, ...classes) {
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.transfer = 27;
            this.classes = classes;
            this.parent = document.querySelector(parent);
            this.changeCurrency();
        }
        changeCurrency() {
            this.price = this.price * this.transfer;
        }
        creationCard() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className =>
                    element.classList.add(className));

            }
            element.innerHTML = `
                <img src="${this.img}" alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3> 
                <div class="menu__item-descr">${this.description}</div> 
                <div class="menu__item-divider"></div> 
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div> 
                    <div class="menu__item-total"><span>${this.price}</span>грн/день</div> 
                </div> 
            `;
            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCards(img, altimg, title, descr, price, '.menu .container').creationCard();
            });
        });



    // getResource('http://localhost:3000/menu')
    //     .then(data =>  {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCards(img, altimg, title, descr, price, '.menu .container').creationCard();
    //         });
    //     });

    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');

    //         element.innerHTML = `
    //             <img src="${img}" alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3> 
    //             <div class="menu__item-descr">${descr}</div> 
    //             <div class="menu__item-divider"></div> 
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div> 
    //                 <div class="menu__item-total"><span>${price*27}</span>грн/день</div> 
    //             </div> 
    //         `;

    //     document.querySelector('.menu .container').append(element);
    //     });
    // }



    // Form
    const forms = document.querySelectorAll('form');

    const message = {
        // loading: 'Загрузка',
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // const statusMessage = document.createElement('div');
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            // statusMessage.textContent = message.loading;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        showModal();

        const thankModal = document.createElement('div');
        thankModal.classList.add('modal__dialog');
        thankModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title"> ${message} </div>
            </div>
        `;

        document.querySelector('.modal').append(thankModal);
        setTimeout(() => {
            thankModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    // Slider 
    const numberOfSlides = document.querySelectorAll('.offer__slide'),
        prevSlide = document.querySelector('.offer__slider-prev'),
        nextSlide = document.querySelector('.offer__slider-next'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        totalSlide = document.querySelector('#total'),
        currentNumber = document.querySelector('#current'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

    let currentSlide = 1,
        offset = 0;

    totalSlide.textContent = getZero(numberOfSlides.length);
    currentNumber.textContent = getZero(currentSlide);

    slidesField.style.width = numberOfSlides.length * 100 + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';
    numberOfSlides.forEach(slide => {
        slide.style.width = width;
    });


    nextSlide.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (numberOfSlides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (currentSlide == numberOfSlides.length) {
            currentSlide = 1;
        } else {
            currentSlide++;
        }
        currentNumber.textContent = getZero(currentSlide);
    });

    prevSlide.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (numberOfSlides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (currentSlide == 1) {
            currentSlide = numberOfSlides.length;
        } else {
            currentSlide--;
        }
        currentNumber.textContent = getZero(currentSlide);
    });
});