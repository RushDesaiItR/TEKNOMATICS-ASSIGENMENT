import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators"
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private _http: HttpClient) { }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
  // userLogin(){
  //   return this._http.get<any>(" http://localhost:3000/users").pipe(map((res:any)=>{

  //      return res;
  //   }))
  //}
  // login({ email, password }: any): Observable<any> {
  //   if (email === 'admin@gmail.com' && password === 'admin123') {
  //     this.setToken('abcdefghijklmnopqrstuvwxyz');
  //     return of({ name: 'Tarique Akhtar', email: 'admin@gmail.com' });
  //   }
  //   return throwError(new Error('Failed to login'));
  // }
  //  return a.userName === this.formValue.value.userName && a.password ===  this.formValue.value.password
  login({ email, password }: any){
    console.log(email, password )
   return  this._http.get<any>(" http://localhost:3000/users").pipe(map((res: any) => {

      if(res[0].userName === email && res[0].password === password) {
        this.setToken('abcdefghijklmnopqrstuvwxyz');
        return true;
      }
      return false;
      return throwError(new Error('Failed to login'));
    }))
  }
}
