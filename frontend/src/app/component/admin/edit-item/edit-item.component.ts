import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../model/product';
import { ApiService } from '../../../service/api.service';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from '../../navigation/navigation.component';

@Component({
  selector: 'app-edit-item',
  imports: [FormsModule, NavigationComponent],
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.scss'
})
export class EditItemComponent implements OnInit {

  product: Product = {
    productid: 0,
    description: '',
    price: 0,
    productname: '',
    quantity: 0,
    productimage: null
  };
  products: Product[] = [];
  fileToUpload!: File;
  auth!: string;
  prodid!: string;
  imageUrl: string = "/assets/img/noimage.png";

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router, private snackBar: MatSnackBar) {
    if (this.api.isAuthenticated()) {
      this.auth = this.api.getToken();
      this.api.getProducts().subscribe(
        res => {
          res.oblist.forEach((pro: any) => {
            if (pro.productid == this.prodid) {
              this.product = pro;
              this.fileToUpload = pro.productimage;
            }
          });
        }
      );
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.prodid = params["user"];
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
    reader.readAsDataURL(this.fileToUpload);
  }}

  updateProd(desc:any, quan:any, price:any, prodname:any, image:any) {
    console.log(this.product.productid)
    this.api.updateProduct(desc.value, quan.value, price.value, prodname.value, this.fileToUpload, this.product.productid).subscribe(res => {
      console.log(res);
      if (res.status == '200') {
        this.snackBar.open('Product updated successfully.', 'Close', { duration: 3000 });
      } else {
        this.snackBar.open('Failed to update product.', 'Close', { duration: 3000 });
      }
    });
  }

  backtoAdminPage() {
    this.router.navigate(['/admin']);
  }

}
