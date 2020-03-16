import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// import { AlertType } from './../../enums/alert-type.enum';
// import { Alert } from './../../classes/alert';
// import { AlertService } from './../../services/alert.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
// import { LoadingService } from './../../servies/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  private subscriptions: Subscription[] = [];
  private returnUrl: string;
  private socialActive: boolean = false;
  public user : User;

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService,
    // private alertService: AlertService,
    // private loadingService: LoadingService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user = new User();
   }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5)
      ])
    })
  }

  validateLogin() {
    this.user.email = this.loginForm.value.email;
    this.user.password = this.loginForm.value.password;
  	if(this.loginForm.valid) {
      console.log(this.user.email + ' password ' + this.user.password)
      // this.auth.authUser(this.user.email).subscribe(result => {
      //   this.auth.currentUser = result ;})
      //this.auth.currentUser = this.user;
  		this.auth.validateLogin(this.user).subscribe(result => {
        this.auth.currentUser = result['data']
        console.log('result is ', result);
        if(result['status'] === 'success') {
          this.router.navigate(['/main']);
        } else {
          alert('Wrong username password');
        }
        
      }, error => {
        console.log('error is ', error);
      });
  	} else {
  		alert('enter user name and password');
  	}
  }
  
  public submit(): void {
    
    // if (this.loginForm.valid) {
    //   this.loadingService.isLoading.next(true);
    //   const {email, password} = this.loginForm.value;

    //   // TODO call the auth service
    //   this.subscriptions.push(
    //     this.auth.login(email, password).subscribe(success => {
    //       if (success) {
    //         this.router.navigateByUrl(this.returnUrl);
    //       } else {
    //         this.displayFailedLogin();
    //       }
    //       this.loadingService.isLoading.next(false);
    //     })
    //   );
    // } else {
    //   this.loadingService.isLoading.next(false);
    //   this.displayFailedLogin();
    // }
  }

  public submitServiceFacebook(): void {
    
  }

  public submitServiceTwitter(): void {
    console.log('vk')
    this.auth.vkAuth().subscribe(val=>{console.log(val)})
  }

  public submitServiceGoogle(): void {
    console.log('s')
    this.auth.googleAuth().subscribe(val=>{console.log(val)})
  }

  public submitServiceGithub(): void {

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private displayFailedLogin(): void {
    // const failedLoginAlert = new Alert('Invalid email/password combination, try again.', AlertType.Danger);
    // this.alertService.alerts.next(failedLoginAlert);
  }

}
