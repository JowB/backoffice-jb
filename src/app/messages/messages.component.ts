import {Component, OnInit} from '@angular/core';
import {Message} from '../model/message';
import {MessagesService} from './messages.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

    messages: Message[] | undefined;
    displayedColumns: string[] = ['id', 'email', 'content', 'actions'];

    constructor(private messagesService: MessagesService, private toastr: ToastrService) {
    }

    ngOnInit(): void {
        this.getAllMessages();
    }

    getAllMessages(): void {
        this.messagesService.getAllMessages()
            .subscribe(messages => {
                this.messages = messages;
            }, () => {
                this.toastr.error('Erreur pendant la récupération des messages');
            });
    }

    deleteMessage(id: number): void {
        this.messagesService.deleteMessageById(id)
            .subscribe(() => {
                this.toastr.success('Suppression du message réussie');
                this.getAllMessages();
            }, () => {
                this.toastr.error('Erreur pendant la suppression du message');
            });
    }

}
