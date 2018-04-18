import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdetailviewComponent } from './userdetailview.component';

describe('UserdetailviewComponent', () => {
  let component: UserdetailviewComponent;
  let fixture: ComponentFixture<UserdetailviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdetailviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdetailviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
