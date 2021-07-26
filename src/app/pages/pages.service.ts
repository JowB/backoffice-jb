import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '../model/page';
import { environment as env } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PagesService {

    constructor(private http: HttpClient) {
    }

    getAllPages(): Observable<Page[]> {
        return this.http.get<Page[]>(`${env.serv.serverUrl}/pages`);
    }

    getPageById(id: number): Observable<Page> {
        return this.http.get<Page>(`${env.serv.serverUrl}/pages/${id}`);
    }

    upsertPage(page: Page): Observable<Page> {
        return this.http.post<Page>(`${env.serv.serverUrl}/pages`, page);
    }

    deletePageById(id: number): Observable<any> {
        return this.http.delete<any>(`${env.serv.serverUrl}/pages/${id}`);
    }
}
