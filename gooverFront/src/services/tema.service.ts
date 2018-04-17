import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class TemaService {
    exito: boolean;
    url = 'http://GooverlabLoadbalancer-2033977896.us-east-1.elb.amazonaws.com';

    constructor(private http: Http) {
        this.exito = false;
    }

    agregarTema(userInfo) {
        let headerOptions: any = { 'Content-Type': 'application/json' };
        let headers = new Headers(headerOptions);
        let url = `${this.url}/tema`;
        console.log(userInfo)
        let iJon = JSON.stringify(userInfo);
        return this.http.post(url, iJon, new RequestOptions({ headers: headers }))
            .map(res => res.text())
            .map(res => {
                if (res == "error" || res == "nofound") {
                    this.exito = false;
                } else {
                    this.exito = true;
                }
                return this.exito;
            });
    }

    agregarSubtema(userInfo) {
        let headerOptions: any = { 'Content-Type': 'application/json' };
        let headers = new Headers(headerOptions);
        let url = `${this.url}/subtema`;
        console.log(userInfo)
        console.log(headers)
        let iJon = JSON.stringify(userInfo);
        return this.http.post(url, iJon, new RequestOptions({ headers: headers }))
            .map(res => res.text())
            .map(res => {
                if (res == "error" || res == "nofound") {
                    this.exito = false;
                } else {
                    this.exito = true;
                }
                return this.exito;
            });
    }
}