import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../shared/interfaces/user.interface';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {tap} from 'rxjs/operators';
import {FbAuthResponse} from '../../../shared/interfaces/fb-auth-response.interface';

@Injectable()

export class AuthService {

  readonly TOKEN_KEY = 'fb-token';
  readonly TOKEN_EXP_KEY = 'fb-token-exp';

  constructor(private http: HttpClient) {
  }

  get token(): string | null {
    const fbTokenExp = localStorage.getItem(this.TOKEN_EXP_KEY);
    if (fbTokenExp) {
      const expDate = new Date(fbTokenExp);
      if (new Date() > expDate) {
        this.logout();
        return null;
      }
    } else {
      this.logout();
      return null;
    }

    return localStorage.getItem(this.TOKEN_KEY);
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post<FbAuthResponse>
    (
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
      user
    )
      .pipe(
        tap(this.setToken)
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_EXP_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: FbAuthResponse): void {
    const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
    localStorage.setItem(this.TOKEN_KEY, response.idToken);
    localStorage.setItem(this.TOKEN_EXP_KEY, expDate.toString());
  }
}
