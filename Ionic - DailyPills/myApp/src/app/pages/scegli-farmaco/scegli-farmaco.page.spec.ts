import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScegliFarmacoPage } from './scegli-farmaco.page';

describe('ScegliFarmacoPage', () => {
  let component: ScegliFarmacoPage;
  let fixture: ComponentFixture<ScegliFarmacoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScegliFarmacoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScegliFarmacoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
