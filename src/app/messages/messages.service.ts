import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../model/message';

@Injectable({
    providedIn: 'root'
})
export class MessagesService {

    constructor(private http: HttpClient) {
    }

    getAllMessages(): Observable<Message[]> {
        return this.http.get<Message[]>('/api/messages');
    }

    deleteMessageById(id: number): Observable<any> {
        return this.http.delete(`/api/messages/${id}`);
    }
}
