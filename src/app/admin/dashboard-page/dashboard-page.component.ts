import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../shared/services/posts.service';
import {Post} from '../../shared/interfaces/post.interface';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

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
    private postsService: PostsService,
    private alertService: AlertService,
  ) {
  }

  ngOnInit(): void {
    const subscription1$ = this.postsService.getAll().subscribe((response) => {
      this.posts = response;
    });
    this.subscriptions.add(subscription1$);
  }

  removePost(post: Post): void {
    if (post.id){
      const subscription2$ = this.postsService.removePost(post.id).subscribe(() => {
        this.posts = this.posts.filter(item => item.id !== post.id);
        this.alertService.danger('Пост удален');
      });
      this.subscriptions.add(subscription2$);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    console.log (this.subscriptions);
  };
}
