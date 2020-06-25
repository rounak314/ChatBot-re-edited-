import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BHKComponent } from './bhk.component';

describe('BHKComponent', () => {
  let component: BHKComponent;
  let fixture: ComponentFixture<BHKComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BHKComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BHKComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
