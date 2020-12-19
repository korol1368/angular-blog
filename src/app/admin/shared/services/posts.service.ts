import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from '../../../shared/interfaces/post.interface';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {delay, map} from 'rxjs/operators';
import {FbCreateResponse} from '../../../shared/interfaces/fb-create-response.interface';

@Injectable()
export class PostsService {
  constructor(
    private http: HttpClient
  ) {
  }

  create(post: Post): Observable<Post> {
    return this.http.post<FbCreateResponse>(
      `${environment.fbDbUrl}/posts.json`,
      post
    ).pipe(
      map((response: FbCreateResponse) => {
          return {
            ...post,
            id: response.name,
            date: new Date(post.date)
          };
        }
      )
    );
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.fbDbUrl}/posts.json`)
      .pipe(
        delay(1000),
        map((response: { [key: string]: any }) => {
          const posts: Post[] = [];
          for (const [id, data] of Object.entries(response)) {
            posts.push({
              ...data,
              id,
              date: new Date(data.date)
            });
          }
          return posts;
        })
      );
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`)
      .pipe(
        map((post: Post) => {
            return {
              ...post,
              id,
              date: new Date(post.date)
            };
          }
        )
      );
  }

  removePost(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`);
  }
}
