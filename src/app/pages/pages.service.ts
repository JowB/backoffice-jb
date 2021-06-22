import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '../model/page';

@Injectable({
    providedIn: 'root'
})
export class PagesService {

    constructor(private http: HttpClient) {
    }

    getAllPages(): Observable<Page[]> {
        return this.http.get<Page[]>('/api/pages');
    }

    getPageById(id: number): Observable<Page> {
        return this.http.get<Page>(`/api/pages/${id}`);
    }

    upsertPage(page: Page): Observable<Page> {
        return this.http.post<Page>('/api/pages', page);
    }

    deletePageById(id: number): Observable<any> {
        return this.http.delete<any>(`/api/pages/${id}`);
    }
}
