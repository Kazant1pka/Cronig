import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../src/app/models/user.model';
import { Observable, of, from, Subscription } from 'rxjs'
import { tap } from 'rxjs/operators'
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  sub: Subscription
  currentUser: any = null

  constructor(private http: HttpClient) {
    this.authUserBasic()
      .subscribe(val => {
        console.log('вал это', val)
        this.currentUser = val
      })
  }

  ngOnInit() {
    if (this.currentUser === null) {
      const stream$ = new Observable(observer => {
        setInterval(() => {
          observer.next(this.currentUser)
        }, 1000)
      })
      this.sub = stream$
        .subscribe(value => {
          console.log(value)
        })
    } else {
      this.sub.unsubscribe()
      //this.authUserBasic().subscribe().unsubscribe()
    }
  }

  authUser(s: string) {
    return this.http.post('/api/user/auth', {
      email: s
    })
  }
  authUserBasic() {
    console.log('asd')
    return this.http.get('/api/user/authBasic', {
    })
  }
  updateUser(sName:string, sMail){
    return this.http.post('/api/user/edit', { 
      username: sName,
      email: sMail
    })
  }
  delUsers(sName:string){
    return this.http.post('/api/users/delete', { 
      _id: sName
    })
  }
  get token(): string {
    const expDate = new Date(localStorage.getItem('mongo-token-exp'))
    if (new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('mongo-token')
  }

  validateLogin(user: User) {
    return this.http.post('/api/user/login', {
      email: user.email,
      password: user.password
    })
      .pipe(
        tap(this.setToken)
      )
  }
  validateSign(user: User) {
    return this.http.post('/api/user/create', {
      username: user.username,
      email: user.email,
      password: user.password
    })
  }
  logout() {
    this.currentUser = null
    return this.http.get('/api/user/logout', {})
  }

  out(){
    this.logout().subscribe(val=>console.log('logout',val))
  }
  private setToken(response) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('mongo-token', response.token)
      localStorage.setItem('mongo-token-exp', response.expiresIn)
      console.log(response)
    } else {
      localStorage.clear()
    }

  }
  isAuth() {
    if (this.currentUser) {
      return true
    }
  }

  getUsers(){
    return this.http.post('/api/user',{
    })
  }

  getCredit(){
    return this.http.post('/api/credit',{
    })
  }

  

  googleAuth(){
    return this.http.get('/auth/google',{
    })
  }
  vkAuth(){
    return this.http.get('/auth/vkontakte',{
    })
  }
  

  // private setCurrentUserSnapshot(): void {
  //   this.currentUser.subscribe(user => this.currentUserSnapshot = user);
  // }
}
