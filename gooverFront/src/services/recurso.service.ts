import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class RecursoService {
    exito: any;
    recurso: any;
    url = 'http://GooverlabLoadbalancer-2033977896.us-east-1.elb.amazonaws.com';

    constructor(private http: Http) {
        this.exito = false;
    }

    agregarRecurso(selectedFile, name, idTema, subtema) {
        let url = `${this.url}/recurso`;
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

    getRecurso(headers,id) {
        console.log('idR '+ id);
        let url = `${this.url}/recurso?id=`+id;
        //console.log("nom "+ name);
        return this.http.get(url,{ headers: headers })
            .map(res => res.text())
            .map(res => {
                console.log(res);
                if (res == "error" || res == "nofound") {
                    this.recurso="error";
                } else {
                    this.recurso = res;
                }
                console.log(this.recurso);
                return this.recurso;
            });
    }
}