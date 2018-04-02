import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FlashMessagesModule} from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import {MatRadioModule} from '@angular/material/radio';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddTestComponent } from './add-test/add-test.component';
import { TakeTestComponent } from './take-test/take-test.component';
import { ViewResultComponent } from './view-result/view-result.component';

import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component'

import {TestService} from './services/test.service';
import {AuthService} from './services/auth.service';
import {ValidateService} from './services/validate.service';
import { TestComponent } from './test/test.component';

const appRoutes: Routes = [
  {path: '' , component: HomePageComponent},
  {path: 'AddTest' , component: AddTestComponent,canActivate: [AuthGuard]},
  {path: 'TakeTest' , component: TakeTestComponent,canActivate: [AuthGuard]},
  {path: 'signup' , component: SignupComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'test' , component: TestComponent}
  
];
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AddTestComponent,
    TakeTestComponent,
    ViewResultComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    MatRadioModule
  ],
  providers: [TestService,AuthService,ValidateService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
