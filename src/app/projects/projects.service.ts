import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from '../model/project';

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {

    constructor(private http: HttpClient) {
    }


    getallProject(): Observable<Project[]> {
        return this.http.get<Project[]>('/api/projects');
    }
}
