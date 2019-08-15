import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


const httpOptionsDefault = {
    headers: new HttpHeaders({

        // 'accessToken':localStorage.getItem('accessToken'),

        //'Authorization': 'Basic '+btoa('jchiquin:12345'),
        'Content-Type': 'application/json',

    })
};

@Injectable({
    providedIn: 'root'
})

export class GlobalService {

    apiBaseUrl: String = '';
    ModelId;
    Model: any = {};
    tipo: String;

    constructor(public http: HttpClient) {
        //this.apiBaseUrl = 'https://localhost:44362/api'; //endpoint local
        this.apiBaseUrl = 'https://jfalcon.azurewebsites.net/api'; //endpoint azure
    }

    getHeaderClear() {
        const httpOptions = {
            headers: new HttpHeaders({
            })
        };

        return httpOptions;
    }


    getModel(tipo: String, httpOptions = httpOptionsDefault) {

        return new Promise(resolve => {
            this.http.get(this.apiBaseUrl + "" + tipo, httpOptions).subscribe(data => {
                resolve(data);
                console.log(data);


            }, err => {
                console.log(err);

            })
        })
    }


    getModel_Id(id: String, tipo: String, httpOptions = httpOptionsDefault) {

        return new Promise(resolve => {
            this.http.get(this.apiBaseUrl + "" + tipo + '/' + id, httpOptions).subscribe((data: any) => {


                resolve(data);


            }, (err: any) => {
                console.log({ id: id, tipo: tipo, httpOptions: httpOptions });


            })
        })
    }

    addModel(model, tipo: String, httpOptions = httpOptionsDefault) {

        return new Promise(resolve => {
            this.http.post(this.apiBaseUrl + "" + tipo, model, httpOptions).subscribe((data: any) => {
                console.log(data);




                resolve(data);
            }, (err: any) => {
                console.log(err);


            })
        })
    }

    updateModel(id, model, tipo: String, httpOptions = httpOptionsDefault) {

        return new Promise(resolve => {
            this.http.put(this.apiBaseUrl + "" + tipo + '/' + id, model, httpOptions).subscribe((data: any) => {
                console.log(data);




                resolve(data);
            }, (err: any) => {
                console.log(err);


            })
        })
    }

    removeModel(id, tipo: String, httpOptions = httpOptionsDefault) {

        return new Promise(resolve => {
            this.http.delete(this.apiBaseUrl + "" + tipo + '/' + id, httpOptions).subscribe((data: any) => {
                console.log(data);




                resolve(data);
            }, (err: any) => {
                console.log(err);


            })
        })
    }


    getModel_Id_Notification(id: String, tipo: String, httpOptions = httpOptionsDefault) {

        return new Promise(resolve => {
            this.http.get(this.apiBaseUrl + "" + tipo + '/' + id, httpOptions).subscribe((data: any) => {
                resolve(data);

            }, (err: any) => {
                // console.log(err);

            })
        })
    }
}
