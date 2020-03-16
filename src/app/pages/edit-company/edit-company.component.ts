import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Company } from 'src/app/models/company.model';
import { CompanyComponent } from '../company/company.component';
import { Subscription } from 'rxjs';
import { ShowService } from 'src/app/services/show.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit, OnDestroy {

  public editCompanyForm: FormGroup;
  private subscriptions: Subscription[] = [];
  public company: any = this.scs.currentCompany;
  bonusCol = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private com: CompanyComponent,
    private scs: ShowService
  ) {
    this.scs.currentCompanyUpdate()
    this.com.company = this.scs.currentCompany
    this.company = this.scs.currentCompany
    this.scs.imgArr = this.com.company.images
    this.bonusCol = this.company.bonus
    console.log(this.company, ' edit1')
    console.log(this.scs.imgArr, 'massiv fotok')
  }
  ngOnInit() {
    console.log(this.company, 'edit')
    this.editCompanyForm = new FormGroup({
      name: new FormControl(this.company.name, [
        Validators.required,
        Validators.minLength(3)
      ]),
      description: new FormControl(this.company.description, [
      ]),
      subject: new FormControl(this.company.subject, [
        Validators.required,
      ]),
      summa: new FormControl(this.company.summa, [
        Validators.required,
      ]),
      bonus: new FormGroup({
        bname: new FormControl('', [
          Validators.minLength(3)
        ]),
        bsum: new FormControl('', [
        ]),
        bdescription: new FormControl('', [
        ]) 
      }),
      b: new FormArray([new FormGroup({})]),
      video: new FormControl(this.company.video, [])
    })
  }
  delPic(s:number){
    this.company.images.splice(s, 1)
    this.scs.imgArr.splice(s, 1)
  }
  validateEdit() { 
    let newUrl
    if (this.editCompanyForm.value.video.includes('https://youtu.be/')){
      newUrl = this.editCompanyForm.value.video.replace('https://youtu.be/', "")
    } else{
      newUrl = this.editCompanyForm.value.video.replace('https://www.youtube.com/watch?v=', "")
    }
    this.company = this.editCompanyForm.value
    this.company.video = newUrl
    this.company = this.editCompanyForm.value
    if (this.company.name && this.company.subject && this.company.summa && this.company.description) {
      this.edit(this.company).subscribe(res => {
        console.log('response is ', res)
      });
    } else {
      alert('Title and Description required');
    }
    console.log(this.company)
  }
  addBonus() {
    const control = this.editCompanyForm.get('bonus');
    console.log('1 ', control.value);
    this.bonusCol.push(control.value);
    (this.editCompanyForm.get('b') as FormArray).push(control);
    console.log('2 ', control.value)
    console.log('norm bon', this.bonusCol)
    console.log(this.editCompanyForm.get('b').value);
    //control.reset();
  }
  delBonus(s: number) {
    (<FormArray>this.editCompanyForm.get('b')).removeAt(s)
    this.bonusCol.splice(s, 1)
  }

  edit(company: Company) {
    return this.http.post('/api/company/edit', {
      _id: localStorage.getItem('company'),
      name: company.name,
      description: company.description,
      subject: company.subject,
      summa: company.summa,
      video: company.video,
      images: this.scs.imgArr
    })
  }

  ngOnDestroy() {
    this.scs.imgArr = null
    this.company = null
    this.editCompanyForm.reset()
  }
}
