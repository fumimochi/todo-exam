import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAdminLibComponent } from './non-admin-lib.component';

describe('NonAdminLibComponent', () => {
  let component: NonAdminLibComponent;
  let fixture: ComponentFixture<NonAdminLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonAdminLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAdminLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
