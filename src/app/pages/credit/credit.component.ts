import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss']
})
export class CreditComponent implements OnInit {
  items: any = this.get()
  cred: any = this.getC()
  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.get()
    this.getC()
    console.log(this.items)
  }
  get(){
    this.auth.getUsers().subscribe(val=>{
      this.items = val['data']
    }) 
  }
  getC(){
    this.auth.getCredit().subscribe(val=>{
      this.cred = val['data']
    })
  }
}
