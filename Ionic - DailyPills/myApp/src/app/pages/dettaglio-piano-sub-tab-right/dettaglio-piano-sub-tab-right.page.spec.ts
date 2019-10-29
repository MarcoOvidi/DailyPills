import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioPianoSubTabRightPage } from './dettaglio-piano-sub-tab-right.page';

describe('DettaglioPianoSubTabRightPage', () => {
  let component: DettaglioPianoSubTabRightPage;
  let fixture: ComponentFixture<DettaglioPianoSubTabRightPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DettaglioPianoSubTabRightPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DettaglioPianoSubTabRightPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
