import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Movie } from '../movie';
import { Director } from '../director';
import { Studio } from '../studio';
import { Actor } from '../actor';

// import { ActivatedRoute } from '@angular/router';
// import { Location } from '@angular/common';

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

  constructor(private movieService: MovieService) {}

  addMovie(name: string): void {
    name = name.trim();
    if (!name) { return; } // blank name
    this.movieService.addMovie({ name } as Movie)
      .subscribe();
    this.updateDisplayedInfo.emit(true); 
  }

  addDirector(name: string): void {
    name = name.trim();
    if (!name) { return; } // blank name
    this.movieService.addDirector({ name } as Director)
      .subscribe();
    this.updateDisplayedInfo.emit(true);
  }

  deleteDirector(directorId: string): void {
    this.movieService.deleteDirector(+directorId).subscribe();
    this.updateDisplayedInfo.emit(true); 
  }

  deleteStudio(studioId: string): void {
    this.movieService.deleteStudio(+studioId).subscribe();
    this.updateDisplayedInfo.emit(true); 
  }

  deleteActor(actorId: string): void {
    this.movieService.deleteActor(+actorId).subscribe();
    this.updateDisplayedInfo.emit(true); 
  }

  addStudio(name: string): void {
    name = name.trim();
    if (!name) { return; } // blank name
    this.movieService.addStudio({ name } as Studio)
      .subscribe();
    this.updateDisplayedInfo.emit(true); 
  }

  addActor(name: string): void {
    name = name.trim();
    if (!name) { return; } // blank name
    this.movieService.addActor({ name } as Actor)
      .subscribe();
    this.updateDisplayedInfo.emit(true); 
  }

  newDirectorName: string;
  renameDirector(id: string) {
    if(!this.newDirectorName.trim()) return;
    let director: Director = {id: +id, name: this.newDirectorName};
    this.movieService.renameDirector(director).subscribe();
    this.newDirectorName = '';
    this.updateDisplayedInfo.emit(true);
  }

  newStudioName: string;
  renameStudio(id: string) {
    if(!this.newStudioName.trim()) return;
    let studio: Studio = {id: +id, name: this.newStudioName};
    this.movieService.renameStudio(studio).subscribe();
    this.newStudioName = '';
    this.updateDisplayedInfo.emit(true);
  }

  newActorName: string;
  renameActor(id: string) {
    if(!this.newActorName.trim()) return;
    let actor: Actor = {id: +id, name: this.newActorName};
    this.movieService.renameActor(actor).subscribe();
    this.newActorName = '';
    this.updateDisplayedInfo.emit(true);
  }

  ngOnInit(): void {
  }

}
