import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../shared/interfaces/user.interface';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {tap} from 'rxjs/operators';
import {FbAuthResponse} from '../../../shared/interfaces/fb-auth-response.interface';

@Injectable()

export class AuthService {
  constructor(private http: HttpClient) {
  }

  get token(): string {
    return '';
  }

  login(user: User): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken)
      );
  }

  logout(): void {

  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: FbAuthResponse): void {
    console.log (response);
  }
}
