import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from '../model/project';
import { environment as env } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {

    constructor(private http: HttpClient) {
    }

    getallProject(): Observable<Project[]> {
        return this.http.get<Project[]>(`${env.serv.serverUrl}/projects`);
    }

    getProjectById(id: number): Observable<Project> {
        return this.http.get<Project>(`${env.serv.serverUrl}/projects/${id}`);
    }

    upsertProject(project: Project): Observable<Project> {
        return this.http.post<Project>(`${env.serv.serverUrl}/projects`, project);
    }

    deleteProjectById(id: number): Observable<any> {
        return this.http.delete(`${env.serv.serverUrl}/projects/${id}`);
    }
}
