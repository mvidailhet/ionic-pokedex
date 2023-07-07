import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenResizePage } from './screen-resize.page';

describe('ScreenResizePage', () => {
  let component: ScreenResizePage;
  let fixture: ComponentFixture<ScreenResizePage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenResizePage]
    });
    fixture = TestBed.createComponent(ScreenResizePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
