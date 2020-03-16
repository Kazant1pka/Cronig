import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  users: any = this.get()
  constructor(private auth:AuthService) { 
    this.get()
  }

  ngOnInit() {
    this.get()
    console.log(this.users)
  }
  get(){
    this.auth.getUsers().subscribe(val=>{
      this.users = val['data']
    })
  }

}
