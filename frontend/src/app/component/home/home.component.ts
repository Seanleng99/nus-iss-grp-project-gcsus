import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart } from '../../model/cart';
import { Product } from '../../model/product';
import { ApiService } from '../../service/api.service';
import { ProductComponent } from './product/product.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ProductComponent, NavigationComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  cartlist: Cart[] = [];
  constructor(private api: ApiService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.api.isAuthenticated()) {
      this.api.getProducts().subscribe(res => {
        this.products = res.oblist;
      });
      this.api.getCartItems().subscribe(res => {
        this.cartlist = res.oblist;
        this.api.cartAmount = this.cartlist.length || 0;
      });
    }
  }

  addToCart(e: any) {
    this.api.addToCart(e).subscribe(res => {
      console.log(res);
      this.snackBar.open('Added to cart successfully.', 'Close', { duration: 3000 });
      this.cartlist = res.oblist;
      this.api.cartAmount = this.cartlist.length || 0;
    }, 
    err => {
      console.log("Error: ", err);
      this.snackBar.open('Failed to add item to cart. Please try again.', 'Close', { duration: 3000 });
    });
  }
}
