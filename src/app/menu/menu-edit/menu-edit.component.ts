import {Component, OnInit} from '@angular/core';
import {Menu} from '../../model/menu';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MenuService} from '../menu.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-menu-edit',
    templateUrl: './menu-edit.component.html',
    styleUrls: ['./menu-edit.component.css']
})
export class MenuEditComponent implements OnInit {

    menuItemId: number | undefined;
    menuItem: Menu | undefined;
    menuForm: FormGroup;
    isPatch = false;
    isDifferent = false;

    constructor(private route: ActivatedRoute, private router: Router, private menuService: MenuService, private toastr: ToastrService) {
        this.menuForm = new FormGroup({
            id: new FormControl(null),
            item: new FormControl(null, Validators.required),
            link: new FormControl(null, Validators.required)
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => this.menuItemId = +params.id);

        if (this.menuItemId) {
            this.getMenuItem(this.menuItemId);
        }

        this.menuForm.valueChanges.subscribe(() => {
            if (this.isPatch) {
                this.isDifferent = true;
            }
        });
    }

    getMenuItem(menuItemId: number): void {
        this.menuService.getElementMenu(menuItemId)
            .subscribe(data => {
                this.menuItem = data;
                this.updateFormValue(this.menuItem);
            }, () => {
                this.toastr.error('Erreur pendant la récupération du menu');
            });
    }

    updateFormValue(menuItem: Menu): void {
        this.menuForm.patchValue({
            id: menuItem.id,
            item: menuItem.item,
            link: menuItem.link
        });

        this.isPatch = true;
    }

    editMenuItem(): void {
        this.menuService.upsertElementMenu(this.menuForm.value)
            .subscribe(() => {
                this.toastr.success('L\'élément à bien été modifié');
                setTimeout(() => {
                    this.router.navigate(['/menu']);
                }, 3000);
            }, () => {
                this.toastr.error('Erreur pendant la modificationde l\'élément');
            });
    }
}
