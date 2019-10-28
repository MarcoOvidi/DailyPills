import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInfoPianoPage } from './edit-info-piano.page';

describe('EditInfoPianoPage', () => {
  let component: EditInfoPianoPage;
  let fixture: ComponentFixture<EditInfoPianoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInfoPianoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInfoPianoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
