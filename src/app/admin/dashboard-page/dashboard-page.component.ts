import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

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
  del(s:any){
    this.auth.delUsers(s).subscribe(
      
    )
    alert('Удалено')
  }
}
