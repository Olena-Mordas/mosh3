import { Component, OnInit } from '@angular/core';
import { AppError } from '../common/app-error';
import { BadInputError } from '../common/bad-input';
import { NotFoundError } from '../common/not-found-error';
import { PostService } from '../services/post.service';

@Component({
  selector: 'post-component',
  templateUrl: './post-component.component.html',
  styleUrls: ['./post-component.component.css']
})
export class PostComponentComponent implements OnInit {
  posts:any[];
  
  constructor(private service: PostService){}

  ngOnInit(): void {
    this.service.getPosts()
      .subscribe((
        response:any[]) =>{
        console.log(response);
        this.posts = response;
      }, error =>{
        alert('Unexpected error!')
        console.log(error);
      })
  }

  createPost(input:HTMLInputElement){
    let post:any = {title: input.value};
    input.value='';
    this.service.createPost( JSON.stringify(post))
      .subscribe(
        (response:any)=>{
        post.id = response.id
        console.log(response);
        this.posts.splice(0,0,post);
      },(error:AppError) =>{
          if (error instanceof BadInputError){
            //this.form.setErrors(error.originalError);
          }
          else{
            alert('Unexpected error!');
            console.log(error);
          }
          
      })
  }

  updatePost(post){
    this.service.updatePost(post.id ,JSON.stringify({propertyToChange: 'newValue'}))
      .subscribe(
        response =>{
        console.log(response);
      },(error:AppError) =>{
        if(error instanceof NotFoundError){
          alert('Post has been deleted');
        }
        else{
          alert('Unexpected error!')
          console.log(error);
        }   
      })
  }

  deletePost(post){
    this.service.deletePost(post.id)
    .subscribe(
      response =>{
      let i = this.posts.indexOf(post);
      this.posts.splice(i,1)
      console.log(response);
    },(error:AppError) =>{
      if(error instanceof NotFoundError){
        alert('Post has been deleted');
      }
      else{
        alert('Unexpected error!')
        console.log(error);
      }   
    })
  }
}
