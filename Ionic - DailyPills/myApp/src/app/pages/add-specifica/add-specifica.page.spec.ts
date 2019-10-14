import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpecificaPage } from './add-specifica.page';

describe('AddSpecificaPage', () => {
  let component: AddSpecificaPage;
  let fixture: ComponentFixture<AddSpecificaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSpecificaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpecificaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
