"use strict";

const QUESTION_MOVIE = 'Один из последних просмотренных фильмов?';
const QUESTION_RATING = 'На сколько оцените его?';
const QUESTION_NUMBER_OF_FILMS = 'Сколько фильмов вы уже посмотрели?';

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    private: false,
    start: function() {
        do {
            personalMovieDB.count = prompt(QUESTION_NUMBER_OF_FILMS, '');
        }
        while (personalMovieDB.count === '' || personalMovieDB.count == null || isNaN(personalMovieDB.count));
        personalMovieDB.count = +personalMovieDB.count;
    },
    rememberMyFilms: function() {
        const movie = [];
        const rating = [];

        for (let i = 0; i <= 1; i++) {
            movie[i] = prompt(QUESTION_MOVIE, '');
            rating[i] = prompt(QUESTION_RATING, '');

            if (movie[i] != '' && movie[i] != null && movie[i].length < 50 && rating[i] != '' && 
                    rating[i] != null) {
                personalMovieDB.movies[movie[i]] = rating[i];
            } else {
                i--;
            }
        }
    },
    detectPersonalLevel: function() {
        if (personalMovieDB.count < 10) {
            alert('Просмотрено довольно мало фильмов');
        } else if (personalMovieDB.count <= 30) {
            alert('Вы классический зритель');
        } else if (personalMovieDB.count > 30) {
            alert('Вы киноман');
        } else {
            alert('Произошла ошибка');
        }
    },
    showMyDB: function() {
        if (!personalMovieDB.private) {
            console.log(personalMovieDB);
        }
    },
    writeYourGenres: function() {
        for (let i = 0; i < 3; i++) {
            personalMovieDB.genres[i] = prompt(`Ваш любимый жанр под номером ${i+1}?`, '');
            if (personalMovieDB.genres[i] == '' || personalMovieDB.genres[i] == null) {
                i--;
            }
        }
        personalMovieDB.genres.forEach((item, i) => {
            console.log(`Любимый жанр #${i+1} - это ${item}`);
        });
    },
    toggleDBVisibility: function() {
        personalMovieDB.private = !personalMovieDB.private;
    }
};

personalMovieDB.start();
personalMovieDB.rememberMyFilms();
personalMovieDB.detectPersonalLevel();
personalMovieDB.showMyDB();
personalMovieDB.writeYourGenres();
personalMovieDB.toggleDBVisibility();