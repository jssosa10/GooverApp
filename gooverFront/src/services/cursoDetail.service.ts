import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class CursoDetailService {
    url = 'http://GooverlabLoadbalancer-2033977896.us-east-1.elb.amazonaws.com';

    cursos: any;
    constructor(private http: Http) {
    }

    getCurso(headers, id) {

        let url = `${this.url}/course?id=` + id;

        return this.http.get(url, { headers: headers })
            .map(res => res.json())
            .map(data => {
                if (data == "error" || data == "nofound") {
                    this.cursos = 'error';
                } else {
                    // localStorage.setItem('token', res);
                    this.cursos = data;
                    console.log(data);
                }
                return this.cursos;
            });
    }

}