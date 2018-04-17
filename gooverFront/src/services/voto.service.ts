import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class CalificacionService {
    exito: boolean;
   // url = 'http://54.197.214.217:9000';
    url = 'https://httpbin.org';

    constructor(private http: Http) {
        this.exito = false;
    }

    votacion(userInfo) {
        //let url = `${this.url}/calificacion`;
        let url = `${this.url}/post`;
        let headerOptions: any = { 'Content-Type': 'application/json' };
        let headers = new Headers(headerOptions);
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
}