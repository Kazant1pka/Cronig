import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  users: any = this.get()
  constructor(private auth:AuthService) { 
    this.get()
  }
 
  ngOnInit() {
    this.get()
    console.log(this.users)
  }
  get(){
    this.auth.getCredit().subscribe(val=>{
      this.users = val['data']
    })
  }

}
