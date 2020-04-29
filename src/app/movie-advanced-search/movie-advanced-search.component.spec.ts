import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieAdvancedSearchComponent } from './movie-advanced-search.component';

describe('MovieAdvancedSearchComponent', () => {
  let component: MovieAdvancedSearchComponent;
  let fixture: ComponentFixture<MovieAdvancedSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieAdvancedSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieAdvancedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
