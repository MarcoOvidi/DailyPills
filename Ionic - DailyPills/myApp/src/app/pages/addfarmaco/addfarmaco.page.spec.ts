import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfarmacoPage } from './addfarmaco.page';

describe('AddfarmacoPage', () => {
  let component: AddfarmacoPage;
  let fixture: ComponentFixture<AddfarmacoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddfarmacoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfarmacoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
