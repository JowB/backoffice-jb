import {Component, OnInit} from '@angular/core';
import {Project} from '../model/project';
import {ProjectsService} from './projects.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

    projects: Project[] | undefined;
    displayedColumns: string[] = ['id', 'date', 'description', 'miniature', 'name', 'picture1', 'picture2', 'picture3', 'picture4', 'technologies', 'actions'];
    projectForm: FormGroup;

    constructor(private projectsService: ProjectsService) {
        this.projectsService.getallProject()
            .subscribe(projects => {
                    this.projects = projects;
                    console.log(this.projects);
                }
            );

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
    }

    deleteProject(id: number): void {
        this.projectsService.deleteProjectById(id)
            .subscribe(() => {
                window.location.reload();
            });
    }

    createProject(): void {
        this.projectsService.upsertProject(this.projectForm.value)
            .subscribe(project => {
                window.location.reload();
            });
    }
}
