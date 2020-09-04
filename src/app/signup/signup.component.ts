import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import{AppService} from '../app.services';
import { Router } from '@angular/router';
import {Signup} from './singup'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup;
  submitted:Boolean;
  loginmatch:any="";
  signbool:Boolean=true;
  signbool_sucess:Boolean=true;
  sign_data = new Signup()
  constructor(private router: Router, private formBuilder: FormBuilder, private appservice:AppService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Password: ['', Validators.required],
      Confirmpswd:['', Validators.required],
      phone:['', validatePhone],
      mail:['', validateEmail],
    });
    // console.log(this.signupForm.value.Password)
  }

  signupvalidation() {
    // console.log(this.signupForm.value.Password)
    if(this.signupForm.value.Password == this.signupForm.value.Confirmpswd){
      this.submitted=false
      this.sign_data.username = this.signupForm.value.Name
      this.sign_data.password = this.signupForm.value.Password
      this.sign_data.email = this.signupForm.value.mail
      this.sign_data.phoneNumber =  Number(this.signupForm.value.phone)
      console.log(this.sign_data)
      this.appservice.signupservice(this.sign_data).subscribe((data)=>{
        // console.log("success")
        // console.log(data)
        // this.loginmatch = data
        this.signbool_sucess = false
        // console.log(data.pretty())
        
        // this.loginmatch = "User registeration successfull"
        // this.router.navigate(['/login'])
      },(err)=>{  
        // console.log(err.console.error.message);
        // console.log("in err")
        // console.log(typeof(err.error.text))
        // console.log("text atfert ",err.error.text)
        if(err.error.text != undefined){
        if (err.error.text.includes('User Registered with Name:')) { 
          this.signbool_sucess = false
          console.log(" if text in error ",err.error.text)
          this.loginmatch =err.error.text
          setTimeout(() => 
              {
                  this.router.navigate(['login']);
              },
              3000);
        }
        else if (err.error.text.includes('already')) { 
          this.signbool = false
          console.log("else if text in error ",err.error.text)
          this.loginmatch =err.error.text
        }
        else{
          this.signbool = false
          console.log(" else text in error ",err.error.text)
          this.loginmatch =" User already registered"
        }}
        else{
          this.signbool = false
          console.log(" else text in undefined error ",err.error.text)
          this.loginmatch =" User already registered"
        }
        
      })
    }
    else{
      this.submitted=true
    }
  }

}
function validateEmail(c: FormControl) {
  let EMAIL_REGEXP = /^[a-zA-Z0-9](\.?[a-zA-Z0-9]){4,}@gmail\.com$/;
  return EMAIL_REGEXP.test(c.value) ? null : {
      emailInvalid: {
          message: "Mail should be in 'abcd@gmail.com' format"
      }
  };}


function validatePhone(c: FormControl) {
  let PHONE_REGEXP = /^[6-9]{1}[0-9]{9}$/;
  return PHONE_REGEXP.test(c.value) ? null : {
      phoneInvalid: {
          message: "Invalid phone number format"
      }
  };}

