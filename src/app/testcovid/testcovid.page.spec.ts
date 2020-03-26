import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcovidPage } from './testcovid.page';

describe('TestcovidPage', () => {
  let component: TestcovidPage;
  let fixture: ComponentFixture<TestcovidPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestcovidPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcovidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
