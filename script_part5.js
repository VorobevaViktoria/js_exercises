"use strict";

const advertising = document.querySelectorAll('.promo__adv img'),
    genre = document.querySelector('.promo__genre'),
    bg = document.querySelector('.promo__bg'),
    interactiveList = document.querySelector('.promo__interactive-list');
const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против.."
    ]
};

advertising.forEach(item => {
    item.remove();
});

genre.textContent = 'ДРАМА';

bg.style.backgroundImage = 'url("img/bg.jpg")';

movieDB.movies.sort();

interactiveList.innerHTML = '';

movieDB.movies.forEach((movie, i) => {
    interactiveList.innerHTML += `
        <li class="promo__interactive-item">${i+1}. ${movie}
            <div class="delete"></div>
        </li>
        `;
});
