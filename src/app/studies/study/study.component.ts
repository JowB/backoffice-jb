import {Component, OnInit} from '@angular/core';
import {Study} from '../../model/study';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {StudiesService} from '../studies.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-study',
    templateUrl: './study.component.html',
    styleUrls: ['./study.component.css']
})
export class StudyComponent implements OnInit {

    studyId: number | undefined;
    study: Study | undefined;
    studyForm: FormGroup;
    isPatch = false;
    isDifferent = false;

    constructor(private route: ActivatedRoute, private router: Router, private studiesService: StudiesService,
                private toastr: ToastrService) {
        this.studyForm = new FormGroup({
            id: new FormControl(null),
            diploma: new FormControl(null, Validators.required),
            secondDiploma: new FormControl(null),
            year: new FormControl(null, Validators.required),
            logo: new FormControl(null, Validators.required)
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => this.studyId = +params.id);

        if (this.studyId) {
            this.getStudy(this.studyId);
        }

        this.studyForm.valueChanges
            .subscribe(() => {
                if (this.isPatch) {
                    this.isDifferent = true;
                }
        });
    }

    getStudy(studyId: number): void {
        this.studiesService.getStudyById(studyId)
            .subscribe(data => {
                this.study = data;
                this.updateFormValue(this.study);
            }, () => {
                this.toastr.error('Erreur pendant la récupération de l\'étude');
            });
    }

    updateFormValue(study: Study): void {
        this.studyForm.patchValue({
            id: study.id,
            diploma: study.diploma,
            secondDiploma: study.secondDiploma,
            year: study.year,
            logo: study.logo
        });

        this.isPatch = true;
    }

    editStudy(): void {
        this.studiesService.upsertStudy(this.studyForm.value)
            .subscribe(() => {
                this.toastr.success('L\'étude à bien été modifié');
                setTimeout(() => {
                    this.router.navigate(['/parcours']);
                }, 3000);
            }, () => {
                this.toastr.error('Erreur pendant la modification de l\'étude');
            });
    }
}
