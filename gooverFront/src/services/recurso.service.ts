import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class RecursoService {
    exito: boolean;
    url = 'http://54.197.214.217:9000';

    constructor(private http: Http) {
        this.exito = false;
    }

    agregarRecurso(selectedFile, name, id) {
        let url = `${this.url}/recurso`;
        const uploadData=new FormData();
        uploadData.append('myFile', selectedFile);       
        uploadData.append('idT', id);  
        //console.log("nom "+ name);
        return this.http.post(url, uploadData)
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
}