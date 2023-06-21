import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsdetailComponent } from './resultsdetail.component';

describe('ResultsdetailComponent', () => {
  let component: ResultsdetailComponent;
  let fixture: ComponentFixture<ResultsdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
