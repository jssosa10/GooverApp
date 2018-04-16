import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class RecursoService {
    exito: boolean;
    url = 'http://54.197.214.217:9000';
    //url = 'https://httpbin.org/post';

    constructor(private http: Http) {
        this.exito = false;
    }

    agregarRecurso(selectedFile, name, idTema, subtema) {
        let url = `${this.url}/recurso`;
        //let url = `${this.url}`;
        const uploadData=new FormData();
        uploadData.append('myFile', selectedFile);       
        uploadData.append('idT', idTema); 
        if(subtema)
        {
            uploadData.append('idS', subtema.id); 
        } 
        //console.log("nom "+ name);
        return this.http.post(url, uploadData)
            .map(res => res.text())
            .map(res => {
                console.log(res);
                if (res == "error" || res == "nofound") {
                    this.exito=false;
                } else {
                    this.exito = true;
                }
                return this.exito;
            });
    }
}