import { Component , OnChanges, Input, SimpleChanges, ViewChild, AfterViewInit, ContentChild, OnInit, DoCheck} from '@angular/core';
import {AppService} from './app.services'
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  @Input() navelement=this.appService.isUserLoggedIn();
  constructor(private appService: AppService,private router: Router) {
 }
  
}


// ngDoCheck(): void {
  //   console.log("navelemnt ",this.navelement)
  //   // throw new Error("Method not implemented.");  isUserLoggedIn
  // }
//  ngOnInit(): void {
//   this.navelement=this.appService.isUserLoggedIn();
//   console.log("navelemnt ",this.navelement)
//   // console.log(this.signupForm.value.Password)
// }


// setTimeout(() => 
//               {
//                 this.navelement=AppService.isloggedInstatus;
//               },
//               3000);

  // ngOnChanges(changes: SimpleChanges): void {
  //   throw new Error("Method not implemented.");
  // }
//  ngOnChanges(){
//   // this.navelement=this.appService.isUserLoggedIn()
//   console.log("in on change ele ", this.navelement)
  //  console.log("in on change")
    
    
//  }

// @ContentChild(LoginComponent) child: { loginmatch: string; };

//    message:any;

//     ngAfterViewInit() {
//       this.message = this.child
//       console.log("message is",this.message)
//     }