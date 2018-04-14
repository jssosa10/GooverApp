import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class CursosService {
    url = 'http://54.197.214.217:9000';

    cursos: any;
    constructor(private http: Http) {
    }

    getCursos(headers) {
        let url = `${this.url}/courses`;

        return this.http.get(url,new RequestOptions({ headers: headers }))
            .map(res => res.json())
            .map(data => {
                if (data == "error" || data == "nofound") {
                    this.cursos = 'error';
                } else {
                    // localStorage.setItem('token', res);
                    console.log(data);
                    this.cursos = data;
                }
                return this.cursos;
            });
    }
}