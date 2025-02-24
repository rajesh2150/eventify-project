import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendeeDashboardComponent } from './atendee-dashboard.component';

describe('AtendeeDashboardComponent', () => {
  let component: AtendeeDashboardComponent;
  let fixture: ComponentFixture<AtendeeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtendeeDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtendeeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
