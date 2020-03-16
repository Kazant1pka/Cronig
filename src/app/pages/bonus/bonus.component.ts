import { Component, OnInit, Input } from '@angular/core';
import { CompanyComponent } from '../company/company.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.scss']
})
export class BonusComponent implements OnInit {
  @Input() bonuses: any = null
  constructor(public com: CompanyComponent, public profile: ProfileComponent) {
  }

  ngOnInit() { 
    console.log(this.bonuses)
  }

  pay(s: any){ 
    this.bonuses = s
  }
}
