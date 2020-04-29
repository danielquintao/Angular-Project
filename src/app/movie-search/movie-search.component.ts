import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: [ './movie-search.component.css' ]
})
export class MovieSearchComponent implements OnInit {
  movies$: Observable<Movie[]>;
  private searchTerms = new Subject<string>(); // Subject is also an observable!!!

  advancedSearchOn: boolean;

  constructor(private movieService: MovieService) {}

  switchAdvancedSearchStatus() {
    this.advancedSearchOn = !this.advancedSearchOn;
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term); // push "term" in searchItems
  }

  ngOnInit(): void {
    this.advancedSearchOn = false;
    this.movies$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.movieService.searchMovies(term)),
    );
    this.search(' ');//// triggering movies just after initiation 
  }
}