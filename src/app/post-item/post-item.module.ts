import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostItemComponent } from './post-item/post-item.component';
import { Routes, RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

const routes: Routes = [
  {path: '', component: PostItemComponent}
]

@NgModule({
  declarations: [PostItemComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularFontAwesomeModule
  ]
})
export class PostItemModule { }
