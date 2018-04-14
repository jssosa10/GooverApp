import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class InstitucionesService {
    url = 'http://54.197.214.217:9000';

    instituciones: any;
    constructor(private http: Http) {
    }

    getInstituciones(headers) {
        let url = `${this.url}/instituciones`;

        return this.http.get(url,new RequestOptions({ headers: headers }))
            .map(res => res.text())
            .map(res => {
                if (res == "error" || res == "nofound") {
                    this.instituciones = 'error';
                } else {
                    // localStorage.setItem('token', res);
                    console.log(res);
                    this.instituciones = res;
                }
                return this.instituciones;
            });
    }
}