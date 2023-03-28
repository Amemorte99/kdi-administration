import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamAdminComponent } from './param-admin.component';

describe('ParamAdminComponent', () => {
  let component: ParamAdminComponent;
  let fixture: ComponentFixture<ParamAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParamAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
