"use strict";

// oggetto
const movie = {
  title: 'Forrest Gump',
  genre: 'Drama',
  duration: 142
};

console.log(movie.title);

// funzione costruttore
function Movie(title, genre, duration) {
  this.title = title;
  this.genre = genre;
  this.duration = duration;
  this.isLong = () => this.duration > 120; // metodo
}

let forrest = new Movie("Forrest Gump", "Drama", 142);
console.log(forrest.isLong());
