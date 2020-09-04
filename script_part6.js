"use strict";

function lengthNameMovie(movie) {
    if (movie.length > 21) {
        movie = `${movie.slice(0, 21)}...`;
    }
    return movie;
}

function rebuildMovieList(database, interactiveList) {
    interactiveList.innerHTML = '';
    database.sort();

    database.forEach((movie, i) => {
        movie = lengthNameMovie(movie);
        interactiveList.innerHTML += `
        <li class="promo__interactive-item">${i+1}. ${movie}
            <div class="delete"></div>
        </li>
        `;
    });

    document.querySelectorAll('.delete').forEach((button, i) => {
        button.addEventListener('click', () => {
            button.parentElement.remove();
            database.splice(i, 1);
            rebuildMovieList(database, interactiveList);
        });
    });
}

function addMovieEventListener(event, movieAdd, favoriteMovie, movieDB, interactiveList, form) {
    event.preventDefault();

    const film = movieAdd.value,
        favorite = favoriteMovie.checked;

    if (film) {
        movieDB.movies.push(film);
        movieDB.movies.sort();
        rebuildMovieList(movieDB.movies, interactiveList);

        if (favorite) {
            console.log('Добавляем любимый фильм');
        }

        form.reset();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const advertising = document.querySelectorAll('.promo__adv img'),
        genre = document.querySelector('.promo__genre'),
        bg = document.querySelector('.promo__bg'),
        interactiveList = document.querySelector('.promo__interactive-list'),
        form = document.querySelector('.add'),
        movieAdd = form.querySelector('.adding__input'),
        favoriteMovie = form.querySelector('[type = "checkbox"]');
   
    const movieDB = {
        movies: [
           "Логан",
           "Лига справедливости",
           "Ла-ла лэнд",
           "Одержимость",
           "Скотт Пилигрим против всех"
        ]
    };

    form.addEventListener('submit', event => {
        addMovieEventListener(event, movieAdd, favoriteMovie, movieDB, interactiveList, form);
    });

    advertising.forEach(item => {
        item.remove();
    });

    genre.textContent = 'ДРАМА';

    bg.style.backgroundImage = 'url("img/bg.jpg")';

    rebuildMovieList(movieDB.movies, interactiveList);
});

