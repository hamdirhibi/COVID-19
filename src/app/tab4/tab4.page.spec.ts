import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab4page } from './tab4.page';

describe('Tab4Page', () => {
  let component: Tab4page;
  let fixture: ComponentFixture<Tab4page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab4page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab4page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
