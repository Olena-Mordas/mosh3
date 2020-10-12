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
export class DataService {

  constructor(private httpClient: HttpClient, private url:string){}

  getAll(){
    return this.httpClient.get(this.url)
    .pipe(catchError(this.handleError)
    );
  }

  create(resource:string){
    return this.httpClient.post(this.url, resource)
    .pipe(catchError(this.handleError)
    );
  }
 
  update(resource,updates:string){
    return this.httpClient.patch(this.url+'/'+resource, updates)
      .pipe(catchError(this.handleError)
    );
  }

  delete(id){
    return this.httpClient.delete(this.url+'/'+id)
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
