import {Component, OnInit} from '@angular/core';
import {Experience} from '../model/experience';
import {ExperiencesService} from './experiences.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-experiences',
    templateUrl: './experiences.component.html',
    styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent implements OnInit {

    experiences: Experience[] | undefined;
    displayedColumns: string[] = ['id', 'company', 'description', 'job', 'languages', 'yearEnd', 'yearStart', 'actions'];
    experienceForm: FormGroup;

    constructor(private experiencesService: ExperiencesService) {
        this.experiencesService.getAllExperiences()
            .subscribe(experiences => {
                this.experiences = experiences;
                console.log(experiences);
            });

        this.experienceForm = new FormGroup({
            company: new FormControl(''),
            description: new FormControl(''),
            job: new FormControl(''),
            languages: new FormControl(''),
            yearStart: new FormControl(''),
            yearEnd: new FormControl('')
        });
    }

    ngOnInit(): void {
    }

    deleteExperience(id: number): void {
        this.experiencesService.deleteExperienceById(id)
            .subscribe(() => {
                window.location.reload();
            });
    }

    createExperience(): void {
        this.experiencesService.upsertExperince(this.experienceForm.value)
            .subscribe(experience => {
                window.location.reload();
            });
    }
}
