import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'post-component',
  templateUrl: './post-component.component.html',
  styleUrls: ['./post-component.component.css']
})
export class PostComponentComponent implements OnInit {
  posts:any[];
  private url:string = 'https://jsonplaceholder.typicode.com/posts';


  constructor(private httpClient: HttpClient){}

  
  ngOnInit(): void {
    this.httpClient.get(this.url)
      .subscribe((response:any[]) =>{
        console.log(response);
        this.posts = response;
      })
  }

  createPost(input:HTMLInputElement){
    let post:any = {title: input.value};
    input.value='';
    this.httpClient.post(this.url, JSON.stringify(post))
      .subscribe((response:any)=>{
        post.id = response.id
        console.log(response);
        this.posts.splice(0,0,post);
      })
  }

  updatePost(post){
    this.httpClient.patch(this.url+ '/' + post.id ,JSON.stringify({propertyToChange: 'newValue'}))
      .subscribe(response =>{
        console.log(response);
      })
  }

  deletePost(post){
    this.httpClient.delete(this.url+ '/' + post.id)
    .subscribe(response =>{
      let i = this.posts.indexOf(post);
      this.posts.splice(i,1)
      console.log(response);
    })
  }
}
