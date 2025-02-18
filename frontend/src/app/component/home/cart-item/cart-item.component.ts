import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../../../model/cart';
import { ApiService } from '../../../service/api.service';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../../navigation/navigation.component';

@Component({
  selector: 'app-cart-item',
  imports: [CommonModule, NavigationComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent implements OnInit {

  private auth!: string;
  cartlist: Cart[] = [];
  totalSum: number = 0;
  constructor(public api: ApiService, private route: Router) {

  }

  ngOnInit() {
    this.api.getCartItems().subscribe(res => {
      this.cartlist = res.oblist;
      this.cartlist.forEach(value => {
        this.totalSum = this.totalSum + (value.quantity * value.price);
      });
    });

  }

  updateCart(id:any, quantity:any) {
    this.api.updateCartItem(id.value, quantity.value).subscribe(res => {
      this.cartlist = res.oblist;
      this.api.cartAmount = this.cartlist.length || 0;
      this.totalSum = 0;
      this.cartlist.forEach(value => {
        this.totalSum = this.totalSum + (value.quantity * value.price);
      });
    });
  }

  deleteItem(id:any) {
    this.api.deleteCartItem(id.value).subscribe(res => {
      this.cartlist = res.oblist;
      this.api.cartAmount = this.cartlist.length || 0;
      this.totalSum = 0;
      this.cartlist.forEach(value => {
        this.totalSum = this.totalSum + (value.quantity * value.price);
      });
    });
  }

  placeOrder() {
    this.route.navigate(['/home/order/checkout']);
  }

}
