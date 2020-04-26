import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; // reactive programming library
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { } 

  getConfig() {
    return this.http.get('https://localhost/8080/getmovie');
  }

  /*
  getMovie(){
    return this.http.get('http://3000/getmovie')
      .map(res => res.json())
  }
  */
}
