import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficiersListComponent } from './officiers-list.component';

describe('OfficiersListComponent', () => {
  let component: OfficiersListComponent;
  let fixture: ComponentFixture<OfficiersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficiersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficiersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
