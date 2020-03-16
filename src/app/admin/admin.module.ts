import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ErrorComponent } from '../pages/error/error.component';
import { NavbarComponent } from '../components/navbar/navbar.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '', component: AdminPageComponent, children: [
                    {path:'', redirectTo: '/admin/login', pathMatch: 'full'},
                    {path:'login', component:LoginPageComponent},
                    { path: '404', component: ErrorComponent }
                ]
            },
        ])
    ],
    exports: [RouterModule],
    declarations: [AdminPageComponent, LoginPageComponent, ErrorComponent, NavbarComponent]
})
export class AdminModule {

}