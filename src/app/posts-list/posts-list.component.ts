import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostsState } from '../reducers/posts.reducers';
import { Post } from '../interfaces/post';
import { PageQuery } from '../post.actions';
import { selectPostsPage, selectAllPosts } from '../selectors/post.selectors';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject, Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit, OnDestroy {

  currentPosts$ = new BehaviorSubject<Post[]>(null);
  pageChange$ = new Subject();
  currentPostsSubscription: Subscription;
  pagesLengthSubscription: Subscription;
  postsCount: number;
  pagesCount: number;
  firstPage = true;
  lastPage = false;

  currentIndex: number;

  pageQuery: PageQuery = {pageIndex: 0, pageSize: 3};
  paginationButtons = [];

  constructor(private store: Store<PostsState>) { }

  ngOnInit() {
    this.pagesLengthSubscription = this.store.select(selectAllPosts).subscribe(posts => {
      this.postsCount = posts.length;
      this.pagesCount = Math.ceil(this.postsCount / this.pageQuery.pageSize);
    });

    this.currentPostsSubscription = this.pageChange$.pipe(
      switchMap((pageQuery: PageQuery) => this.store.select(selectPostsPage(pageQuery)))
    ).subscribe((posts: Post[]) => {
      this.currentPosts$.next(posts);

      const pagesArray = Array.from({length: this.pageQuery.pageIndex + 6}, (v, i) => i + 1);

      let start = this.pageQuery.pageIndex > 2 ? this.pageQuery.pageIndex - 2 : 0;
      let end = this.pageQuery.pageIndex > 2 ? this.pageQuery.pageIndex + 4 : 6;

      end = end > this.pagesCount ? this.pagesCount : end;
      start = end - start < 6 ? start - (6 - (end - start)) : start;
      start = start < 0 ? 0 : start;

      this.paginationButtons = pagesArray.slice(start, end);

      this.firstPage = this.pageQuery.pageIndex === 0;
      this.lastPage = this.pageQuery.pageIndex + 1 === this.pagesCount;
    });

    this.pageChange$.next(this.pageQuery);
  }

  ngOnDestroy() {
    this.currentPostsSubscription.unsubscribe();
    this.pagesLengthSubscription.unsubscribe();
  }

  nextPage() {
    this.pageQuery.pageIndex += 1;
    this.pageChange$.next(this.pageQuery);
  }

  prevPage() {
    this.pageQuery.pageIndex -= 1;
    this.pageChange$.next(this.pageQuery);
  }

  navigateToPage(page) {
    this.pageQuery.pageIndex = page - 1;
    this.pageChange$.next(this.pageQuery);
  }

}
