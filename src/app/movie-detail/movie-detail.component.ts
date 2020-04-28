import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../movie';
import{ Director } from '../director';
import { Studio } from '../studio';
import { Actor } from '../actor';
import { Genre } from '../genre';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MovieService }  from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})

export class MovieDetailComponent implements OnInit {

  @Input() movie: Movie;
  @Input() directorInfo: Director;
  @Input() studioInfo: Studio;
  @Input() actorsInfo: Actor[];
  @Input() directors: Director[];
  @Input() studios: Studio[];
  @Input() actors: Actor[];
  @Input() genres: Genre[];

  constructor(private route: ActivatedRoute, private movieService: MovieService, private location: Location) {}

  ngOnInit(): void {

  }
  
  getMovie(): void {
    const id = +this.route.snapshot.paramMap.get('id'); // + -> conversion to number type
    this.movieService.getMovie(id)
      .subscribe(movie => this.movie = movie);
  }

  save(): void {
    this.movieService.updateMovie(this.movie)
      .subscribe(); //.subscribe(() => this.goBack());
  }

  registerDirector(selectedDirectorID: string): void {
    const id= +selectedDirectorID;
    let movieAndDirector : {movie:number, director:number} = {
      movie: this.movie.id,
      director: +selectedDirectorID
    }
    this.movieService.associateMovieDirector(movieAndDirector)
      .subscribe();
  }

  registerStudio(selectedStudioID: string): void {
    const id= +selectedStudioID;
    let movieAndStudio : {movie:number, studio:number} = {
      movie: this.movie.id,
      studio: +selectedStudioID
    }
    this.movieService.associateMovieStudio(movieAndStudio)
      .subscribe();
  }

  registerActor(selectedActorID: string): void {
    const id= +selectedActorID;
    let movieAndActor : {movie:number, actor:number} = {
      movie: this.movie.id,
      actor: +selectedActorID
    }
    this.movieService.associateMovieActor(movieAndActor)
      .subscribe();
  }

  registerGenre(selectedGenreID: string): void {
    const id= +selectedGenreID;
    let movieAndGenre : {movie:number, genre:number} = {
      movie: this.movie.id,
      genre: +selectedGenreID
    }
    this.movieService.associateMovieGenre(movieAndGenre)
      .subscribe();
  }

}
