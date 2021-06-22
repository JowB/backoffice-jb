import {Component, OnInit} from '@angular/core';
import {Message} from '../model/message';
import {MessagesService} from './messages.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

    messages: Message[] | undefined;
    displayedColumns: string[] = ['id', 'email', 'content', 'actions'];

    constructor(private messagesService: MessagesService) {
        this.messagesService.getAllMessages()
            .subscribe(messages => {
                this.messages = messages;
            });
    }

    ngOnInit(): void {
    }

    deleteMessage(id: number): void {
        this.messagesService.deleteMessageById(id)
            .subscribe(() => {
                console.log('Message bien supprimé');
                window.location.reload();
            });
    }

}
