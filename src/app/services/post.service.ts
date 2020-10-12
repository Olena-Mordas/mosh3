import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url:string = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private httpClient: HttpClient){}

  getPosts(){
    return this.httpClient.get(this.url);
  }

  createPost(post:string){
    return this.httpClient.post(this.url, post);
  }

  updatePost(postId,updates:string){
    return this.httpClient.patch(this.url+'/'+postId, updates);
  }

  deletePost(postId){
    return this.httpClient.delete(this.url+'/'+postId);
  }
}
