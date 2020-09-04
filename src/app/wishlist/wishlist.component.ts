import { Component, OnInit } from '@angular/core';
import{AppService} from '../app.services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private router: Router, private appservice:AppService) { }
  wishlist;
  wishlistproducts=[]
  totalproducts=[]
  mobiledata;
  tabdata
  range: Array<number> = [1, 2, 3, 4, 5];
  ngOnInit(): void {
    
      this.appservice.getwishlistcartservice().subscribe((data)=>{
        // console.log("data in wishlist is",data)
        this.wishlist = data[0]["wishList"]
        console.log("data in wishlist is",this.wishlist)
        // this.tabdata=data;
      },(err)=>{
        console.log(err)
      })
  
      this.appservice.mobileservice().subscribe((data)=>{
        // console.log("data is",data)
        this.mobiledata=data;
        this.totalproducts=this.mobiledata
      },(err)=>{
        console.log(err)
      })
  
      this.appservice.tabservice().subscribe((data)=>{
        // console.log("data is",data)
        this.tabdata=data;
        this.totalproducts=this.totalproducts.concat(this.tabdata)
        console.log("total products in wishlist",this.totalproducts)
        console.log("wishlist products in wishlist",this.wishlist)
        if(this.wishlist.length>0){
          for(let i of this.wishlist){
            console.log("product id in wishlist ",i)
            for(let prod of this.totalproducts){
              if(i === prod.productId){
                console.log("product id in totalproducts ",prod)
                this.wishlistproducts.push(prod)
                // break
              }
            }
          }
        }
        console.log("final wishlist products in wishlist",this.wishlistproducts)
      },(err)=>{
        console.log(err)
      })
    



    }
    productnavigation(product){
      this.router.navigate(['/product',product._id])
    }
  }
