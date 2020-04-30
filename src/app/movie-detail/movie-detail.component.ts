import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Movie } from '../movie';
import{ Director } from '../director';
import { Studio } from '../studio';
import { Actor } from '../actor';
import { Genre } from '../genre';

//import { ActivatedRoute } from '@angular/router';
//import { Location } from '@angular/common';

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
  @Input() genresInfo: Genre[];
  @Input() directors: Director[];
  @Input() studios: Studio[];
  @Input() actors: Actor[];
  @Input() genres: Genre[];

  @Output() updateDisplayedInfo2 = new EventEmitter<boolean>();

  constructor(private movieService: MovieService) {}
  
  save(): void {
    this.movieService.updateMovie(this.movie)
      .subscribe();
  }

  registerDirector(selectedDirectorID: string): void {
    const id= +selectedDirectorID;
    let movieAndDirector : {movie:number, director:number} = {
      movie: this.movie.id,
      director: +selectedDirectorID
    }
    this.movieService.associateMovieDirector(movieAndDirector)
      .subscribe(result => {
        this.updateDisplayedInfo2.emit(true);
      });
  }

  registerStudio(selectedStudioID: string): void {
    const id= +selectedStudioID;
    let movieAndStudio : {movie:number, studio:number} = {
      movie: this.movie.id,
      studio: +selectedStudioID
    }
    this.movieService.associateMovieStudio(movieAndStudio)
      .subscribe(result => {
        this.updateDisplayedInfo2.emit(true);
      });
  }

  registerActor(selectedActorID: string): void {
    let movieAndActor : {movie:number, actor:number} = {
      movie: this.movie.id,
      actor: +selectedActorID
    }
    this.movieService.getMovieActorPair(movieAndActor).subscribe(movieActorPair => {
      if(movieActorPair.length == 0) {
        this.movieService.associateMovieActor(movieAndActor)
          .subscribe(result => {
            this.updateDisplayedInfo2.emit(true);
          });
      }
      else return;
    });
  }

  registerGenre(selectedGenreID: string): void {
    let movieAndGenre : {movie:number, genre:number} = {
      movie: this.movie.id,
      genre: +selectedGenreID
    }
    this.movieService.getMovieGenrePair(movieAndGenre).subscribe(movieGenrePair => {
      if(movieGenrePair.length == 0) {
        this.movieService.associateMovieGenre(movieAndGenre)
          .subscribe(result => {
            this.updateDisplayedInfo2.emit(true);
          });
      }
      else return;
    });
  }

  unassociateActor(actorId: string): void {
    let movieAndActor : {movie:number, actor:number} = {
      movie: this.movie.id,
      actor: +actorId
    }
    this.movieService.unassociateActor(movieAndActor).subscribe(result => {
      this.updateDisplayedInfo2.emit(true);
    });
  }

  unassociateGenre(genreId: string): void {
    let movieAndGenre : {movie:number, genre:number} = {
      movie: this.movie.id,
      genre: +genreId
    }
    this.movieService.unassociateGenre(movieAndGenre).subscribe(result => {
      this.updateDisplayedInfo2.emit(true);
    });
  }

  ngOnInit(): void {

  }

}
