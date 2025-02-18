import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { CommonModule, NgStyle } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule, MatIconModule,CommonModule,
    NgStyle, NavigationComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: any;
  constructor(private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      email: '',
      password: '',
      username: '',
      age: '',
      usertype: 'customer'
    });
  }

  validateEmail() {
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.registerForm.value.email)) && this.registerForm.value.email != '' && this.registerForm.value.email != null) {
      return true;
    }
    return false;
  }

  validateRegisterButton() {
    if ((this.registerForm.value.email == null || this.registerForm.value.email == '') || (this.registerForm.value.password == null || this.registerForm.value.password == '') || 
      (this.registerForm.value.password != '' && this.registerForm.value.password.length < 8)) {
      return true;
    }
    return false;
  }

  validatePwCount() {
    if (this.registerForm.value.password != '' && this.registerForm.value.password.length < 8) {
      return true;
    }
    return false;
  }

  register(): void {
    this.apiService.register(this.registerForm.value).
      subscribe(res => {
        if (res.status == "400") {
          console.log("Details cannot be empty :)");
          this.snackBar.open('An error has been occured. Please try again :)', 'Close', { duration: 3000 });
        } else {
          this.router.navigate(['/login']);
          this.snackBar.open('Your account has been registered successfully. Please login :)', 'Close', { duration: 3000 });
        }
      },
      err => {
        this.snackBar.open('An error has been occured. Please try again :)', 'Close', { duration: 3000 });
      });
  }
  
}
