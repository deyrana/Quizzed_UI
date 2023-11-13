import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconModelComponent } from './icon-model.component';

describe('IconModelComponent', () => {
  let component: IconModelComponent;
  let fixture: ComponentFixture<IconModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
