import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ShowService } from 'src/app/services/show.service';
import { pipe } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyComponent } from '../company.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder, private http: HttpClient, private auth: AuthService, private scs: ShowService, private com: CompanyComponent, private router: Router) {
    this.updateNews()
  }
  news: any
  listNews: any[]
  newPhoto = null
  public newsForm: FormGroup
  ngOnInit() {
    this.newsForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
      ]),
      text: new FormControl(null, [
        Validators.required,
        Validators.minLength(5)
      ]),
      img: new FormControl(null, [
      ]),
    })
  }

  submit() {
    this.newPhoto = this.scs.imgN
    this.news = this.newsForm.value
    console.log("News ", this.news)
    this.post(this.news).subscribe(res => {
      console.log('response is ', res)
    });
    this.router.navigate(['/company']);
  }

  updateNews() {
    this.scs.news().subscribe(value => {
      this.listNews = value['news']
      console.log(Object.keys(this.news).length)
      console.log(this.listNews + 'novosti')
    })
  }

  post(news: any) {
    return this.http.post('/api/company/addNews', {
      _id: localStorage.getItem('company'),
      title: news.title,
      text: news.text,
      img: this.newPhoto,
      date: new Date(Date.now())
    })
  }

  delNews(s: number) {
    this.scs.delNews(s).subscribe(val=>{
      console.log(val)
    })
    console.log(s)
  }

  ngOnDestroy(){
    this.scs.imgN = null
  }
}
