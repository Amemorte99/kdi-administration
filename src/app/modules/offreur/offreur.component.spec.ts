import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreurComponent } from './offreur.component';

describe('OffreurComponent', () => {
  let component: OffreurComponent;
  let fixture: ComponentFixture<OffreurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffreurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
