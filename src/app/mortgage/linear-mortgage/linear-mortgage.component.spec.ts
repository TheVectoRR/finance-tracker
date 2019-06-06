import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearMortgageComponent } from './linear-mortgage.component';

describe('LinearMortgageComponent', () => {
  let component: LinearMortgageComponent;
  let fixture: ComponentFixture<LinearMortgageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinearMortgageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinearMortgageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
