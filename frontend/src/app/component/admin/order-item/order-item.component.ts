import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../service/api.service';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../../navigation/navigation.component';

@Component({
  selector: 'app-order-item',
  imports: [CommonModule, NavigationComponent],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss'
})
export class OrderItemComponent implements OnInit {

  auth!: string;
  orderlist: any[] = [];
  constructor(private route: Router, private api: ApiService) { }

  ngOnInit() {
    this.auth = this.api.getToken();
    this.getOrderList();
  }

  approve(orderid:any) {
    let order = {
      "orderId": orderid,
      "orderStatus": "Approved"
    }
    this.api.updateStatusForOrder( order).subscribe(res => {
      this.getOrderList();
    });
  }

  decline(orderid:any) {
    let order = {
      "orderId": orderid,
      "orderStatus": "Declined"
    }
    this.api.updateStatusForOrder(order).subscribe(res => {
      this.getOrderList();
    });
  }

  getOrderList() {
    this.api.getOrders().subscribe(res => {
      this.orderlist = res.orderlist;
    });
  }

}
