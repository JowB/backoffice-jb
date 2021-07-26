import {Component, OnInit} from '@angular/core';
import {Page} from '../../model/page';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PagesService} from '../pages.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

    pageId: number | undefined;
    page: Page | undefined;
    pageForm: FormGroup;
    isPatch = false;
    isDifferent = false;

    constructor(private route: ActivatedRoute, private router: Router, private pagesService: PagesService, private toastr: ToastrService) {
        this.pageForm = new FormGroup({
            id: new FormControl(null),
            title: new FormControl(null, Validators.required),
            subTitle: new FormControl(null),
            description: new FormControl(null)
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => this.pageId = +params.id);

        if (this.pageId) {
            this.getPage(this.pageId);
        }

        this.pageForm.valueChanges
            .subscribe(() => {
                if (this.isPatch) {
                    this.isDifferent = true;
                }
            });
    }

    getPage(pageId: number): void {
        this.pagesService.getPageById(pageId)
            .subscribe(page => {
                this.page = page;
                this.updateFormValue(this.page);
            }, () => {
                this.toastr.error('Erreur pendant la récupération de la page');
            });
    }

    updateFormValue(page: Page): void {
        this.pageForm.patchValue({
            id: page.id,
            title: page.title,
            subTitle: page.subTitle,
            description: page.description
        });

        this.isPatch = true;
    }

    upsertPage(): void {
        this.pagesService.upsertPage(this.pageForm.value)
            .subscribe(() => {
                this.toastr.success('Modification de la page réussie');
                setTimeout(() => {
                    this.router.navigate(['/pages']);
                }, 3000);
            }, () => {
                this.toastr.error('Erreur pendant la modification de la page');
            });
    }
}
