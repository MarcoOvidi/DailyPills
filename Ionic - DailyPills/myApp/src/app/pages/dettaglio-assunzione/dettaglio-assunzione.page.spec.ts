import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioAssunzionePage } from './dettaglio-assunzione.page';

describe('DettaglioAssunzionePage', () => {
  let component: DettaglioAssunzionePage;
  let fixture: ComponentFixture<DettaglioAssunzionePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DettaglioAssunzionePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DettaglioAssunzionePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
