import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Product } from '../../../model/product';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  imageSource: any;
  @Input()
  public product!: Product;

  @Output() productAddToCart: EventEmitter<Product> = new EventEmitter<Product>();
  constructor(private http: HttpClient,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.convertBase64ToImage( this.product.productimage ? URL.createObjectURL(this.product.productimage) : "");
  }

  addToCart() {
    this.productAddToCart.emit(this.product);
  }

  convertBase64ToImage(base64Data: string) {
    // Sanitize the Base64 data
    const sanitizedData = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${base64Data}`);

    // Assign the sanitized data to the image source
    this.imageSource = sanitizedData;
  }
}
