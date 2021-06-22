import {Component, OnInit} from '@angular/core';
import {Page} from '../../model/page';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
import {PagesService} from '../pages.service';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

    pageId: number | undefined;
    page: Page | undefined;
    pageForm: FormGroup;

    constructor(private route: ActivatedRoute, private pagesService: PagesService) {
        this.pageForm = new FormGroup({
            title: new FormControl(''),
            subTitle: new FormControl('')
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => this.pageId = +params.id);

        if (this.pageId) {
            this.getPage(this.pageId);
        }
    }

    getPage(pageId: number): void {
        this.pagesService.getPageById(pageId)
            .subscribe(page => {
                this.page = page;
                this.updateFormValue(this.page);
            });
    }

    updateFormValue(page: Page): void {
        this.pageForm.controls.title.setValue(page.title);
        this.pageForm.controls.subTitle.setValue(page.subTitle);
    }
}
