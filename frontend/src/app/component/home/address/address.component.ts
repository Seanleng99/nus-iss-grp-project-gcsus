import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Address } from '../../../model/address';
import { ApiService } from '../../../service/api.service';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from '../../navigation/navigation.component';

@Component({
  selector: 'app-address',
  imports: [FormsModule, NavigationComponent],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent implements OnInit {

  private addressForm: any;
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
    this.api.getAddress().subscribe(res => {
      if (res.map != null) {
        this.model = res.map;
      }
    }, err => {
      console.log(err);
    });
  }

  addOrUpdateAddress() {
    this.api.addOrUpdateAddress(this.model).subscribe(res => {
      console.log(res);
      this.snackBar.open('Address updated successfully.', 'Close', { duration: 3000 });
      this.route.navigate(['/home']);
    });
  }

}
