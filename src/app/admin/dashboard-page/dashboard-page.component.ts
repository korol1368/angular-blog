import {Component, OnInit} from '@angular/core';
import {PostsService} from '../shared/services/posts.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  posts$ = this.postsService.getAll();

  constructor(
    private postsService: PostsService
  ) {
  }

  ngOnInit(): void {
    // this.postsService.getAll().subscribe((response) => {

    // });
  }

  removePost(id: string): void {
  }
}
