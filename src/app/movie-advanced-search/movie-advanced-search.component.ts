import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-movie-advanced-search',
  templateUrl: './movie-advanced-search.component.html',
  styleUrls: ['./movie-advanced-search.component.css']
})
export class MovieAdvancedSearchComponent implements OnInit {

  @Output() advancedSearch = new EventEmitter<string>();

  constructor() { }

  search(query: string) {
    this.advancedSearch.emit(query);
  }

  ngOnInit(): void {
  }

}
