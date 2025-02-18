import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Address } from '../../../model/address';
import { Cart } from '../../../model/cart';
import { ApiService } from '../../../service/api.service';
import { NavigationComponent } from '../../navigation/navigation.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [NavigationComponent, FormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  cartlist: Cart[] = [];
  totalSum: number = 0;
  private paymentForm: any;
  fileToUpload: File | null = null;
  imageUrl: string = "/assets/img/noimage.png";
  
  model: Address = {
    address: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    phonenumber: ''

  };

  constructor(private api: ApiService, private route: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.api.getCartItems().subscribe(res => {
      this.cartlist = res.oblist;
      this.cartlist.forEach(value => {
        this.totalSum = this.totalSum + (value.quantity * value.price);
      });
    });

    this.api.getAddress().subscribe(res => {
      if (res.map != null) {
        this.model = res.map;
      }
    }, err => {
      console.log(err);
    });
  }

  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
  if (inputElement.files && inputElement.files.length > 0) {
    this.fileToUpload = inputElement.files[0]; // Get the first selected file
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload as File);
  }}

  // addOrUpdateAddress() {
  //   this.api.addOrUpdateAddress(this.model).subscribe(res => {
  //     console.log(res);
  //     this.route.navigate(['/home']);
  //   });
  // }
  placeOrder(paymentType: any, amount: any, phone: any) {
    console.log("paymentType: ", paymentType.value);
    console.log("amount", amount.value);
    console.log("phone", phone.value);
    if (paymentType == undefined || paymentType == null || paymentType == '' || amount == undefined || amount == null || amount == 0) {
      this.snackBar.open('Please fill in the mandatory fields.', 'Close', { duration: 3000 });
    } else {
      this.api.placeOrder().subscribe(res => {
        console.log(res);
        console.log("orderid:: ",res.oblist[0].orderId);
        this.api.processOrder(paymentType.value, amount.value, phone.value = (phone.value === undefined) ? 0:phone.value, this.fileToUpload, res.oblist[0].orderId).subscribe(data => {
          console.log("process order:: ", data);
          this.api.getCartItems().subscribe(res2 => {
            this.cartlist = res2.oblist;
            this.api.cartAmount = this.cartlist.length;
          });
          this.snackBar.open('Order placed successfully.', 'Close', { duration: 3000 });
        })
      });
      this.route.navigate(['/home']);
    }
  }

}
