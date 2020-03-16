import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
    console.log(this.auth.currentUser)
  }
  // customSearchClient = {
  //   search(requests) {
  //     return fetch('/search', {
  //       method: 'post',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ requests }),
  //     }).then(res => res.json());
  //   }
  // };
  // config = {
  //   appId: '2020',
  //   apiKey: 'search',
  //   indexName: 'companySearch',
  //   searchClient: this.customSearchClient
  // };
}

