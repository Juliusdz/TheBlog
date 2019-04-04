import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { postsReducer } from './reducers/posts.reducers';
import { Routes, RouterModule } from '@angular/router';
import { PostsListItemComponent } from './posts-list-item/posts-list-item.component';

const routes: Routes = [
  {path: 'post/:postId', loadChildren: './post-item/post-item.module#PostItemModule'},
  {path: 'edit-post/:postId', loadChildren: './post-form/post-form.module#PostFormModule'},
  {path: 'create-post', loadChildren: './post-form/post-form.module#PostFormModule'},
  {path: '', component: PostsListComponent},
  {path: '**', component: PostsListComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    PostsListComponent,
    PostsListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreModule.forFeature('posts', postsReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
