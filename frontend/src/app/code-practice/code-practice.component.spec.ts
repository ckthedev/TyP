import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodePracticeComponent } from './code-practice.component';

describe('CodePracticeComponent', () => {
  let component: CodePracticeComponent;
  let fixture: ComponentFixture<CodePracticeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodePracticeComponent]
    });
    fixture = TestBed.createComponent(CodePracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
