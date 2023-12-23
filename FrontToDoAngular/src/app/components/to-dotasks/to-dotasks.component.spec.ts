import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDotasksComponent } from './to-dotasks.component';

describe('ToDotasksComponent', () => {
  let component: ToDotasksComponent;
  let fixture: ComponentFixture<ToDotasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDotasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToDotasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
