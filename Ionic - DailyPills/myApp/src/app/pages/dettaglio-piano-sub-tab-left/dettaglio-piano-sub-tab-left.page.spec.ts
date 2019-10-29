import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioPianoSubTabLeftPage } from './dettaglio-piano-sub-tab-left.page';

describe('DettaglioPianoSubTabLeftPage', () => {
  let component: DettaglioPianoSubTabLeftPage;
  let fixture: ComponentFixture<DettaglioPianoSubTabLeftPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DettaglioPianoSubTabLeftPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DettaglioPianoSubTabLeftPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
