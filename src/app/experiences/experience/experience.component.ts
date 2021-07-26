import {Component, OnInit} from '@angular/core';
import {ExperiencesService} from '../experiences.service';
import {Experience} from '../../model/experience';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

    experienceId: number | undefined;
    experience: Experience | undefined;
    experienceForm: FormGroup;
    isPatch = false;
    isDifferent = false;

    constructor(private route: ActivatedRoute, private router: Router, private experiencesService: ExperiencesService,
                private toastr: ToastrService) {
        this.experienceForm = new FormGroup({
            company: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required),
            id: new FormControl(null, Validators.required),
            job: new FormControl(null, Validators.required),
            languages: new FormControl(null, Validators.required),
            yearEnd: new FormControl(null, Validators.required),
            yearStart: new FormControl(null, Validators.required)
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => this.experienceId = +params.id);

        if (this.experienceId) {
            this.getExperience(this.experienceId);
        }

        this.experienceForm.valueChanges
            .subscribe(() => {
                if (this.isPatch) {
                    this.isDifferent = true;
                }
            });
    }

    getExperience(id: number): void {
        this.experiencesService.getExperienceById(id)
            .subscribe(experience => {
                this.experience = experience;
                this.updateFormValue(this.experience);
            }, () => {
                this.toastr.error('Erreur pendant la récupération de l\'expérience');
            });
    }

    updateFormValue(experience: Experience): void {
        this.experienceForm.patchValue({
            id: experience.id,
            company: experience.company,
            description: experience.description,
            job: experience.job,
            languages: experience.languages,
            yearStart: experience.yearStart,
            yearEnd: experience.yearEnd
        });

        this.isPatch = true;
    }

    saveExperience(): void {
        this.experiencesService.upsertExperince(this.experienceForm.value)
            .subscribe(() => {
                this.toastr.success('Modification réussie');
                setTimeout(() => {
                    this.router.navigate(['/experiences']);
                }, 3000);
            }, () => {
                this.toastr.error('Erreur pendant la modification');
            });
    }
}
