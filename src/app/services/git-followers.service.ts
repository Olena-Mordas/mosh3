import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';


@Injectable({
    providedIn: 'root'
  })
export class GitService extends DataService{
    
    constructor( httpClient: HttpClient){
        super(httpClient, 'https://api.github.com/users/olena-mordas/followers');
    }
}