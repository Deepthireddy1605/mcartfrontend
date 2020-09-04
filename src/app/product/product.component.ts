import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.services';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  mobiledata;
  tabdata;
  id;
  product;
  totaldata=[];
  suggestionproducts=[];
  prodbool=false
  wishlistvar=false
  cartvar=false
  range: Array<number> = [1, 2, 3, 4, 5]; 
  constructor(private route: ActivatedRoute,private router: Router,private loginService: AppService) {
    // console.log("suggestions is",this.suggestionproducts)
    this.route.params.subscribe( params => {
      // console.log(params)
      // console.log(params.id)
      this.id = params.id;
    } );

   }

  ngOnInit(): void {
    this.gettingprodid()
    this.loginService.getcartservice().subscribe((data)=>{
      // console.log("in sevice consloe")
      
      let k = data[0]["productsInCart"]
      console.log("data in add to cart prdo",k)
      k.forEach(element => {
        console.log("eac",element)
       if(element._id===this.id){
        this.cartvar=true
       } 
      });})
    this.loginService.getwishlistcartservice().subscribe((data)=>{
      for(let id of data[0]["wishList"]){
        if(id === this.product.productId){
          this.wishlistvar=true
        }
      }
    })
    
  }

  gettingprodid(){
    this.loginService.mobileservice().subscribe((data)=>{
      this.mobiledata=data;
      this.totaldata=data
      for(let mobile of this.mobiledata){
        if(this.id == mobile._id){
          this.product = mobile
          this.prodbool=true
        }
        if(this.prodbool && this.product.manufacturer == mobile.manufacturer && this.product._id != mobile._id){
          this.suggestionproducts.push(mobile)
        }
      } 
    },(err)=>{
      console.log(err)
    })

    this.loginService.tabservice().subscribe((data)=>{
      this.tabdata=data;
      this.totaldata.concat(this.tabdata)
      for(let tab of this.tabdata){
        if(this.id == tab._id){
          this.product = tab
          this.prodbool=true
        }

        if(this.prodbool && this.product.manufacturer == tab.manufacturer && this.product._id != tab._id){
          this.suggestionproducts.push(tab)
          
        }
        
      }
      
    },(err)=>{
      console.log(err)
    })
    

  }

  productnavigation(prod){
    let temp= this.product
    this.suggestionproducts.push(temp)
    // this.cartvar=false
    // console.log("pushed data",temp)
    this.product=prod
    for(let i=0;i<this.suggestionproducts.length;i++){
        if (this.suggestionproducts[i]._id === prod._id){
          this.suggestionproducts.splice(i--,1)
        }
    }
    // this.suggestionproducts.removeIf(i=>i._id===prod._id)
    this.router.navigate(['/product',this.product._id])
  }

  wishlistadd(id){
    this.wishlistvar = !this.wishlistvar
    if(this.wishlistvar){
    this.loginService.postwishlistcartservice(id).subscribe((data)=>{
      console.log(data)
    },(err)=>{
      console.log(err)
    })
  }
else{
  this.loginService.removewishlist(id).subscribe((data)=>{
    console.log(data)
  },(err)=>{
    console.log(err)
  })
}

}
  add_to_cart(product){
    this.loginService.getcartservice().subscribe((data)=>{
      // console.log("in sevice consloe")
      console.log("data in add to cart",data)
      let k = data[0]["productsInCart"]
      k.forEach(element => {
       if(element._id===product._id){
        this.cartvar=true
       } 
      });
      
      if(data.length>0){
          this.loginService.cartserviceput(product).subscribe((data)=>{
            console.log("data is",data)
          }
          ,(err)=>{
            this.loginService.cartservice(product).subscribe((data)=>{
              console.log("data in cart post")},
              (err)=>{
                console.log(err)
              }
            )}
            
        )
        }

      else{
        this.loginService.cartservice(product).subscribe((data)=>{
          console.log("data in cart post")},
          (err)=>{
            console.log(err)
          }
        )}
    },(err: any)=>{
      this.loginService.cartservice(product).subscribe((data)=>{
        console.log("data in cart post")},
        (err)=>{
          console.log(err)
        }
      )})

}}
