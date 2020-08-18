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

const movie1 = prompt(QUESTION_MOVIE, ''),
    rating1 = +prompt(QUESTION_RATING, ''),
    movie2 = prompt(QUESTION_MOVIE, ''),
    rating2 = +prompt(QUESTION_RATING, '');

personalMovieDB.movies = {
    [movie1]: rating1,
    [movie2]: rating2
};

console.log(personalMovieDB);