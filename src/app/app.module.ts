import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponentComponent } from './post-component/post-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostService } from './services/post.service';
import { AppErrorHandler } from './common/app-error-handler';
import { MyGitFollowersComponent } from './my-git-followers/my-git-followers.component';
import { GitService } from './services/git-followers.service';

@NgModule({
  declarations: [
    AppComponent,
    PostComponentComponent,
    MyGitFollowersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    PostService,
    GitService,
    {provide: ErrorHandler, useClass: AppErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
