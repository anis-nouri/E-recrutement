import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './user-pages/home/home.component';
import { LoginComponent } from './user-pages/login/login.component';
import { OfferdetailComponent } from './user-pages/offerdetail/offerdetail.component';
import { SignupComponent } from './user-pages/signup/signup.component';
import { ApplicationComponent } from './user-pages/application/application.component';
import { ProfileComponent } from './user-pages/profile/profile.component';
import { ResultsComponent } from './user-pages/results/results.component';
import { ResultsdetailComponent } from './user-pages/resultsdetail/resultsdetail.component';
import { AdminHomeComponent } from './admin-pages/admin-home/admin-home.component';
import { AdminLoginComponent } from './admin-pages/admin-login/admin-login.component';
import { OffersComponent } from './admin-pages/offers/offers.component';
import { EditOfferComponent } from './admin-pages/edit-offer/edit-offer.component';
import { EdittestComponent } from './admin-pages/edittest/edittest.component';
import { AddtestComponent } from './admin-pages/addtest/addtest.component';
import { CandidatesComponent } from './admin-pages/candidates/candidates.component';
import { AddofferComponent } from './admin-pages/addoffer/addoffer.component';
import { ApplicationdetailsComponent } from './admin-pages/applicationdetails/applicationdetails.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'offerdetail/:id', component: OfferdetailComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'application/:id', component: ApplicationComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'appdetail/:id', component: ResultsdetailComponent},

  { path: 'dashboard', component: AdminHomeComponent},
  { path: 'admin', component: AdminLoginComponent},
  { path: 'offers', component: OffersComponent},
  { path: 'editoffer/:id', component: EditOfferComponent },
  { path: 'edittest/:id', component: EdittestComponent },
  { path: 'addtest/:id', component: AddtestComponent },
  { path: 'candidates', component: CandidatesComponent },
  { path: 'addoffer', component: AddofferComponent },
  { path: 'appdetails/:offerid/:userid', component: ApplicationdetailsComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
