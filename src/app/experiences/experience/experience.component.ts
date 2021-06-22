import {Component, OnInit} from '@angular/core';
import {ExperiencesService} from '../experiences.service';
import {Experience} from '../../model/experience';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

    experienceId: number | undefined;
    experience: Experience | undefined;
    experienceForm: FormGroup;

    constructor(private route: ActivatedRoute, private experiencesService: ExperiencesService) {
        this.experienceForm = new FormGroup({
            company: new FormControl(''),
            description: new FormControl(''),
            id: new FormControl(''),
            job: new FormControl(''),
            languages: new FormControl(''),
            yearEnd: new FormControl(''),
            yearStart: new FormControl('')
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => this.experienceId = +params.id);

        if (this.experienceId) {
            this.getExperience(this.experienceId);
        }
    }

    getExperience(id: number): void {
        this.experiencesService.getExperienceById(id)
            .subscribe(experience => {
                this.experience = experience;
                this.updateFormValue(this.experience);
            });
    }

    updateFormValue(experience: Experience): void {
        this.experienceForm.controls.company.setValue(experience.company);
        this.experienceForm.controls.description.setValue(experience.description);
        this.experienceForm.controls.id.setValue(experience.id);
        this.experienceForm.controls.job.setValue(experience.job);
        this.experienceForm.controls.languages.setValue(experience.languages);
        this.experienceForm.controls.yearEnd.setValue(experience.yearEnd);
        this.experienceForm.controls.yearStart.setValue(experience.yearStart);

        console.log(this.experienceForm.value, this.experience);
    }

    saveExperience(): void {
        if (this.experienceForm.value !== this.experience) {
            console.log('ok good');
        } else {
            console.log('pas différent');
        }
    }
}
