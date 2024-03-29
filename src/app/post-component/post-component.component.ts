import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
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
  posts;
  
  constructor(private service: PostService){}

  ngOnInit(): void {
    this.service.getAll()
      .subscribe(response =>this.posts = response) //we removed error handling here, so it will porpagate and eventually hit the global error handler
  }

  createPost(input:HTMLInputElement){

    let post:any = {title: input.value};
    this.posts.splice(0,0,post);

    input.value='';

    this.service.create( JSON.stringify(post))
      .subscribe(
        (response:any)=>{
        post.id = response.id  
      },(error:AppError) =>{
          this.posts.splice(0,1); 
          if (error instanceof BadInputError){
            //this.form.setErrors(error.originalError);
          }
          else throw error; //we rethrow error if its not bad input, so now it will hit global handler         
      })
  }

  updatePost(post){
    this.service.update(post ,JSON.stringify({propertyToChange: 'newValue'}))
      .subscribe(
        response =>{
        console.log(response);
      },(error:AppError) =>{
        if(error instanceof NotFoundError){
          alert('Post has been deleted');
        }
        else throw error;
      })
  }

  deletePost(post){
    let i = this.posts.indexOf(post);
    this.posts.splice(i,1)
    this.service.delete(post.id)
    .subscribe(
      response =>{
      console.log(response);
    },(error:AppError) =>{
      this.posts.splice(i,0,post);
      if(error instanceof NotFoundError){
        alert('Post has been deleted');
      }
      else throw error;
    })
  }
}
