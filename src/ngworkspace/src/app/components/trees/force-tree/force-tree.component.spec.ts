import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForceTreeComponent } from './force-tree.component';

describe('ForceTreeComponent', () => {
  let component: ForceTreeComponent;
  let fixture: ComponentFixture<ForceTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForceTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForceTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
