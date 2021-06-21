import {Component, OnInit} from '@angular/core';
import {Project} from '../model/project';
import {ProjectsService} from './projects.service';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

    projects: Project[] | undefined;
    displayedColumns: string[] = ['id', 'date', 'description', 'miniature', 'name', 'picture1', 'picture2', 'picture3', 'picture4', 'technologies'];

    constructor(private projectsService: ProjectsService) {
        this.projectsService.getallProject()
            .subscribe(projects => {
                    this.projects = projects;
                    console.log(this.projects);
                }
            );
    }

    ngOnInit(): void {
    }

}
