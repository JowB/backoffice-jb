import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Project} from '../../model/project';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(private http: HttpClient) {
    }

    getProductById(id: number): Observable<Project> {
        return this.http.get<Project>(`/api/projects/${id}`);
    }

}
