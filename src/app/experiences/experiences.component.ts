import {Component, OnInit} from '@angular/core';
import {Experience} from '../model/experience';
import {ExperiencesService} from './experiences.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-experiences',
    templateUrl: './experiences.component.html',
    styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent implements OnInit {

    experiences: Experience[] | undefined;
    displayedColumns: string[] = ['id', 'company', 'job', 'description', 'languages', 'yearStart', 'yearEnd', 'actions'];
    experienceForm: FormGroup;

    constructor(private experiencesService: ExperiencesService, private toastr: ToastrService) {
        this.experienceForm = new FormGroup({
            company: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required),
            job: new FormControl(null, Validators.required),
            languages: new FormControl(null, Validators.required),
            yearStart: new FormControl(null, Validators.required),
            yearEnd: new FormControl(null, Validators.required)
        });
    }

    ngOnInit(): void {
        this.getAllExperiences();
    }

    getAllExperiences(): void {
        this.experiencesService.getAllExperiences()
            .subscribe(experiences => {
                this.experiences = experiences;
            }, () => {
                this.toastr.error('Erreur lors de la récupération des expériences');
            });
    }

    deleteExperience(id: number): void {
        this.experiencesService.deleteExperienceById(id)
            .subscribe(() => {
                this.toastr.success('Suppression réussie');
                this.getAllExperiences();
            }, () => {
                this.toastr.error('Erreur pendant la suppression');
            });
    }

    createExperience(): void {
        this.experiencesService.upsertExperince(this.experienceForm.value)
            .subscribe(() => {
                this.toastr.success('Création de l\'expérience réussie');
                this.getAllExperiences();
                this.experienceForm.reset();
            }, () => {
                this.toastr.error('Erreur pendant la création');
            });
    }
}
