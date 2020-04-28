import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../movie';
import { Director } from '../director';
import { Studio } from '../studio';
import { Actor } from '../actor';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MovieService }  from '../movie.service';

@Component({
  selector: 'app-movie-insertion',
  templateUrl: './movie-insertion.component.html',
  styleUrls: ['./movie-insertion.component.css']
})
export class MovieInsertionComponent implements OnInit {

  @Input() movies: Movie[];
  @Input() directors: Director[];
  @Input() studios: Studio[];
  @Input() actors: Actor[];

  addMovie(name: string): void {
    name = name.trim();
    if (!name) { return; } // blank name
    this.movieService.addMovie({ name } as Movie)
      .subscribe();
    this.movies.push({ name }); // this.movies won't refresh
  }

  addDirector(name: string): void {
    name = name.trim();
    if (!name) { return; } // blank name
    this.movieService.addDirector({ name } as Director)
      .subscribe();
    this.directors.push({ name }); // this.directors won't refresh
  }

  addStudio(name: string): void {
    name = name.trim();
    if (!name) { return; } // blank name
    this.movieService.addStudio({ name } as Studio)
      .subscribe();
    this.studios.push({ name }); // this.directors won't refresh
  }

  addActor(name: string): void {
    name = name.trim();
    if (!name) { return; } // blank name
    this.movieService.addActor({ name } as Actor)
      .subscribe();
    this.actors.push({ name }); // this.directors won't refresh
  }

  constructor(private route: ActivatedRoute, private movieService: MovieService, private location: Location) {}

  ngOnInit(): void {
  }

}
