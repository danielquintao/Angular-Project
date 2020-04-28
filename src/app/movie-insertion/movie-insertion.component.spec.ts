import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieInsertionComponent } from './movie-insertion.component';

describe('MovieInsertionComponent', () => {
  let component: MovieInsertionComponent;
  let fixture: ComponentFixture<MovieInsertionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieInsertionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
