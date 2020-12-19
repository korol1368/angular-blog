import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../shared/interfaces/post.interface';
import {PostsService} from '../shared/services/posts.service';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form: FormGroup;

  constructor(
    private postsService: PostsService,
    private alertServise: AlertService,
  ) {
    this.form = new FormGroup({
      title: new FormControl(
        null,
        Validators.required
      ),
      author: new FormControl(
        null,
        Validators.required
      ),
      text: new FormControl(
        null,
        Validators.required
      )
    });
  }

  ngOnInit(): void {
  }

  getFormControl(name: string): FormControl {
    return (this.form.get(name) as FormControl);
  }

  submitFormPost(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    const post: Post = {
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text,
      date: new Date()
    };

    this.postsService.create(post).subscribe((response: Post) => {
      this.form.reset();
      this.alertServise.success('Пост успешно создан');
    });
  }
}
