"use strict";

const QUESTION_MOVIE = 'Один из последних просмотренных фильмов?';
const QUESTION_RATING = 'На сколько оцените его?';
const QUESTION_NUMBER_OF_FILMS = 'Сколько фильмов вы уже посмотрели?';

function start() {
    let numberOfFilms = '';

    do {
        numberOfFilms = prompt(QUESTION_NUMBER_OF_FILMS, '');
    }
    while (numberOfFilms === '' || numberOfFilms == null || isNaN(numberOfFilms));

    return numberOfFilms;
}

function rememberMyFilms(database) {
    const movie = [];
    const rating = [];

    for (let i = 0; i <= 1; i++) {
        movie[i] = prompt(QUESTION_MOVIE, '');
        rating[i] = +prompt(QUESTION_RATING, '');

        if (movie[i] != '' && movie[i] != null && movie[i].length < 50 && rating[i] != 0 && rating[i] != null) {
            database.movies[movie[i]] = rating[i];
        } else {
            i--;
        }
    }
}

function detectPersonalLevel(database) {
    if (database.count < 10) {
        alert('Просмотрено довольно мало фильмов');
    } else if (database.count <= 30) {
        alert('Вы классический зритель');
    } else if (database.count > 30) {
        alert('Вы киноман');
    } else {
        alert('Произошла ошибка');
    }
}

function showMyDB(database) {
    if (!database.private) {
        console.log(database);
    }
}

function writeYourGenres(database) {
    for (let i = 0; i < 3; i++) {
        database.genres[i] = prompt(`Ваш любимый жанр под номером ${i+1}?`, '');
    }
}

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    private: false
};

personalMovieDB.count = +start();
rememberMyFilms(personalMovieDB);
detectPersonalLevel(personalMovieDB);
showMyDB(personalMovieDB);
writeYourGenres(personalMovieDB);