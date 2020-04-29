import { Component, OnInit } from '@angular/core';

import { Movie } from '../movie';
import{ Director } from '../director';
import { Studio } from '../studio';
import { Actor } from '../actor';
import { Genre } from '../genre';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movie[];
  directors: Director[];
  studios: Studio[];
  actors: Actor[];
  genres: Genre[];

  selectedMovie: Movie;
  directorInfo: Director; // director of selectedMovie, if  existing (otherwise selectedMovie.director_id does not tell us the director name)
  studioInfo: Studio;
  actorsInfo: Actor[];
  genresInfo: Genre[];

  onSelect(movie: Movie): void {
    this.selectedMovie = movie;
    this.getDirectorInformation();
    this.getStudioInformation();
    this.getActorsInformation();
    this.getGenresInformation();
  }
  selectNone(): void {
    this.selectedMovie = null;
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe(movies => this.movies = movies); // waits for the observable movieService.getMovies()
  }

  //updateSelectedMovie(): void {
  //  this.movieService.getMovie(this.selectedMovie.id)
  //    .subscribe(movie => this.selectedMovie = movie[0]);
  //  this.getDirectorInformation();
  //  this.getStudioInformation();
  //  this.getActorsInformation();
  //  this.getGenresInformation();
  //}

  getDirectorInformation(): void {
    this.directorInfo = { // we need to "clean" the variable (otherwise the template may not update this value when we select a movie with no director)
      id: -1,
      name: ''
    };
    this.movieService.getDirectorInformation(this.selectedMovie.id)
      .subscribe(directorInfo => {
        if(directorInfo.length != 0)
          this.directorInfo = directorInfo[0];
        });
  }

  getStudioInformation(): void {
    this.studioInfo = {
      id: -1,
      name: ''
    };
    this.movieService.getStudioInformation(this.selectedMovie.id)
      .subscribe(studioInfo => {
        if(studioInfo.length != 0)
         this.studioInfo = studioInfo[0];
        });
  }

  getActorsInformation(): void {
    this.actorsInfo = [];
    this.movieService.getActorsInformation(this.selectedMovie.id)
      .subscribe(actorsInfo =>  this.actorsInfo = actorsInfo); // this time, no "[0]" because we have indeed an array of row results 
  }

  getGenresInformation(): void {
    this.genresInfo = [];
    this.movieService.getGenresInformation(this.selectedMovie.id)
      .subscribe(genresInfo =>  this.genresInfo = genresInfo); // this time, no "[0]" because we have indeed an array of row results 
  }

  getDirectors(): void {
    this.movieService.getDirectors().subscribe(directors => this.directors = directors); // waits for the observable movieService.getMovies()
  }

  getStudios(): void {
    this.movieService.getStudios().subscribe(studios => this.studios = studios); // waits for the observable movieService.getMovies()
  }

  getActors(): void {
    this.movieService.getActors().subscribe(actors => this.actors = actors); // waits for the observable movieService.getMovies()
  }

  getGenres(): void {
    this.movieService.getGenres().subscribe(genres => this.genres = genres); // waits for the observable movieService.getMovies()
  }

  delete(movie: Movie): void {
    this.movieService.deleteMovie(movie).subscribe();
    this.movies = this.movies.filter(m => m !== movie); // this.movies won't refresh
  }
 
  // when MovieInsertion adds data to or removes data from the database, we'll tell the main view to refresh the lists actors, directors etc :
  refreshAll(value: boolean): void {
    this.getMovies();
    this.getDirectors();
    this.getStudios();
    this.getActors();
    this.getGenres();

    this.getDirectorInformation();
    this.getStudioInformation();
    this.getActorsInformation();
    this.getGenresInformation();
  }

  filterMovies(query: string) {
    this.movieService.searchMovies(query).subscribe(filteredMovies => this.movies = filteredMovies);
    this.selectNone();
  }

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMovies(); // so as getMovies() is called after the construction of a MoviesComponent instance 
    this.getDirectors();
    this.getStudios();
    this.getActors();
    this.getGenres();
  }

}
