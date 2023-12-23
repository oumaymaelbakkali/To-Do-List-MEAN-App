import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasktermineComponent } from './tasktermine.component';

describe('TasktermineComponent', () => {
  let component: TasktermineComponent;
  let fixture: ComponentFixture<TasktermineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasktermineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TasktermineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
