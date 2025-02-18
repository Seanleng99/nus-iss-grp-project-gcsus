import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgStyle } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';


@Component({
  selector: 'app-navigation',
  imports: [MatIconModule, NgStyle, MatBadgeModule, CommonModule, RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  loggedType!: string;
  cartAmount: number =0;

  constructor(private apiService:ApiService,
    private route:Router,
    private snackBar:MatSnackBar ) {
      this.cartAmount = apiService.cartAmount;
   
    if (this.apiService.getAuthType() == null) {
      this.loggedType = "home";
    } else {
      if (this.apiService.getAuthType() == "customer") {
        this.loggedType = "customer";
      } else if (this.apiService.getAuthType() == "admin") {
        this.loggedType = "admin";
      }
    }
  }
  logout() {
    this.loggedType = "home";
    this.apiService.removeToken();
    this.apiService.logout();
    this.snackBar.open('You have been logged out.', 'Close', { duration: 3000 });
    this.route.navigate(['/login']);
  }

}
