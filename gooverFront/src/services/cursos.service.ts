import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class CursosService {
    url = 'http://GooverlabLoadbalancer-2033977896.us-east-1.elb.amazonaws.com';

    cursos: any;
    constructor(private http: Http) {
    }

    getCursos(headers, id) {
        let url = `${this.url}/AllCourses`;
        if (id!==undefined) {
            url = `${this.url}/courses?id=` + id;
        }
        return this.http.get(url, { headers: headers })
            .map(res => res.json())
            .map(data => {
                if (data == "error" || data == "nofound") {
                    this.cursos = 'error';
                } else {
                    // localStorage.setItem('token', res);
                    this.cursos = data;
                }
                return this.cursos;
            });
    }

}