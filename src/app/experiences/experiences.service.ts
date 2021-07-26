import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Experience} from '../model/experience';
import {Observable} from 'rxjs';
import {environment as env} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ExperiencesService {

    constructor(private http: HttpClient) {
    }

    getAllExperiences(): Observable<Experience[]> {
        return this.http.get<Experience[]>(`${env.serv.serverUrl}/experiences`);
    }

    getExperienceById(id: number): Observable<Experience> {
        return this.http.get<Experience>(`${env.serv.serverUrl}/experiences/${id}`);
    }

    upsertExperince(experience: Experience): Observable<Experience> {
        return this.http.post<Experience>(`${env.serv.serverUrl}/experiences`, experience);
    }

    deleteExperienceById(id: number): Observable<any> {
        return this.http.delete<any>(`${env.serv.serverUrl}/experiences/${id}`);
    }
}
