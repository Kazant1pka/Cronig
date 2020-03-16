import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company.model';
import { AuthService } from './auth.service';
import { Subscription, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  sub: Subscription
  public companyId: string = null
  currentCompany: any = null
  imgArr = [];
  imgN:string = "../../../assets/shallow-photography-of-life-is-short-enjoy-your-coffee-888992.jpg"
  constructor(private http: HttpClient, private auth: AuthService) {
      this.currentCompanyUpdate()
  } 

  currentCompanyUpdate(){
    if(localStorage.getItem('company')){
      this.selectCompany(localStorage.getItem('company')).subscribe(value=>{
        this.currentCompany = value[0]
        console.log(this.currentCompany, 'вот ща')
      })
    }
  }
  
  getCompany() {
    return this.http.post('/api/company/getCompany', {})
  }
  getRatingCompany() {
    return this.http.post('/api/company/getRatingCompany', {})
  }
  getCategoryCompany(s: string) {
    return this.http.post('/api/company/getCategoryCompany', {
      subject: s
    })
  }
  selectCompany(s: string) {
    localStorage.setItem('company', s)
    this.companyId = s
    return this.http.post('api/company', {
      _id: s
    })
  }
  commentCompany(s: string) {
    return this.http.put('/api/company/addcomment', {
      _id: this.companyId,
      title: s,
      senderId: this.auth.currentUser._id,
      senderName: this.auth.currentUser.username,
      senderUrl: this.auth.currentUser.photoUrl,
      createdAt: new Date(Date.now())
    })
  }
  delNews(s: any){
    return this.http.post('/api/company/news/delete', {
      idN: this.companyId,
      _id: s
    })
  }
  delCompany(s: any){
    return this.http.post('/api/company/delete', {
      _id: s
    })
  }
  pay(s:number){
    return this.http.post('/api/company/pay', {
      _id: this.companyId,
      earned: this.currentCompany.earned + s
    })
  }

  comments() {
    return this.http.post('/api/company/comments', {
      _id: this.companyId
    })
  }
  news() {
    return this.http.post('/api/company/news', {
      _id: this.companyId
    })
  }
  rating(s: number) {
    return this.http.post('/api/company/rating', {
      idC: this.companyId,
      mark: s
    })
  }
  delComent(s: number) {
    return this.http.put('/api/company/delComment', {
      //idx: this.companyId,
      _id: s
    })
  }
  likeCom(s: number){
    return this.http.post('/api/company/comment/like', {
      idx: this.companyId,
      _id: s
    })
  }
  dislikeCom(s: number){
    return this.http.post('/api/company/comment/dislike', {
      idx: this.companyId,
      _id: s
    })
  }
}