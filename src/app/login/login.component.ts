import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import{AppService} from '../app.services';
import { Router } from '@angular/router';
import {Login} from './login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  login = new Login();
  loginmatch:Boolean=true;
  @Output() static OnRegister:EventEmitter<string> = new EventEmitter<string>();
  constructor(private router: Router,private loginService: AppService) { }

  ngOnInit(): void {
    
    
  }
  onSubmit() { }

  login_fun(){
    console.log(this.login)
    this.loginService.loginservice(this.login).subscribe((data)=>{
      this.loginmatch = data;
      // console.log("data is",data)
      if(data){
        LoginComponent.OnRegister.emit("true");
        this.router.navigate(['/home'])}
    },(err)=>{
      this.loginmatch = false
      console.log(err)
    })
    }
  }


