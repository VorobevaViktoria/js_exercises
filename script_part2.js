"use strict";

const QUESTION_MOVIE = 'Один из последних просмотренных фильмов?';
const QUESTION_RATING = 'На сколько оцените его?';

const numberofFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');

const personalMovieDB = {
    count: numberofFilms,
    movies: {},
    actors: {},
    genres: [],
    private: false
};

const movie = [];
const rating = [];

// first way
for (let i = 0; i <= 1; i++) {
    movie[i] = prompt(QUESTION_MOVIE, '');
    rating[i] = +prompt(QUESTION_RATING, '');

    if (movie[i] != '' && movie[i] != null && movie[i].length < 50 && rating[i] != 0 && rating[i] != null) {
        personalMovieDB.movies[movie[i]] = rating[i];
    } else {
        i--;
    }
}

// second way 
// let answersCount = 0;

// do {
//     movie[answersCount] = prompt(QUESTION_MOVIE, '');
//     rating[answersCount] = +prompt(QUESTION_RATING, '');

//     if (movie[answersCount] != '' && movie[answersCount] != null && movie[answersCount].length < 50 && rating[answersCount] != 0 && 
//             rating[answersCount] != null) {
//         personalMovieDB.movies[movie[answersCount]] = rating[answersCount];
//         answersCount++;
//     }
// }
// while (answersCount < 2);

// third way
// let answersCount = 0;
// while (answersCount <= 1) {
//     movie[answersCount] = prompt(QUESTION_MOVIE, '');
//     rating[answersCount] = +prompt(QUESTION_RATING, '');

//     if (movie[answersCount] != '' && movie[answersCount] != null && movie[answersCount].length < 50 && 
//             rating[answersCount] != 0 && rating[answersCount] != null) {
//         personalMovieDB.movies[movie[answersCount]] = rating[answersCount];
//         answersCount++;
//     }
// }

if (personalMovieDB.count < 10) {
    alert('Просмотрено довольно мало фильмов');
} else if (personalMovieDB.count <= 30) {
    alert('Вы классический зритель');
} else if (personalMovieDB.count > 30) {
    alert('Вы киноман');
} else {
    alert('Произошла ошибка');
}

// console.log(personalMovieDB);