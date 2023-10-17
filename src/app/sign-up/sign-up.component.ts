import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRegisterService } from '../service/user-register.service';
import { RouteService } from '../service/route.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private userRegisterService: UserRegisterService,
    private router: RouteService
  ) {
    this.userForm = this.formBuilder.group({
      userId: ['', [Validators.required, Validators.minLength(3)]],
      userName: ['', [Validators.required, Validators.minLength(3),Validators.pattern('[a-zA-Z ]*')]],
      userEmail: ['', [Validators.required,Validators.pattern("^[a-z0-9.+-]+@gmail\.com$")]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get userIdControl() {
    return this.userForm.get('userId');
  }

  get userNameControl() {
    return this.userForm.get('userName');
  }

  get userEmailControl() {
    return this.userForm.get('userEmail');
  }

  get userPasswordControl() {
    return this.userForm.get('userPassword');
  }

  get userConfirmPasswordControl() {
    return this.userForm.get('confirmPassword');
  }
  signUp() {
    if (this.userForm.valid) {
      const newUser = this.userForm.value;

      this.userRegisterService.saveLogin(newUser).subscribe(
        (response) => {
          this.snackBar.open('Registration successful!', 'Close', {
            duration: 2000,
          });
          this.router.navigateToLoginView();
          this.userForm.reset();
        },
        (error) => {
          this.snackBar.open('Registration failed. Please try again.', 'Close', {
            duration: 2000,
          });
        }
      );
    } else {
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', {
        duration: 2000,
      });
    }
  }
}
