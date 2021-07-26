import {Injectable} from '@angular/core';
import { environment as env } from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Study} from '../model/study';

@Injectable({
    providedIn: 'root'
})
export class StudiesService {

    constructor(private http: HttpClient) {
    }

    getAllStudies(): Observable<Study[]> {
        return this.http.get<Study[]>(`${env.serv.serverUrl}/studies`);
    }

    getStudyById(id: number): Observable<Study> {
        return this.http.get<Study>(`${env.serv.serverUrl}/studies/${id}`);
    }

    upsertStudy(study: Study): Observable<Study> {
        return this.http.post<Study>(`${env.serv.serverUrl}/studies`, study);
    }

    deleteStudyById(id: number): Observable<any> {
        return this.http.delete(`${env.serv.serverUrl}/studies/${id}`);
    }
}
