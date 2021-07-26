import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../model/message';
import { environment as env } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MessagesService {

    constructor(private http: HttpClient) {
    }

    getAllMessages(): Observable<Message[]> {
        return this.http.get<Message[]>(`${env.serv.serverUrl}/messages`);
    }

    deleteMessageById(id: number): Observable<any> {
        return this.http.delete(`${env.serv.serverUrl}/messages/${id}`);
    }
}
