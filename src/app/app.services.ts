import { Injectable, EventEmitter, Output } from '@angular/core';
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
    @Output() static isloggedInstatus = new EventEmitter();
    static guardvariable = false
    static loginvariable;
    constructor(private http: HttpClient) { 
    }
    loginservice(data:Login): Observable<any> {

        this.isloggedIn = this.http.post<any>(this.url,data)
        AppService.loginvariable = data.username
        if(this.isloggedIn){
            AppService.guardvariable=true
            return this.isloggedIn
        }
        return this.isloggedIn
    }

    signupservice(data:any): Observable<any> {
        // console.log("data in backend" ,data)
        return this.http.post<any>("http://localhost:3001/signup",data)
 
    }

    cartserviceput(data: { productId: any; productName: any; productCode: any; description: any; price: any; imageUrl: any; manufacturer: any; ostype: any; rating: any; }):any {
        // console.log("in cartservice",AppService.loginvariable)
        let cartdata={"username":AppService.loginvariable,"productsInCart":[{
            "quantity": 1,
            "productId": data.productId,
            "productName": data.productName,
            "productCode": data.productCode,
            "description": data.description,
            "price": data.price,
            "imageUrl": data.imageUrl,
            "manufacturer": data.manufacturer,
            "ostype": data.ostype,
            "rating": data.rating
        }]}

        console.log("in sevice consloe before",cartdata)
        return this.http.put<any>("http://localhost:3001/carts/"+AppService.loginvariable,cartdata)
    }

    cartserviceputdecrement(data: { productId: any; productName: any; productCode: any; description: any; price: any; imageUrl: any; manufacturer: any; ostype: any; rating: any; }):any {
        // console.log("in cartservice",AppService.loginvariable)
        let cartdata={"username":AppService.loginvariable,"productsInCart":[{
            "quantity": -1,
            "productId": data.productId,
            "productName": data.productName,
            "productCode": data.productCode,
            "description": data.description,
            "price": data.price,
            "imageUrl": data.imageUrl,
            "manufacturer": data.manufacturer,
            "ostype": data.ostype,
            "rating": data.rating
        }]}

        console.log("in sevice consloe before",cartdata)
        return this.http.put<any>("http://localhost:3001/carts/"+AppService.loginvariable,cartdata)
    }

    cartservice(data){
        let cartdata={"username":AppService.loginvariable,"productsInCart":[{
            "quantity": 1,
            "productId": data.productId,
            "productName": data.productName,
            "productCode": data.productCode,
            "description": data.description,
            "price": data.price,
            "imageUrl": data.imageUrl,
            "manufacturer": data.manufacturer,
            "ostype": data.ostype,
            "rating": data.rating
        }]}
        return this.http.post<any>("http://localhost:3001/carts",cartdata)
    }
    getcartservice(){
        return this.http.get<any>("http://localhost:3001/carts?username="+AppService.loginvariable)
    }

    isUserLoggedIn(): any {
        console.log("is user login",this.isloggedIn)
        
        return this.isloggedIn
    }

    getwishlistcartservice(){
        return this.http.get<any>("http://localhost:3001/wishlist?username="+AppService.loginvariable)
    }

    postwishlistcartservice(id){
        let data={"username":AppService.loginvariable,"productId":id}
        return this.http.post<any>("http://localhost:3001/wishlist",data)

    }

    removewishlist(id){ 
        let data={"username":AppService.loginvariable,"productId":id}
        return this.http.put<any>("http://localhost:3001/wishlist",data)
    }

    emittedservice():any{
        if(this.isloggedIn){
        return AppService.isloggedInstatus.emit(true)}
    }

    mobileservice():any{

        return this.http.get<any>("http://localhost:3001/mobiles")
    }
    tabservice(){
        return this.http.get<any>("http://localhost:3001/tablets")
    }
}

// data =JSON.stringify(data)
        // console.log("get cart data", data)
        // for(let user of data){
        //     if(user.username === AppService.loginvariable){

        //     }
        // }
        // if(data['StatusOfCart']=="Open"){
        //     console.log("in put")
        //     this.isloggedIn = this.http.put<any>("http://localhost:3001/carts/:"+AppService.loginvariable,cartdata)
        // }
        // // console.log("in cartservice",cartdata)
        // else{
        //     console.log("in post",cartdata)
        //     this.isloggedIn = this.http.post<any>("http://localhost:3001/carts",cartdata)
        // }
        
        // // if(this.isloggedIn){
        // //     console.log("status",this.isloggedIn)
        // // }
        // return this.isloggedIn

        // this.getcartservice().subscribe((data)=>{
        //     console.log("in sevice consloe")
        //     if(data){
        //         exportdata= this.http.put<any>("http://localhost:3001/carts/:"+AppService.loginvariable,cartdata)
        //   }},(err: any)=>{
        //     exportdata= this.http.post<any>("http://localhost:3001/carts",cartdata)
        //   })