import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { CompanyComponent } from './pages/company/company.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CreateCompanyComponent } from './pages/create-company/create-company.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ErrorComponent } from './pages/error/error.component';
import { CreditComponent } from './pages/credit/credit.component';
import { DashboardPageComponent } from './admin/dashboard-page/dashboard-page.component';
import { EditPageComponent } from './admin/edit-page/edit-page.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'create', component: CreateCompanyComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'credit', component: CreditComponent },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'creditInfo', component: EditPageComponent },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
