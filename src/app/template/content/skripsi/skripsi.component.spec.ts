import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkripsiComponent } from './skripsi.component';

describe('SkripsiComponent', () => {
  let component: SkripsiComponent;
  let fixture: ComponentFixture<SkripsiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkripsiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkripsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
