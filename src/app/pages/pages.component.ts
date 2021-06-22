import {Component, OnInit} from '@angular/core';
import {Page} from '../model/page';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PagesService} from './pages.service';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

    pages: Page[] | undefined;
    displayedColumns: string[] = ['id', 'title', 'subTitle', 'actions'];
    pageForm: FormGroup;

    constructor(private route: ActivatedRoute, private pagesService: PagesService) {
        this.pageForm = new FormGroup({
            title: new FormControl(''),
            subTitle: new FormControl('')
        });

        this.getPages();
    }

    ngOnInit(): void {
    }

    getPages(): void {
        this.pagesService.getAllPages()
            .subscribe(pages => {
                this.pages = pages;
            });
    }

    deletePage(id: number): void {
        this.pagesService.deletePageById(id)
            .subscribe(() => {
                window.location.reload();
            });
    }

    createPage(): void {
        this.pagesService.upsertPage(this.pageForm.value)
            .subscribe(page => {
                window.location.reload();
            });
    }
}
