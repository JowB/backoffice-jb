import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProjectsComponent} from './projects/projects.component';
import {ProjectComponent} from './projects/project/project.component';
import {ExperiencesComponent} from './experiences/experiences.component';
import {MessagesComponent} from './messages/messages.component';
import {ExperienceComponent} from './experiences/experience/experience.component';
import {PagesComponent} from './pages/pages.component';
import {PageComponent} from './pages/page/page.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'pages', component: PagesComponent},
    {path: 'pages/:id', component: PageComponent},
    {path: 'projects', component: ProjectsComponent},
    {path: 'projects/:id', component: ProjectComponent},
    {path: 'experiences', component: ExperiencesComponent},
    {path: 'experiences/:id', component: ExperienceComponent},
    {path: 'messages', component: MessagesComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
