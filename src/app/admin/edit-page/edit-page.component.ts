import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostsService} from '../shared/services/posts.service';
import {delay, switchMap} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../shared/interfaces/post.interface';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  loading = true;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService
  ) {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(
      delay(1000),
      switchMap((params: Params) => {
        return this.postService.getPostById(params.id);
      })
    ).subscribe((post: Post) => {
      this.form.patchValue({
        title: post.title,
        text: post.text,
      });
      this.loading = false;
    });
  }

  getFormControl(name: string): FormControl {
    return (this.form.get(name) as FormControl);
  }

  submitEditPost(): void {

  }
}
