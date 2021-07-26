import {Component, OnInit} from '@angular/core';
import {Study} from '../model/study';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StudiesService} from './studies.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-studies',
    templateUrl: './studies.component.html',
    styleUrls: ['./studies.component.css']
})
export class StudiesComponent implements OnInit {

    studies: Study[] | undefined;
    displayedColumns: string[] = ['id', 'diploma', 'secondDiploma', 'year', 'logo', 'actions'];
    studyForm: FormGroup;

    constructor(private studiesService: StudiesService, private toastr: ToastrService) {
        this.studyForm = new FormGroup({
            diploma: new FormControl(null, Validators.required),
            secondDiploma: new FormControl(null),
            year: new FormControl(null, Validators.required),
            logo: new FormControl(null, Validators.required),
        });
    }

    ngOnInit(): void {
        this.getAllStudies();
    }

    getAllStudies(): void {
        this.studiesService.getAllStudies()
            .subscribe(data => {
                this.studies = data;
            }, () => {
                this.toastr.error('Erreur pendant la récupération des études');
            });
    }

    createStudy(): void {
        this.studiesService.upsertStudy(this.studyForm.value)
            .subscribe(() => {
                this.toastr.success('Création de l\'étude réussie');
                this.getAllStudies();
                this.studyForm.reset();
            }, () => {
                this.toastr.error('Erreur pendant la création de l\'étude');
            });
    }

    deleteStudyById(id: number): void {
        this.studiesService.deleteStudyById(id)
            .subscribe(() => {
                this.toastr.success('Suppression de l\'étude réussie');
                this.getAllStudies();
            }, () => {
                this.toastr.error('Erreur pendant la suppression de l\'étude');
            });
    }
}
