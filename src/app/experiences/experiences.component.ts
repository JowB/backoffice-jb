import {Component, OnInit} from '@angular/core';
import {Experience} from '../model/experience';
import {ExperiencesService} from './experiences.service';

@Component({
    selector: 'app-experiences',
    templateUrl: './experiences.component.html',
    styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent implements OnInit {

    experiences: Experience[] | undefined;
    displayedColumns: string[] = ['id', 'company', 'description', 'job', 'languages', 'yearEnd', 'yearStart'];

    constructor(private experiencesService: ExperiencesService) {
        this.experiencesService.getAllExperiences()
            .subscribe(experiences => {
                this.experiences = experiences;
                console.log(experiences);
            });
    }

    ngOnInit(): void {
    }

}
