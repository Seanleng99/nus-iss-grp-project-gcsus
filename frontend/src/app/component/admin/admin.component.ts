import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router } from '@angular/router';
import { Product } from '../../model/product';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule, NavigationComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  fileToUpload: File | null = null;
  showAdd = false;
  auth!: string;
  
  constructor(private api: ApiService, private router: Router, private snackBar: MatSnackBar) { }
  imageUrl: string = "/assets/img/noimage.png";

  ngOnInit() {
    if (this.api.isAuthenticated()) {
      this.auth = this.api.getToken();
      this.api.getProducts().subscribe(
        res => {
          this.products = res.oblist;
        }
      );
    }
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

  show() {
    this.showAdd = true;
  }
  hide() {
    this.showAdd = false;
  }
  addProd(desc:any, quan:any, price:any, prodname:any, image:any) {
    this.api.addProduct(desc.value, quan.value, price.value, prodname.value, this.fileToUpload as File).subscribe(res => {
      this.products = res.oblist;
      if (res.status == '200') {
        this.snackBar.open('Product successfully added.', 'Close', { duration: 3000 });
      } else {
        this.snackBar.open('Failed to add product.', 'Close', { duration: 3000 });
      } 
    });
  }
  delProd(prodid:any) {

    this.api.deleteProduct(prodid.value).subscribe(res => {
      this.products = res.oblist;
      if (res.status == '200') {
        this.snackBar.open('Product successfully deleted.', 'Close', { duration: 3000 });
      } else {
        this.snackBar.open('Failed to delete product.', 'Close', { duration: 3000 });
      }
      this.ngOnInit();
    });
    
  }
  edit(prodid:any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "user": prodid.value
      }
    };
    this.router.navigate(["admin/edit"], navigationExtras);
  }

  onKeyPressNumeric(e:any) {
    var valid = false;
    var key = e.keyCode || e.which;

    if (key >= 48 && 57 >= key) {
      valid = true;
    }
    if (!valid) {
      e.preventDefault();
    }
    return valid;
  }
}
