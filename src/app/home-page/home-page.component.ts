import { Component, OnInit } from '@angular/core';
import {PostsService} from '../admin/shared/services/posts.service';
import {Observable} from 'rxjs';
import {Post} from '../shared/interfaces/post.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  posts$: Observable<Post[]>;

  constructor(private postsService: PostsService) {
    this.posts$ = this.postsService.getAll();
  }

  ngOnInit(): void {
  }

}
