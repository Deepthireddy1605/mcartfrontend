// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { catchError, tap, map } from 'rxjs/operators';
// import { Observable, throwError } from 'rxjs';
// import { HttpErrorResponse } from '@angular/common/http';
// import {Login} from './login'
// @Injectable({
//     providedIn: 'root'
//   })

// export class LoginService{
//     url = "http://localhost:3001/login"
//     constructor(private http: HttpClient) { }
//     loginservice(data:Login): Observable<any> {
//         // JSON.stringify(data) 
//         console.log(data)
//         console.log(typeof(data))
//         return this.http.post<any>(this.url,data)
//     }

//     signupservice(data:Login): Observable<any> {
//         // JSON.stringify(data) 
//         console.log(data)
//         console.log(typeof(data))
//         return this.http.post<any>("http://localhost:3001/signup",data)
//     }
// }
