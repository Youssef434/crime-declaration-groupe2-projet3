import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOfficierComponent } from './add-officier.component';

describe('AddOfficierComponent', () => {
  let component: AddOfficierComponent;
  let fixture: ComponentFixture<AddOfficierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOfficierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOfficierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
