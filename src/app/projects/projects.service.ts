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

    upsertProject(project: Project): Observable<Project> {
        return this.http.post<Project>('/api/projects', project);
    }

    deleteProjectById(id: number): Observable<any> {
        return this.http.delete(`/api/projects/${id}`);
    }
}
