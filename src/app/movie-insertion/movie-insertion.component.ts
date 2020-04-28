import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
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

  @Output() updateDisplayedInfo = new EventEmitter<boolean>();

  addMovie(name: string): void {
    name = name.trim();
    if (!name) { return; } // blank name
    this.movieService.addMovie({ name } as Movie)
      .subscribe();
    this.updateDisplayedInfo.emit(true); // update parent view
  }

  addDirector(name: string): void {
    name = name.trim();
    if (!name) { return; } // blank name
    this.movieService.addDirector({ name } as Director)
      .subscribe();
    this.updateDisplayedInfo.emit(true); // update parent view
  }

  deleteDirector(directorId: string): void {
    this.movieService.deleteDirector(+directorId).subscribe();
    this.updateDisplayedInfo.emit(true); // update parent view
  }

  deleteStudio(studioId: string): void {
    this.movieService.deleteStudio(+studioId).subscribe();
    this.updateDisplayedInfo.emit(true); // update parent view
  }

  deleteActor(actorId: string): void {
    this.movieService.deleteActor(+actorId).subscribe();
    this.updateDisplayedInfo.emit(true); // update parent view
  }

  addStudio(name: string): void {
    name = name.trim();
    if (!name) { return; } // blank name
    this.movieService.addStudio({ name } as Studio)
      .subscribe();
    this.updateDisplayedInfo.emit(true); // update parent view
  }

  addActor(name: string): void {
    name = name.trim();
    if (!name) { return; } // blank name
    this.movieService.addActor({ name } as Actor)
      .subscribe();
    this.updateDisplayedInfo.emit(true); // update parent view
  }

  constructor(private route: ActivatedRoute, private movieService: MovieService, private location: Location) {}

  ngOnInit(): void {
  }

}
