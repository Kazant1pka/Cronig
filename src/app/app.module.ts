import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CompanyComponent } from './pages/company/company.component';
import { MainComponent } from './pages/main/main.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateCompanyComponent } from './pages/create-company/create-company.component';
import { ShowCompanyComponent } from './components/show-company/show-company.component';
import { CommentsComponent } from './pages/company/comments/comments.component';
import { BonusComponent } from './pages/bonus/bonus.component';
import { NewsComponent } from './pages/company/news/news.component';
import { DragDropFileUploadDirective } from './directives/drag-drop-file-upload.directive';
import { DragDropComponentComponent } from './pages/drag-drop-component/drag-drop-component.component';
import { RatingDirective } from './directives/rating.directive';
import { RatingComponent } from './components/rating/rating.component';
import { EditCompanyComponent } from './pages/edit-company/edit-company.component';
import { SafePipe } from './pipes/safe.pipe';
import { Company } from './models/company.model';
import { PaymentRequestModule, PaymentDirective } from '@ng-web-apis/payment-request';
import { PaymentComponent } from './pages/payment/payment.component';
import { AngularMarkdownEditorModule } from 'angular-markdown-editor';
import { MarkdownModule } from 'ngx-markdown';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule, AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { UploaderComponent } from './components/uploader/uploader.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatSlideToggleModule} from '@angular/material';
import { NgxLoadingModule } from 'ngx-loading';
import { CreditComponent } from './pages/credit/credit.component';
import { DashboardPageComponent } from './admin/dashboard-page/dashboard-page.component';
import { EditPageComponent } from './admin/edit-page/edit-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ProfileComponent,
    CompanyComponent,
    MainComponent,
    SignupComponent,
    CreateCompanyComponent,
    ShowCompanyComponent,
    CommentsComponent,
    BonusComponent,
    NewsComponent,
    DragDropFileUploadDirective,
    DragDropComponentComponent,
    RatingDirective,
    RatingComponent,
    EditCompanyComponent,
    SafePipe,
    PaymentComponent,
    UploaderComponent,
    CreditComponent,
    DashboardPageComponent,
    EditPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PaymentRequestModule,
    MarkdownModule.forRoot(),
    AngularMarkdownEditorModule.forRoot({ iconlibrary: 'fa' }),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCTxOENXowOv2qrfrrXrGOkLVmmHIRhkMw",
      authDomain: "cronig.firebaseapp.com",
      databaseURL: "https://cronig.firebaseio.com",
      projectId: "cronig",
      storageBucket: "cronig.appspot.com",
      messagingSenderId: "904904826428",
      appId: "1:904904826428:web:e409026afa8c2bca00ed39"
    }),
    AngularFireStorageModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatSlideToggleModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [ShowCompanyComponent, CompanyComponent, ProfileComponent, Company, PaymentDirective, CreateCompanyComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
