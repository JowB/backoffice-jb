import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Menu} from '../model/menu';
import { environment as env } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    constructor(private http: HttpClient) {
    }

    getAllElementsMenu(): Observable<Menu[]> {
        return this.http.get<Menu[]>(`${env.serv.serverUrl}/menu`);
    }

    getElementMenu(id: number): Observable<Menu> {
        return this.http.get<Menu>(`${env.serv.serverUrl}/menu/${id}`);
    }

    upsertElementMenu(menu: Menu): Observable<Menu> {
        return this.http.post<Menu>(`${env.serv.serverUrl}/menu`, menu);
    }

    deleteElementMenu(id: number): Observable<any> {
        return this.http.delete(`${env.serv.serverUrl}/menu/${id}`);
    }
}
