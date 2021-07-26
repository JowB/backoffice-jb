import {Component, OnInit} from '@angular/core';
import {Project} from '../model/project';
import {ProjectsService} from './projects.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

    projects: Project[] | undefined;
    displayedColumns: string[] = ['id', 'name', 'description', 'date', 'miniature', 'picture1', 'picture2', 'picture3', 'picture4', 'technologies', 'actions'];
    projectForm: FormGroup;

    constructor(private projectsService: ProjectsService, private toastr: ToastrService) {
        this.projectForm = new FormGroup({
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
        this.getAllProjects();
    }

    getAllProjects(): void {
        this.projectsService.getallProject()
            .subscribe(projects => {
                    this.projects = projects;
                }, () => {
                    this.toastr.error('Erreur lors de la récupération des projets');
                }
            );
    }

    deleteProject(id: number): void {
        this.projectsService.deleteProjectById(id)
            .subscribe(() => {
                this.toastr.success('Suppression du projet réussie');
                this.getAllProjects();
            }, () => {
                this.toastr.error('Erreur pendant la suppression du projet');
            });
    }

    createProject(): void {
        this.projectsService.upsertProject(this.projectForm.value)
            .subscribe(() => {
                this.toastr.success('Création du projet réussie');
                this.getAllProjects();
                this.projectForm.reset();
            }, () => {
                this.toastr.error('Erreur pendant la création du projet');
            });
    }
}
