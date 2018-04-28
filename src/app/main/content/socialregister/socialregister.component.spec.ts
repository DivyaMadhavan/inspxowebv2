import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialregisterComponent } from './socialregister.component';

describe('SocialregisterComponent', () => {
  let component: SocialregisterComponent;
  let fixture: ComponentFixture<SocialregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
