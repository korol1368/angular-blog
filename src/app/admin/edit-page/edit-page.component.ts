import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PostsService} from '../shared/services/posts.service';
import {delay, switchMap} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../shared/interfaces/post.interface';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  loading = true;
  form: FormGroup;
  postId = '';
  subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
    private router: Router,
  ) {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    const subscription1$ = this.route.params.pipe(
      delay(1000),
      switchMap((params: Params) => {
        return this.postService.getPostById(params.id);
      })
    ).subscribe((post: Post) => {
      this.postId = String(post.id);
      this.form.patchValue({
        title: post.title,
        text: post.text,
      });
      this.loading = false;
    });
    this.subscriptions.add(subscription1$);
  }

  getFormControl(name: string): FormControl {
    return (this.form.get(name) as FormControl);
  }

  submitEditPost(): void {
    if (this.form.invalid) {
      return;
    }

    const subscription2$ = this.postService.updatePost(
      this.postId,
      this.form.value.title,
      this.form.value.text,
    ).subscribe(() => {
      this.router.navigateByUrl('/admin/dashboard');
    });
    this.subscriptions.add(subscription2$);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
