import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Imports Modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';


// Imports Components
import { LoginComponent } from './login/login.component';
import { DialogComponent } from './dialog/dialog.component';
import { RegistrationComponent } from './registration/registration.component';
import { DatePipe } from '@angular/common';
import { IconModelComponent } from './icon-model/icon-model.component';
import { HomeComponent } from './home/home.component';
import { SidenavcontentComponent } from './sidenavcontent/sidenavcontent.component';
import { HeaderComponent } from './header/header.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { ExplainationComponent } from './explaination/explaination.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { FormatTimePipe } from './format-time.pipe';
import { QuizConfigDialogComponent } from './quiz-config-dialog/quiz-config-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DialogComponent,
    RegistrationComponent,
    IconModelComponent,
    HomeComponent,
    SidenavcontentComponent,
    HeaderComponent,
    QuizComponent,
    ResultComponent,
    ExplainationComponent,
    AddQuestionsComponent,
    FormatTimePipe,
    QuizConfigDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatNativeDateModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDividerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatRippleModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    DatePipe,
    FormatTimePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
