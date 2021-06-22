import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from '@auth0/auth0-angular';
import {environment as env} from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import {MatTableModule} from '@angular/material/table';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './projects/project/project.component';
import {ProjectService} from './projects/project/project.service';
import {HttpClientModule} from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {ProjectsService} from './projects/projects.service';
import { ExperiencesComponent } from './experiences/experiences.component';
import { MessagesComponent } from './messages/messages.component';
import {MessagesService} from './messages/messages.service';
import { ExperienceComponent } from './experiences/experience/experience.component';
import { PagesComponent } from './pages/pages.component';
import {PagesService} from './pages/pages.service';
import { PageComponent } from './pages/page/page.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ProjectsComponent,
        ProjectComponent,
        ExperiencesComponent,
        MessagesComponent,
        ExperienceComponent,
        PagesComponent,
        PageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule.forRoot({
            ...env.auth
        }),
        BrowserAnimationsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatTableModule,
        HttpClientModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule
    ],
    providers: [
        ProjectService,
        ProjectsService,
        MessagesService,
        PagesService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
