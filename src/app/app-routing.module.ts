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
import {AuthGuard} from '@auth0/auth0-angular';
import {MenuComponent} from './menu/menu.component';
import {MenuEditComponent} from './menu/menu-edit/menu-edit.component';
import {StudiesComponent} from './studies/studies.component';
import {StudyComponent} from './studies/study/study.component';

const routes: Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard]},
    {path: 'accueil', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'menu', component: MenuComponent, canActivate: [AuthGuard]},
    {path: 'menu/:id', component: MenuEditComponent, canActivate: [AuthGuard]},
    {path: 'pages', component: PagesComponent, canActivate: [AuthGuard]},
    {path: 'pages/:id', component: PageComponent, canActivate: [AuthGuard]},
    {path: 'experiences', component: ExperiencesComponent, canActivate: [AuthGuard]},
    {path: 'experiences/:id', component: ExperienceComponent, canActivate: [AuthGuard]},
    {path: 'parcours', component: StudiesComponent, canActivate: [AuthGuard]},
    {path: 'parcours/:id', component: StudyComponent, canActivate: [AuthGuard]},
    {path: 'projets', component: ProjectsComponent, canActivate: [AuthGuard]},
    {path: 'projets/:id', component: ProjectComponent, canActivate: [AuthGuard]},
    {path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
