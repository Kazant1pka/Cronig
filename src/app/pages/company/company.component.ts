import { Component, OnInit, OnDestroy} from '@angular/core';
import { ShowService } from 'src/app/services/show.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit, OnDestroy {
  company: any = this.scs.currentCompany
  avrat: any = 0
  progress: number

  constructor(private scs: ShowService, public auth: AuthService) {
    this.scs.currentCompanyUpdate() 
  }
  ngOnInit() {
    this.scs.currentCompanyUpdate()
    this.update()
    this.scs.imgArr = this.company.images
    console.log(this.company, 'company')
    console.log(this.avrat, 'avrat')
  }

  update() {
    
    this.avrat = 0
    this.scs.selectCompany(this.scs.companyId).subscribe(value => {
      this.company = value[0];
      
      this.progress = Math.round((this.company.earned / this.company.summa) * 100)
      for (let index = 0; index < this.company.rating.length; index++) {
        this.avrat += this.company.rating[index].mark;
      }
      this.avrat = (this.avrat / this.company.rating.length).toFixed(1);
    })
    console.log(this.company, 'company')
  }

  onRating(rating: number) {
    console.log(rating);
  }
  ngOnDestroy() {
  }
}
