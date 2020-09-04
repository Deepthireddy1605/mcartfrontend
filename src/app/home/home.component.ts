import { Component, OnInit } from '@angular/core';
import{AppService} from '../app.services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  mobiledata;
  tabdata;
  isShown:boolean = false;
  mobbool=false;
  tabbool=false;
  data=[]
  totaldata=[]
  searchdata=[]
  wishlist=[];
  range: Array<number> = [1, 2, 3, 4, 5];
  constructor(private router: Router,private loginService: AppService) { }

  ngOnInit(): void {
    
    this.loginService.mobileservice().subscribe((data)=>{
      // console.log("data is",data)
      this.mobiledata=data;
    },(err)=>{
      console.log(err)
    })

    this.loginService.tabservice().subscribe((data)=>{
      // console.log("data is",data)
      this.tabdata=data;
    },(err)=>{
      console.log(err)
    })

    this.loginService.getwishlistcartservice().subscribe((data)=>{
      this.wishlist=data[0]["wishList"]
    },(err)=>{
      console.log(err)
    })
  }
  
  mobile(value){
    console.log("in mobile method",value)
    if (value =="mobile"){
      this.tabbool=true;
      this.mobbool=false;
    }
    else if(value == "tablet"){
      this.tabbool=false;
      this.mobbool=true;
    }
    else{
      this.tabbool=false;
      this.mobbool=false;
    }
  }
  

  add_to_cart(product){
    console.log("product is",product)
    this.loginService.cartservice(product).subscribe((data)=>{
      console.log("data is",data)
      // this.tabdata=data;
    },(err)=>{
      console.log(err)
    })
  }

  productnavigation(product){
    this.router.navigate(['/product',product._id])
  }
  search(value1){
    this.searchdata=[]
    // console.log("value is",value1)
    // console.log("mobile data in search",this.mobiledata)
    // console.log("tab data in search",this.tabdata)
    // this.totaldata=this.mobiledata
    this.totaldata=this.mobiledata.concat(this.tabdata)
    // for(let prod in this.totaldata){
    //   if (prod["productName"].startsWith(value1)){
    //     this.searchdata.push(prod)
    //   }
    // }
    this.totaldata.forEach(element => {
      if(element.productName.toUpperCase().startsWith(value1.toUpperCase())){
        this.searchdata.push(element)
      }
    });
    console.log("total data in search",this.totaldata)
  }

}
