import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Movie } from './movie'
import { MOVIES } from './mock-movies'

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getMovies(): Observable<Movie[]> {
    this.messageService.add(`MovieService: fetched movies`);
    return this.http.get<Movie[]>('http://localhost:3000/getmovies');
  }
  getMovie(id: number): Observable<Movie> {
    // TODO: send the message _after_ fetching the movie
    this.messageService.add(`MovieService: fetched movie id=${id}`);
    return of(MOVIES.find(movie => movie.id === id));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) { // because we'll use the message service very often
    this.messageService.add(`MovieService: ${message}`);
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }
}
