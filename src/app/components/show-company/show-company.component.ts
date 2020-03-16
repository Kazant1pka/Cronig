import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ShowService } from 'src/app/services/show.service';
import { MainComponent } from 'src/app/pages/main/main.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-company',
  templateUrl: './show-company.component.html',
  styleUrls: ['./show-company.component.scss']
})
export class ShowCompanyComponent implements OnInit, OnDestroy {
  public companies: any[];
  idC: String = null
  progress: number
  sub: Subscription
  constructor(private scs: ShowService, private mc: MainComponent) {

  }

  ngOnInit() {
    this.filtr()
  }

  getID(s: string) {
      console.log(s)
      this.scs.selectCompany(s).subscribe(val=>{
        console.log(val)
      })
  }

  filtr() {
    if (this.mc.sub == '') {
      this.getCompany()
    } else {
      this.getCategoryCompany()
    }
  }

  getCompany() {
    this.sub = this.scs.getCompany().subscribe(result => {
      this.companies = result['data'];
    })
  }

  getCategoryCompany() {
    this.sub = this.scs.getCategoryCompany(this.mc.sub).subscribe(result => {
      this.companies = result['data'];
      console.log(this.companies)
    })
  }
  ngOnDestroy() { 
  }
}
