import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBotComponent } from './message-bot.component';

describe('MessageBotComponent', () => {
  let component: MessageBotComponent;
  let fixture: ComponentFixture<MessageBotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageBotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
