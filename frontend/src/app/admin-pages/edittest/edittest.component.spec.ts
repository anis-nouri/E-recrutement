import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittestComponent } from './edittest.component';

describe('EdittestComponent', () => {
  let component: EdittestComponent;
  let fixture: ComponentFixture<EdittestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
