import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitContainerComponent } from './unit-container.component';

describe('UnitContainerComponent', () => {
  let component: UnitContainerComponent;
  let fixture: ComponentFixture<UnitContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
