import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private loginService:AppService) { }
  cartdata;
  quantityvar=0;
  totalprice=0
  range: Array<number> = [1, 2, 3, 4, 5];
  ngOnInit(): void {
    this.loginService.getcartservice().subscribe((data)=>{
      if(data != undefined){
      console.log("data is",data[0])
      this.cartdata=data[0]["productsInCart"];
      console.log("data is",data[0]["productsInCart"][0])}
      this.totalpricefunction(this.cartdata)
      // for(let product of this.cartdata){
      //   product.
      // }
      for(let i=0;i<this.cartdata.length;i++){
        if (this.cartdata[i].quantity <=0){
          this.cartdata.splice(i--,1)
        
    }}
    },(err)=>{
      console.log(err)
    })
  }

  quantityfun(product){
    this.loginService.cartserviceput(product).subscribe((data)=>{
      product.quantity++;
      this.totalprice+=product.price
      // this.totalpricefunction(product)
      console.log("data in cart increment")},
      (err)=>{
        console.log(err)
      }
    )
  }

  quantityfundecr(product){
    
    this.loginService.cartserviceputdecrement(product).subscribe((data)=>{
      
      product.quantity--;
      if(product.quantity>=0){
      this.totalprice-=product.price}
      
        for(let i=0;i<this.cartdata.length;i++){
          if (this.cartdata[i].quantity <=0){
            this.cartdata.splice(i--,1)
          
      }
      }
      // this.totalpricefunction(product)
      console.log("data in cart decrement")},
      
      (err)=>{
        console.log(err)
      }
    )
  }

  totalpricefunction(proddata){
    for(let prod of proddata){
      if(prod.quantity>0){
      console.log("prod qunatity ",prod.quantity,prod.price)
      this.totalprice+=prod.quantity*prod.price}
    }
  }

}
