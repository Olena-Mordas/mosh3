import { Component, Input, OnInit } from '@angular/core';
import { GitService } from '../services/git-followers.service';

@Component({
  selector: 'my-git-followers',
  templateUrl: './my-git-followers.component.html',
  styleUrls: ['./my-git-followers.component.css']
})
export class MyGitFollowersComponent implements OnInit {

  @Input() title:String;
  imgUrl: String;
  followers;

  constructor(private service: GitService) { }

  ngOnInit(): void {
    this.service.getAll()
      .subscribe(
        response => {
          this.followers = response;
          console.log(this.followers);
      })
  }


}
