import { LinearMortgage } from './../shared/models/linear-mortgage';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LinearMortgageService {

    constructor(private http: HttpClient) { }

    public getMortgageData(): Observable<LinearMortgage> {
        return this.http.get<LinearMortgage>('assets/my-mortgage-data.json');
    }
}