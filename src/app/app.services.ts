import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {Login} from './login/login'
import {Signup} from './signup/singup'
@Injectable({
    providedIn: 'root'
  })

  
export class AppService{
    url = "http://localhost:3001/login"
    isloggedIn:any=false;
    static isloggedInstatus:any;
    constructor(private http: HttpClient) { 
        console.log("in service ")
    }
    loginservice(data:Login): Observable<any> {
        // JSON.stringify(data) 
        // console.log(data)
        // console.log(typeof(data))
        this.isloggedIn = this.http.post<any>(this.url,data)
        console.log("in login service ", this.isloggedIn)
        if(this.isloggedIn){
            AppService.isloggedInstatus = true
            // console.log("status",AppService.isloggedInstatus)
        }
        return this.isloggedIn
    }

    signupservice(data:any): Observable<any> {
        // JSON.stringify(data) 
        console.log("data in backend" ,data)
        // console.log(typeof(data))
        return this.http.post<any>("http://localhost:3001/signup",data)
 
    }

    cartservice(data): Observable<any> {
        // JSON.stringify(data) 
        console.log(data)
        console.log(typeof(data))
        this.isloggedIn = this.http.post<any>("http://localhost:3001/carts",data)
        console.log("in cart service ", this.isloggedIn)
        if(this.isloggedIn){
            AppService.isloggedInstatus = true
            console.log("status",AppService.isloggedInstatus)
        }
        return this.isloggedIn
    }

    isUserLoggedIn(): any {
        console.log("is user login",AppService.isloggedInstatus)
		return AppService.isloggedInstatus;
    }
    mobileservice(): Observable<any>{
        return this.http.get<any>("http://localhost:3001/mobiles")
    }
    tabservice(){
        return this.http.get<any>("http://localhost:3001/tablets")
    }
}
