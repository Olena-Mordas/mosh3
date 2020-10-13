import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGitFollowersComponent } from './my-git-followers.component';

describe('MyGitFollowersComponent', () => {
  let component: MyGitFollowersComponent;
  let fixture: ComponentFixture<MyGitFollowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyGitFollowersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGitFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
