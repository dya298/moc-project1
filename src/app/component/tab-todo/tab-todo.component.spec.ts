import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabTodoComponent } from './tab-todo.component';

describe('TabTodoComponent', () => {
  let component: TabTodoComponent;
  let fixture: ComponentFixture<TabTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabTodoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
