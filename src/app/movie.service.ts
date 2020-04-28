import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Movie } from './movie';
import { Director } from './director';
import { Studio } from './studio';
import { Actor } from './actor';
import { Genre } from './genre';


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
    return this.http.get<Movie[]>('http://localhost:3000/getmovies').pipe(
      tap(_ => this.log('fetched movies')),
      catchError(this.handleError<Movie[]>('getMovies', []))
    );
  }

  getDirectors(): Observable<Director[]> {
    this.messageService.add(`MovieService: fetched directors`);
    return this.http.get<Director[]>('http://localhost:3000/getdirectors').pipe(
      tap(_ => this.log('fetched directors')),
      catchError(this.handleError<Director[]>('getDirectors', []))
    );
  }

  getStudios(): Observable<Studio[]> {
    this.messageService.add(`MovieService: fetched studios`);
    return this.http.get<Studio[]>('http://localhost:3000/getstudios').pipe(
      tap(_ => this.log('fetched studios')),
      catchError(this.handleError<Studio[]>('getStudios', []))
    );
  }

  getActors(): Observable<Actor[]> {
    this.messageService.add(`MovieService: fetched actors`);
    return this.http.get<Actor[]>('http://localhost:3000/getactors').pipe(
      tap(_ => this.log('fetched actors')),
      catchError(this.handleError<Actor[]>('getActors', []))
    );
  }

  getGenres(): Observable<Genre[]> {
    this.messageService.add(`MovieService: fetched genres`);
    return this.http.get<Genre[]>('http://localhost:3000/getgenres').pipe(
      tap(_ => this.log('fetched genres')),
      catchError(this.handleError<Genre[]>('getGenres', []))
    );
  }
  
  getMovie(id: number): Observable<Movie> {
    const url = `http://localhost:3000/${id}`;
    return this.http.get<Movie>(url).pipe(
      tap(_ => this.log(`fetched movie id=${id}`)),
      catchError(this.handleError<Movie>(`getMovie id=${id}`))
    );
  }

  getDirectorInformation(id: number): Observable<Director[]> {
    return this.http.get<Director[]>(`http://localhost:3000/getmovieinfo-director/${id}`).pipe(
      tap(_ => this.log(`fetched movie director info id=${id}`)),
      catchError(this.handleError<Director[]>(`getMovieInformation id=${id}`))
    );
  }
  
  getStudioInformation(id: number): Observable<Studio[]> {
    return this.http.get<Studio[]>(`http://localhost:3000/getmovieinfo-studio/${id}`).pipe(
      tap(_ => this.log(`fetched movie studio info id=${id}`)),
      catchError(this.handleError<Studio[]>(`getMovieInformation id=${id}`))
    );
  }

  getActorsInformation(id: number): Observable<Actor[]> {
    return this.http.get<Actor[]>(`http://localhost:3000/getmovieinfo-actors/${id}`).pipe(
      tap(_ => this.log(`fetched movie actors info id=${id}`)),
      catchError(this.handleError<Actor[]>(`getMovieInformation id=${id}`))
    );
  }

  getGenresInformation(id: number): Observable<Genre[]> {
    return this.http.get<Genre[]>(`http://localhost:3000/getmovieinfo-genres/${id}`).pipe(
      tap(_ => this.log(`fetched movie genres info id=${id}`)),
      catchError(this.handleError<Genre[]>(`getMovieInformation id=${id}`))
    );
  }

  updateMovie(movie: Movie): Observable<any> {
    return this.http.put('http://localhost:3000/putmovie', movie, this.httpOptions).pipe(
      tap(_ => this.log(`updated movie id=${movie.id}`)),
      catchError(this.handleError<any>('updateMovie'))
    );
  }
  
  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>('http://localhost:3000/postmovie', movie, this.httpOptions).pipe(
      tap((newMovie: Movie) => this.log(`added movie with id=${newMovie.id}`)),
      catchError(this.handleError<Movie>('addMovie'))
    );
  }
  
  addDirector(director: Director): Observable<Director> {
    return this.http.post<Director>('http://localhost:3000/postdirector', director, this.httpOptions).pipe(
      tap((newDirector: Director) => this.log(`added director with id=${newDirector.id}`)),
      catchError(this.handleError<Director>('addDirector'))
    );
  }
  
  addStudio(studio: Studio): Observable<Studio> {
    return this.http.post<Studio>('http://localhost:3000/poststudio', studio, this.httpOptions).pipe(
      tap((newStudio: Studio) => this.log(`added studio with id=${newStudio.id}`)),
      catchError(this.handleError<Studio>('addStudio'))
    );
  }

  addActor(actor: Actor): Observable<Actor> {
    return this.http.post<Actor>('http://localhost:3000/postactor', actor, this.httpOptions).pipe(
      tap((newActor: Actor) => this.log(`added actor with id=${newActor.id}`)),
      catchError(this.handleError<Actor>('addActor'))
    );
  }

  associateMovieDirector(movieAndDirector: {movie:number, director:number}): Observable<{movie:number, director:number}> {
    return this.http.put<{movie:number, director:number}>('http://localhost:3000/associate_movie_and_director', movieAndDirector, this.httpOptions).pipe(
      tap((newRelation: {movie:number, director:number}) => this.log(`added relation movie - director`)),
      catchError(this.handleError<{movie:number, director:number}>('addRelation'))
    );
  }

  associateMovieStudio(movieAndStudio: {movie:number, studio:number}): Observable<{movie:number, studio:number}> {
    return this.http.put<{movie:number, studio:number}>('http://localhost:3000/associate_movie_and_studio', movieAndStudio, this.httpOptions).pipe(
      tap((newRelation: {movie:number, studio:number}) => this.log(`added relation movie - studio`)),
      catchError(this.handleError<{movie:number, studio:number}>('addRelation'))
    );
  }

  associateMovieActor(movieAndActor: {movie:number, actor:number}): Observable<{movie:number, actor:number}> {
    return this.http.post<{movie:number, actor:number}>('http://localhost:3000/associate_movie_and_actor', movieAndActor, this.httpOptions).pipe(
      tap((newRelation: {movie:number, actor:number}) => this.log(`added relation movie - actor`)),
      catchError(this.handleError<{movie:number, actor:number}>('addRelation'))
    );
  }

  associateMovieGenre(movieAndGenre: {movie:number, genre:number}): Observable<{movie:number, genre:number}> {
    return this.http.post<{movie:number, genre:number}>('http://localhost:3000/associate_movie_and_genre', movieAndGenre, this.httpOptions).pipe(
      tap((newRelation: {movie:number, genre:number}) => this.log(`added relation movie - genre`)),
      catchError(this.handleError<{movie:number, genre:number}>('addRelation'))
    );
  }

  deleteMovie(movie: Movie | number): Observable<Movie> {
    const id = typeof movie === 'number' ? movie : movie.id;
    return this.http.delete<Movie>(`http://localhost:3000/deletemovie/${id}`, this.httpOptions).pipe(
      tap(_ => this.log(`deleted movie id=${id}`)),
      catchError(this.handleError<Movie>('deleteMovie'))
    );
  }

  deleteDirector(director: Director | number): Observable<Director> {
    const id = typeof director === 'number' ? director : director.id;
    return this.http.delete<Director>(`http://localhost:3000/deletedirector/${id}`, this.httpOptions).pipe(
      tap(_ => this.log(`deleted director id=${id}`)),
      catchError(this.handleError<Director>('deleteDirector'))
    );
  }

  deleteStudio(studio: Studio | number): Observable<Studio> {
    const id = typeof studio === 'number' ? studio : studio.id;
    return this.http.delete<Studio>(`http://localhost:3000/deletestudio/${id}`, this.httpOptions).pipe(
      tap(_ => this.log(`deleted studio id=${id}`)),
      catchError(this.handleError<Studio>('deleteStudio'))
    );
  }

  deleteActor(actor: Actor | number): Observable<Actor> {
    const id = typeof actor === 'number' ? actor : actor.id;
    return this.http.delete<Actor>(`http://localhost:3000/deleteactor/${id}`, this.httpOptions).pipe(
      tap(_ => this.log(`deleted actor id=${id}`)),
      catchError(this.handleError<Actor>('deleteActor'))
    );
  }

  unassociateActor(movieAndActor: {movie:number, actor:number}): Observable<{movie:number, actor:number}> {
    const movie_id = movieAndActor.movie;
    const actor_id = movieAndActor.actor;
    return this.http.delete<{movie:number, actor:number}>(`http://localhost:3000/unassociate-movie-and-actor/${movie_id}/${actor_id}`, this.httpOptions).pipe(
      tap(_ => this.log(`deleted association between movie=${movie_id} and actor=${actor_id}`)),
      catchError(this.handleError<{movie:number, actor:number}>('unassociateMovieAndActor'))
    );
  }

  unassociateGenre(movieAndGenre: {movie:number, genre:number}): Observable<{movie:number, genre:number}> {
    const movie_id = movieAndGenre.movie;
    const genre_id = movieAndGenre.genre;
    return this.http.delete<{movie:number, genre:number}>(`http://localhost:3000/unassociate-movie-and-genre/${movie_id}/${genre_id}`, this.httpOptions).pipe(
      tap(_ => this.log(`deleted association between movie=${movie_id} and genre=${genre_id}`)),
      catchError(this.handleError<{movie:number, genre:number}>('unassociateMovieAndActor'))
    );
  }

  searchMovies(term: string): Observable<Movie[]> {
    if (!term.trim()) {
      // if not search term, return empty movie array.
      return of([]);
    }
    return this.http.get<Movie[]>(`http://localhost:3000/getmovies/${term}`).pipe(
      tap(x => x.length ? this.log(`found movies matching "${term}"`) : this.log(`no movie matching "${term}"`)),
      catchError(this.handleError<Movie[]>('searchMovies', []))
    );
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
