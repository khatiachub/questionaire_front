import { BrowserModule,provideClientHydration  } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { DropdownModule } from 'primeng/dropdown';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AuthInterceptor } from './core/interceptor';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { AnswersComponent } from './pages/answers/answers.component';
import { RecievedQuestionsComponent } from './pages/recieved-questions/recieved-questions.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    AdminPanelComponent,
    AnswersComponent,
    RecievedQuestionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FloatLabelModule,
    InputGroupModule,
    DropdownModule,
    TableModule,
    InputSwitchModule,
    CheckboxModule
  ],
  providers: [provideClientHydration(),provideHttpClient(),
  provideHttpClient(withInterceptors([AuthInterceptor])) ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
