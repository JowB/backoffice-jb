import {Component, OnInit} from '@angular/core';
import {Page} from '../model/page';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PagesService} from './pages.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

    pages: Page[] | undefined;
    displayedColumns: string[] = ['id', 'title', 'subTitle', 'description', 'actions'];
    pageForm: FormGroup;

    constructor(private route: ActivatedRoute, private pagesService: PagesService, private toastr: ToastrService) {
        this.pageForm = new FormGroup({
            title: new FormControl(null, Validators.required),
            subTitle: new FormControl(null),
            description: new FormControl(null)
        });
    }

    ngOnInit(): void {
        this.getPages();
    }

    getPages(): void {
        this.pagesService.getAllPages()
            .subscribe(pages => {
                this.pages = pages;
            }, () => {
                this.toastr.error('Erreur pendant la récupération des pages');
            });
    }

    deletePage(id: number): void {
        this.pagesService.deletePageById(id)
            .subscribe(() => {
                this.toastr.success('Suppression de la page réussie');
                this.getPages();
            }, () => {
                this.toastr.error('Erreur pendant la suppression de la page');
            });
    }

    createPage(): void {
        this.pagesService.upsertPage(this.pageForm.value)
            .subscribe(() => {
                this.toastr.success('Création de la page réussie');
                this.getPages();
                this.pageForm.reset();
            }, () => {
                this.toastr.error('Erreur pendant la création de la page');
            });
    }
}
