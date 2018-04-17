import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class InstitucionesService {
    url = 'http://GooverlabLoadbalancer-2033977896.us-east-1.elb.amazonaws.com';
    instituciones: any;
    constructor(private http: Http) {
    }

    getInstituciones(headers) {
        let url = `${this.url}/instituciones`;

        return this.http.get(url,new RequestOptions({ headers: headers }))
            .map(res => res.json())
            .map(data => {
                if (data == "error" || data == "nofound") {
                    this.instituciones = 'error';
                } else {
                    // localStorage.setItem('token', res);
                    console.log(data);
                    this.instituciones = data;
                }
                return this.instituciones;
            });
    }
}