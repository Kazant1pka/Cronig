import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { ShowService } from 'src/app/services/show.service';
import { CompanyComponent } from '../company.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  public newMessageText: String = null
  com: any = null
  constructor(private http: HttpClient, private auth: AuthService, private scs: ShowService, private compan: CompanyComponent) { 
    this.updateCom()
  }

  ngOnInit() {
  }
  
  submit(s: string) {
    console.log(s)
    this.scs.commentCompany(s).subscribe(res=>{
      console.log(res)
    })
    this.newMessageText = null
    this.updateCom()
  }
  like(s: any){
    this.scs.likeCom(s).subscribe(value=>{
      console.log(value)})
  }
  dislike(s: any){
    console.log('dislike')
    //this.scs.dislikeCom(s).subscribe()
  }
  delCom(s: any){
    console.log(s)
  }

  updateCom(){
    this.scs.comments().subscribe(value=>{
      this.com = value['comment']
      console.log(Object.keys(this.com).length)
      console.log(this.com + 'com')
    }) 
  }

}