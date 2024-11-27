import {Component, OnInit} from '@angular/core';
import {CartService} from "../cart.service";
import {Product} from "../../models/product";

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})

export class CartViewComponent implements OnInit {

  cartItems: Product[] = [];
  totalPrice: number = 0;

  constructor(private CartService: CartService) {


  }

  ngOnInit() {
    this.CartService.getCartItems().subscribe(data => {
      this.cartItems = data;
      this.totalPrice = this.getTotalPrice();
    })
  }

  getTotalPrice(): number {
    let total = 0;
    for (let item of this.cartItems) {
      total += item.price;
    }
    return total;
  }

  clearCart(): void {
    this.CartService.clearCart().subscribe();
  }

  checkout(): void {
    this.CartService.checkout(this.cartItems).subscribe()
  }

}


