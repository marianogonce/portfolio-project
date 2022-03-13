import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';
import {RouterModule} from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NabvarComponent } from './components/nabvar/nabvar.component';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { HardskillContainerComponent } from './components/hardskill-container/hardskill-container.component';
import { HardskillCardComponent } from './components/hardskill-card/hardskill-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { HardskillsService } from './services/hardskillsService/hardskills.service';
import { SectionContainerComponent } from './components/section-container/section-container.component';
import { AntecedentesCardComponent } from './components/antecedentes-card/antecedentes-card.component';
import { AntecedentesAcademicosContainerComponent } from './components/antecedentes-academicos-container/antecedentes-academicos-container.component';
import { AntecedentesAcedemicosService } from './services/antAcedemicosService/antecedentes-acedemicos.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SoftskillsContainerComponent } from './components/softskills-container/softskills-container.component';
import { SoftskillsBadgeComponent } from './components/softskills-badge/softskills-badge.component';
import { SoftskillsService } from './services/softSkillsService/softskills.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { FooterComponent } from './components/footer/footer.component';
import { SocialMediaContainerComponent } from './components/social-media-container/social-media-container.component';
import { AntecedentesLaboralesContainerComponent } from './components/antecedentes-laborales-container/antecedentes-laborales-container.component';
import { ProjectsContainerComponent } from './components/projects-container/projects-container.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectProfileComponent } from './components/project-profile/project-profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AntecedentesLaboralesService } from './services/antLaboralesService/antecedentes-laborales.service';
import { ProjectsService } from './services/projectService/projects.service';
import { AutorService } from './services/autorService/autor.service';
import {AuthService} from './services/authService/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ProgressSpinerComponent } from './components/tools/progress-spiner/progress-spiner.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AddButtonComponent } from './components/tools/add-button/add-button.component';
import {MatButtonModule} from '@angular/material/button';
import { AddSoftskillFormComponent } from './components/forms/add-softskill-form/add-softskill-form.component';
import { DeleteButtomComponent } from './components/tools/delete-buttom/delete-buttom.component';
import { AuthorProfileComponent } from './components/author-profile/author-profile.component';
import { EditButtomComponent } from './components/tools/edit-buttom/edit-buttom.component';
import { EditSoftskillFormComponent } from './components/forms/edit-softskill-form/edit-softskill-form.component';
import { Error500Component } from './components/error500/error500.component';
import { AuthGuard } from './services/auth-guard.service';
import { AddHardskillFormComponent } from './components/forms/add-hardskill-form/add-hardskill-form.component';
import { UpdateHardskillFormComponent } from './components/forms/update-hardskill-form/update-hardskill-form.component';
import { HardskillLevelService } from './services/hardskillLevelService/hardskill-level.service';


@NgModule({
  declarations: [
    AppComponent,
    NabvarComponent,
    MainContainerComponent,
    HardskillContainerComponent,
    HardskillCardComponent,
    SectionContainerComponent,
    AntecedentesCardComponent,
    AntecedentesAcademicosContainerComponent,
    SoftskillsContainerComponent,
    SoftskillsBadgeComponent,
    FooterComponent,
    SocialMediaContainerComponent,
    AntecedentesLaboralesContainerComponent,
    ProjectsContainerComponent,
    ProjectCardComponent,
    LoginComponent,
    ProjectProfileComponent,
    NotFoundComponent,
    ProgressSpinerComponent,
    AddButtonComponent,
    AddSoftskillFormComponent,
    DeleteButtomComponent,
    AuthorProfileComponent,
    EditButtomComponent,
    EditSoftskillFormComponent,
    Error500Component,
    AddHardskillFormComponent,
    UpdateHardskillFormComponent,
  ],
  imports: [
    BrowserModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSnackBarModule,
    AppRoutingModule,
    LayoutModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      {path: '', component: MainContainerComponent},
      {path: 'login', component: LoginComponent},
      {path: 'project/:idProject', component: ProjectProfileComponent },
      {path: 'newsoftskill', component: AddSoftskillFormComponent, canActivate: [AuthGuard] },
      {path: 'newhardskill', component: AddHardskillFormComponent, canActivate: [AuthGuard] },
      {path: 'updatesoftskill/:idSoftskill', component: EditSoftskillFormComponent, canActivate: [AuthGuard] },
      {path: 'error/:statuscode/:statusdescription', component: Error500Component },
      {path: '**', component: NotFoundComponent },
    ], {scrollPositionRestoration: 'top'}),
    BrowserAnimationsModule
  ],
  providers: [
    HardskillsService,
    AuthService, 
    AntecedentesAcedemicosService, 
    SoftskillsService, 
    AntecedentesLaboralesService, 
    ProjectsService, 
    AutorService,
    HardskillLevelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
