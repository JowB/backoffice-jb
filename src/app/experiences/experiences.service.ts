import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Experience} from '../model/experience';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ExperiencesService {

    constructor(private http: HttpClient) {
    }

    getAllExperiences(): Observable<Experience[]> {
        return this.http.get<Experience[]>('/api/experiences');
    }
}
