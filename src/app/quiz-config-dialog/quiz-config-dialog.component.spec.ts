import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizConfigDialogComponent } from './quiz-config-dialog.component';

describe('QuizConfigDialogComponent', () => {
  let component: QuizConfigDialogComponent;
  let fixture: ComponentFixture<QuizConfigDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizConfigDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
