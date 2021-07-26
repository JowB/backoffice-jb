import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Project} from '../../model/project';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectsService} from '../projects.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

    projectId: number | undefined;
    project: Project | undefined;
    projectForm: FormGroup;
    isPatch = false;
    isDifferent = false;

    constructor(private route: ActivatedRoute, private router: Router, private projectService: ProjectsService,
                private toastr: ToastrService) {
        this.projectForm = new FormGroup({
            id: new FormControl(null),
            description: new FormControl(null, Validators.required),
            date: new FormControl(null, Validators.required),
            miniature: new FormControl(null, Validators.required),
            name: new FormControl(null, Validators.required),
            picture1: new FormControl(null, Validators.required),
            picture2: new FormControl(null, Validators.required),
            picture3: new FormControl(null, Validators.required),
            picture4: new FormControl(null, Validators.required),
            technologies: new FormControl(null, Validators.required),
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => this.projectId = +params.id);

        if (this.projectId) {
            this.getProject(this.projectId);
        }

        this.projectForm.valueChanges
            .subscribe(() => {
                if (this.isPatch) {
                    this.isDifferent = true;
                }
            });
    }

    getProject(id: number): void {
        this.projectService.getProjectById(id)
            .subscribe(project => {
                this.project = project;
                this.updateFormValue(this.project);
            }, () => {
                this.toastr.error('Erreur pendant la récupération du projet');
            });
    }

    updateFormValue(project: Project): void {
        this.projectForm.patchValue({
            id: project.id,
            description: project.description,
            date: project.date,
            miniature: project.miniature,
            name: project.name,
            picture1: project.picture1,
            picture2: project.picture2,
            picture3: project.picture3,
            picture4: project.picture4,
            technologies: project.technologies,
        });

        this.isPatch = true;
    }

    upsertProject(): void {
        this.projectService.upsertProject(this.projectForm.value)
            .subscribe(data => {
                this.toastr.success('Modification du projet réussie');
                setTimeout(() => {
                    this.router.navigate(['/projets']);
                }, 3000);
            }, () => {
                this.toastr.error('Erreur pendant la modification du projet');
            });
    }
}
