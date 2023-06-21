import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { AppComponent } from './app.component';
import { HomeComponent } from './user-pages/home/home.component';
import { MenuComponent } from './user-pages/menu/menu.component';
import { OfferdetailComponent } from './user-pages/offerdetail/offerdetail.component';
import { LoginComponent } from './user-pages/login/login.component';
import { SignupComponent } from './user-pages/signup/signup.component';
import { ApplicationComponent } from './user-pages/application/application.component';
import { ProfileComponent } from './user-pages/profile/profile.component';
import { ResultsComponent } from './user-pages/results/results.component';
import { ResultsdetailComponent } from './user-pages/resultsdetail/resultsdetail.component';

import { AdminHomeComponent } from './admin-pages/admin-home/admin-home.component';
import { AdminmenuComponent } from './admin-pages/adminmenu/adminmenu.component';

import { OfferserviceService } from './services/offerservice.service';
import { AdminLoginComponent } from './admin-pages/admin-login/admin-login.component';
import { OffersComponent } from './admin-pages/offers/offers.component';
import { EditOfferComponent } from './admin-pages/edit-offer/edit-offer.component';
import { EdittestComponent } from './admin-pages/edittest/edittest.component';
import { AddtestComponent } from './admin-pages/addtest/addtest.component';
import { CandidatesComponent } from './admin-pages/candidates/candidates.component';
import { AddofferComponent } from './admin-pages/addoffer/addoffer.component';
import { ApplicationdetailsComponent } from './admin-pages/applicationdetails/applicationdetails.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OfferdetailComponent,
    MenuComponent,
    LoginComponent,
    SignupComponent,
    ApplicationComponent,
    ProfileComponent,
    ResultsComponent,
    ResultsdetailComponent,
    AdminHomeComponent,
    AdminmenuComponent,
    AdminLoginComponent,
    OffersComponent,
    EditOfferComponent,
    EdittestComponent,
    AddtestComponent,
    CandidatesComponent,
    AddofferComponent,
    ApplicationdetailsComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatProgressBarModule,
  
  ],
  providers: [OfferserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
