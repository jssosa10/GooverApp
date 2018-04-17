import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  userName: string;
  loggedIn: boolean;
  url = 'http://GooverlabLoadbalancer-2033977896.us-east-1.elb.amazonaws.com';

  constructor(private http: Http) {
    this.userName = '';
    this.loggedIn = false;
  }

  register(userInfo, headers) {
    let url = `${this.url}/register`;
    let iJon = JSON.stringify(userInfo);

    return this.http.post(url, iJon, new RequestOptions({ headers: headers }))
      .map(res => res.text())
      .map(res => {
        if (res == "error" || res == "nofound") {
          this.loggedIn = false;
        } else {
          // localStorage.setItem('token', res);
          this.userName = userInfo.username;
          this.loggedIn = true;
        }
        return this.loggedIn;
      });
  }

  login(userInfo, headers) {
    let url = `${this.url}/login`;
    let iJon = JSON.stringify(userInfo);
    return this.http.post(url, iJon, new RequestOptions({ headers: headers }))
      .map(res => res.text())
      .map(res => {
        if (res == "error" || res == "nofound") {
          this.loggedIn = false;
        } else {
          //localStorage.setItem('token', res);
          this.userName = userInfo.username;
          this.loggedIn = true;
        }
        return this.loggedIn;
      });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userName = '';
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getUserName() {
    return this.userName;
  }
}