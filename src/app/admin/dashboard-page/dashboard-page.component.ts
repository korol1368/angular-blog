import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../shared/services/posts.service';
import {Post} from '../../shared/interfaces/post.interface';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  searchStr = '';
  subscriptions: Subscription = new Subscription();

  constructor(
    private postsService: PostsService
  ) {
  }

  ngOnInit(): void {
    const subscription1$ = this.postsService.getAll().subscribe((response) => {
      this.posts = response;
    });
    this.subscriptions.add(subscription1$);
  }

  removePost(id: string): void {
    const subscription2$ = this.postsService.removePost(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
    });
    this.subscriptions.add(subscription2$);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
