import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovoPianoPage } from './nuovo-piano.page';

describe('NuovoPianoPage', () => {
  let component: NuovoPianoPage;
  let fixture: ComponentFixture<NuovoPianoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuovoPianoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuovoPianoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
