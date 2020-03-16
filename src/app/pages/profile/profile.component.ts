import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ShowService } from 'src/app/services/show.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(public auth: AuthService, public scs:ShowService, private router: Router) {
    
  }
  
  ngOnInit() {
  }
  update(){
    this.auth.updateUser(this.auth.currentUser.username, this.auth.currentUser.email).subscribe(val=>{
      console.log(val)
    })
    alert('Данные обновлены')
    this.router.navigate['/profile']
  }
  setCom(s: any){
    localStorage.setItem('company', s)
    console.log(s)
  }

  delCompany(s:any){
    this.scs.delCompany(s).subscribe(val=>{
      console.log(val)
    })
    console.log(s)
  }
}
