import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FjoriComponent } from './fjori.component';

describe('FjoriComponent', () => {
  let component: FjoriComponent;
  let fixture: ComponentFixture<FjoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FjoriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FjoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
