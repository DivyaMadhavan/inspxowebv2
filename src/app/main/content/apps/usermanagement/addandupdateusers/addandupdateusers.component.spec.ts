import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddandupdateusersComponent } from './addandupdateusers.component';

describe('AddandupdateusersComponent', () => {
  let component: AddandupdateusersComponent;
  let fixture: ComponentFixture<AddandupdateusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddandupdateusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddandupdateusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
