import {Component, OnInit} from '@angular/core';
import {Menu} from '../model/menu';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MenuService} from './menu.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    menuElements: Menu[] | undefined;
    displayedColumns: string[] = ['id', 'item', 'link', 'actions'];
    menuForm: FormGroup;

    constructor(private menuService: MenuService, private toastr: ToastrService) {
        this.menuForm = new FormGroup({
            item: new FormControl(null, Validators.required),
            link: new FormControl(null, Validators.required)
        });
    }

    ngOnInit(): void {
        this.getAllElementsMenu();
    }

    getAllElementsMenu(): void {
        this.menuService.getAllElementsMenu()
            .subscribe(data => {
                this.menuElements = data;
            });
    }

    createMenuElement(): void {
        this.menuService.upsertElementMenu(this.menuForm.value)
            .subscribe(() => {
                this.toastr.success('Création réussie');
                this.getAllElementsMenu();
                this.menuForm.reset();
            }, () => {
                this.toastr.error('Erreur lors de la création');
            });
    }

    deleteMenuElement(id: number): void {
        this.menuService.deleteElementMenu(id)
            .subscribe(() => {
                this.toastr.success('Suppression réussie');
                this.getAllElementsMenu();
            }, () => {
                this.toastr.error('Erreur lors de la suppression');
            });
    }
}
