import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAMedicalAppointmentComponent } from './request-a-medical-appointment.component';

describe('RequestAMedicalAppointmentComponent', () => {
  let component: RequestAMedicalAppointmentComponent;
  let fixture: ComponentFixture<RequestAMedicalAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestAMedicalAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestAMedicalAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
