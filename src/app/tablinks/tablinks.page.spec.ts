import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablinksPage } from './tablinks.page';

describe('TablinksPage', () => {
  let component: TablinksPage;
  let fixture: ComponentFixture<TablinksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablinksPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablinksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
