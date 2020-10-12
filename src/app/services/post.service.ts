import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInputError } from '../common/bad-input';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url:string = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private httpClient: HttpClient){}

  getPosts(){
    return this.httpClient.get(this.url)
    .pipe(catchError(this.handleError)
    );
  }

  createPost(post:string){
    return this.httpClient.post(this.url, post)
    .pipe(catchError(this.handleError)
    );
  }
 
  updatePost(postId,updates:string){
    return this.httpClient.patch(this.url+'/'+postId, updates)
      .pipe(catchError(this.handleError)
    );
  }

  deletePost(postId){
    return this.httpClient.delete(this.url+'/'+postId)
      .pipe(catchError(this.handleError)
    );
  }

  
  private handleError(err: Response){
    if(err.status==400){
      return throwError(new BadInputError(err));
    }
    if (err.status==404){
      return throwError(new NotFoundError);
    }
    return throwError(new AppError(err));
  }
}
