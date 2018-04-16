import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class TemaService {
    exito: boolean;
    url = 'http://54.197.214.217:9000';

    constructor(private http: Http) {
        this.exito = false;
    }

    agregarTema(headers, idCurso) {
        let url = `${this.url}/tema`;

        return this.http.post(url, new RequestOptions({ headers: headers }))
            .map(res => res.text())
            .map(res => {
                if (res == "error" || res == "nofound") {
                    this.exito=false;
                } else {
                    this.exito = true;
                }
                return this.exito;
            });
    }

    agregarSubtema(headers, idCurso, idTema) {
        let url = `${this.url}/login`;

        return this.http.post(url, new RequestOptions({ headers: headers }))
            .map(res => res.text())
            .map(res => {
                if (res == "error" || res == "nofound") {
                    this.exito=false;
                } else {
                    // localStorage.setItem('token', res);
                    this.exito= true;
                }
                return this.exito;
            });
    }
}