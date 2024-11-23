import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultAppointtmentTrueComponent } from './consult-appointtment-true.component';

describe('ConsultAppointtmentTrueComponent', () => {
  let component: ConsultAppointtmentTrueComponent;
  let fixture: ComponentFixture<ConsultAppointtmentTrueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultAppointtmentTrueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultAppointtmentTrueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
