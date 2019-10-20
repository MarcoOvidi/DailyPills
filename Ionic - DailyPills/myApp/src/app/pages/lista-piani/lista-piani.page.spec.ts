import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPianiPage } from './lista-piani.page';

describe('ListaPianiPage', () => {
  let component: ListaPianiPage;
  let fixture: ComponentFixture<ListaPianiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPianiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPianiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
