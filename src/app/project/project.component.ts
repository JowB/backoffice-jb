import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ProjectService} from './project.service';
import {Project} from '../model/project';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

    projectId: number | undefined;
    project: Project | undefined;
    projectForm: FormGroup;

    constructor(private route: ActivatedRoute, private projectService: ProjectService) {
        this.projectForm = new FormGroup({
            description: new FormControl(''),
            date: new FormControl(''),
            miniature: new FormControl(''),
            name: new FormControl(''),
            picture1: new FormControl(''),
            picture2: new FormControl(''),
            picture3: new FormControl(''),
            picture4: new FormControl(''),
            technologies: new FormControl(''),
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => this.projectId = +params.id);

        if (this.projectId) {
            this.getProject(this.projectId);
        }
    }

    getProject(id: number): void {
        this.projectService.getProductById(id)
            .subscribe(project => {
                this.project = project;
                this.updateFormValue(this.project);
            });
    }

    updateFormValue(project: Project): void {
        this.projectForm.controls.description.setValue(project.description);
        this.projectForm.controls.date.setValue(project.date);
        this.projectForm.controls.miniature.setValue(project.miniature);
        this.projectForm.controls.name.setValue(project.name);
        this.projectForm.controls.picture1.setValue(project.picture1);
        this.projectForm.controls.picture2.setValue(project.picture2);
        this.projectForm.controls.picture3.setValue(project.picture3);
        this.projectForm.controls.picture4.setValue(project.picture4);
        this.projectForm.controls.technologies.setValue(project.technologies);
    }

}
