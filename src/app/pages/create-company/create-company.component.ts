import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, Form } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Company } from '../../models/company.model';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage} from 'angularfire2/storage';
import { ShowService } from 'src/app/services/show.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent implements OnInit, OnDestroy {

  public createCompanyForm: FormGroup;
  private subscriptions: Subscription[] = [];
  public company: Company
  bonusCol = [];
  imgArr = this.ss.imgArr;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private http: HttpClient,
    private ss: ShowService
  ) {
    this.company = new Company;
  }
  onChange(e) { 
    console.log(e.getContent()); 
   }
  ngOnInit() {
    
    this.createCompanyForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      family: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      fath: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      age: new FormControl(null, [
        Validators.required,
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10)
      ]),
      marry: new FormControl(null, [
        Validators.required,
      ]),
      child: new FormControl(null, [
        Validators.required,
      ]),
      work: new FormControl(null, [
        Validators.required,
      ]),
      email: new FormControl(null, [
        Validators.required,
      ]),
      password: new FormControl(null, [
        Validators.required,
      ])
    })
  }
  validateCreate() {
    this.company = this.createCompanyForm.value
      this.create(this.company).subscribe(res => {
        console.log('response is ', res)
        if (res['status'] === 'success') {
          this.router.navigate(['/main']);
          alert('Клиент создан')
        } else {
          alert('Неправильные данные');
        }
      });
    console.log(this.company)
  }
  ind = 1;
  addBonus() {
    this.ind++
    const control = this.createCompanyForm.get('bonus');
    console.log('1 ',control.value)
    this.bonusCol.push(control.value);
    (this.createCompanyForm.get('b') as FormArray).push(control);
    console.log('2 ',control.value)
    console.log('norm bon', this.bonusCol)
    console.log(this.createCompanyForm.get('b').value);
    (this.createCompanyForm.get('b') as FormArray).removeAt(0);
    control.reset();
  }
  delBonus(s: number) {
    (<FormArray>this.createCompanyForm.get('b')).removeAt(s)
    this.bonusCol.splice(s, 1)
  }

  create(company: Company) {
    return this.http.post('/api/user/create', {
      //_id: this.auth.currentUser._id,
      email: company.email,
      password: company.password,
      name: company.name,
      description: company.description,
      family: company.family,
      fath: company.fath,
      age: company.age,
      marry: company.marry,
      work: company.work,
      child: company.child
    })
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
