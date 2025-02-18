import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { environment } from '../../environments/environment';
import { UserDTO } from '../dto/UserDTO';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { API } from '../../environments/apis';
import { Address } from '../model/address';
import { ProductDTO } from '../dto/ProductDTO';
import { CartRequestDTO } from '../dto/CartRequestDTO';
import { CartDTO } from '../dto/CartDTO';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  USER = 'USER';
  PRODUCT = 'PRODUCT';
  CART = 'CART';

  cartDTO: CartDTO = new CartDTO;
  productDTO: ProductDTO = new ProductDTO;
  userDTO: UserDTO = new UserDTO;
  cartRequestDTO: CartRequestDTO = new CartRequestDTO;

  public cartAmount: number = 0;

  constructor(private sessionStorage:SessionStorageService,private http: HttpClient) {
   }

  getBaseApiURL(type:any) {
    if (type === this.USER) {
      return environment.userBaseUrl;
    }

    if (type === this.PRODUCT) {
      return environment.productBaseUrl;
    }

    if (type === this.CART) {
      return environment.orderBaseUrl;
    }

    return "";
  }

   // Register new users to the system
   register(user: User): Observable<any> {
    return this.http.post(this.getBaseApiURL(this.USER) + API.signupUrl,
      JSON.stringify(user),
      {
        headers:
          { 'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' }
      });
  }

   // Validating user credentials
   login(user: User): Observable<any> {
    return this.http.post(this.getBaseApiURL(this.USER) + API.loginUrl,
      JSON.stringify(user),
      {
        headers:
          { 'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' }
      });
  }

  logout(){
    this.http.get<any>(this.getBaseApiURL(this.USER) + API.logoutUrl);
  }

  // Update Address 
  addOrUpdateAddress(adr: Address): Observable<any> {
    return this.http.post<any>(this.getBaseApiURL(this.USER) + API.addAddressUrl, 
      adr, 
      {
        headers:
          { 'Content-Type': 'application/json' }
      });
  }

  // Fetch address 
  getAddress(): Observable<any> {
    return this.http.get<any>(this.getBaseApiURL(this.USER) + API.viewAddressUrl);
  }

  // Fetching all the products
  getProducts(): Observable<any> {
    return this.http.get<any>(this.getBaseApiURL(this.PRODUCT) + API.productsUrl);
  }

  // Add product in the system
  addProduct( desc: string,
    quan: string, price: string, prodname: string, image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("description", desc);
    formData.append("price", price);
    formData.append("productname", prodname);
    formData.append("quantity", quan);
    formData.append("file", image);
    return this.http.post<any>(this.getBaseApiURL(this.PRODUCT) + API.addProductUrl, formData);
  }
  
  // Update Product for Logged Admin User
  updateProduct( desc: string,
    quan: string, price: string, prodname: string, image: File, productid: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("description", desc);
    formData.append("price", price);
    formData.append("productname", prodname);
    formData.append("quantity", quan);
    formData.append("file", image);
    formData.append("productId", productid);
    return this.http.put<any>(this.getBaseApiURL(this.PRODUCT) + API.updateProductUrl, formData);
  }

  // Delete Product
  deleteProduct( prodid: number) {
    return this.http.delete<any>(this.getBaseApiURL(this.PRODUCT) + API.deleteProductUrl + "?productId=" + prodid);
  }

  // Add products to the cart
  addToCart(product: any): Observable<any> {
    this.userDTO.name = this.sessionStorage.retrieve("username");
    this.userDTO.email =this.sessionStorage.retrieve("email");
    this.productDTO.productId = product.productid;
    this.productDTO.productName = product.productname;
    this.productDTO.productPrice = product.price;
    this.productDTO.productQuantity = product.quantity;
    this.cartRequestDTO.userDTO = this.userDTO;
    this.cartRequestDTO.productDTO = this.productDTO;
    console.log("this.cartRequestDTO: ", this.cartRequestDTO);
    return this.http.post<any>(this.getBaseApiURL(this.CART) + API.addToCartUrl, this.cartRequestDTO);
  }

  // View cart items
  getCartItems(): Observable<any> {
    this.userDTO.name = this.sessionStorage.retrieve("username");
    this.userDTO.email = this.sessionStorage.retrieve("email");
    return this.http.post<any>(this.getBaseApiURL(this.CART) + API.viewCartUrl, this.userDTO);
  }

  // Update items quantity in the cart
  updateCartItem(prodid: number, quant: number): Observable<any> {
    this.userDTO.name = this.sessionStorage.retrieve("username");
    this.userDTO.email = this.sessionStorage.retrieve("email");
    this.cartDTO.cartId = prodid;
    this.cartDTO.cartQuantity = quant;
    this.cartRequestDTO.userDTO = this.userDTO;
    this.cartRequestDTO.cartDTO = this.cartDTO;
    console.log("this.cartRequestDTO: ", this.cartRequestDTO);
    return this.http.put<any>(this.getBaseApiURL(this.CART) + API.updateCartUrl, this.cartRequestDTO);
  }

  // Delete cart Item 
  deleteCartItem(bufdid: number): Observable<any> {
    this.userDTO.name = this.sessionStorage.retrieve("username");
    this.userDTO.email = this.sessionStorage.retrieve("email");
    this.cartDTO.cartId = bufdid;
    this.cartRequestDTO.userDTO = this.userDTO;
    this.cartRequestDTO.cartDTO = this.cartDTO;
    console.log("this.cartRequestDTO: ", this.cartRequestDTO);
    return this.http.post<any>(this.getBaseApiURL(this.CART) + API.deleteCartUrl, this.cartRequestDTO);
  }

  // Fetch available orders placed
  getOrders() {
    return this.http.get<any>(this.getBaseApiURL(this.CART) + API.viewOrderUrl);
  }

  // Place the order 
  placeOrder(): Observable<any> {
    this.userDTO.name = this.sessionStorage.retrieve("username");
    this.userDTO.email = this.sessionStorage.retrieve("email");
    return this.http.post<any>(this.getBaseApiURL(this.CART) + API.placeOrderUrl, this.userDTO);
  }

  // Place the order 
  processOrder(paymentType: any, amount: any, phone: any, image:any, orderId:any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("paymentType", paymentType);
    formData.append("amount", amount);
    formData.append("phone", phone);
    formData.append("orderId", orderId);
    formData.append("file", image);
    return this.http.post<any>(this.getBaseApiURL(this.CART) + API.processOrderUrl, formData);
  }

  // Update status for order
  updateStatusForOrder( order: any) {
    const formData: FormData = new FormData();
    formData.append("orderId", order.orderId);
    formData.append("orderStatus", order.orderStatus);
    return this.http.post<any>(this.getBaseApiURL(this.CART) + API.updateOrderUrl, formData);
  }

  // Authentication Methods 
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  storeToken(token: string, auth_type: string) {
    this.sessionStorage.store("auth_token", token);
    this.sessionStorage.store("auth_type", auth_type);
  }

  storeUserInfo(user: User) {
    this.sessionStorage.store("username", user.username);
    this.sessionStorage.store("email", user.email);
  }

  getAuthType(): string {
    if (this.sessionStorage.retrieve("auth_type") !== null) {
      return this.sessionStorage.retrieve("auth_type");
    }
    return "";
  }

  getToken() {
    return this.sessionStorage.retrieve("auth_token");
  }

  removeToken() {
    this.sessionStorage.clear("auth_type");
    return this.sessionStorage.clear("auth_token");
  }
}
