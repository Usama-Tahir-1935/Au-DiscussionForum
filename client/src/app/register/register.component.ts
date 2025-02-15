import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private accountService: AccountService, private toastr: ToastrService) {}
 
  ngOnInit(): void {
  }

  register() {
    // Check if username and/or password is empty before making API call
    if (!this.model.username && !this.model.password) {
      this.toastr.error("Username and password are required!");
      return;
    }
  
    if (!this.model.username) {
      this.toastr.error("Username is required!");
      return;
    }
  
    if (!this.model.password) {
      this.toastr.error("Password is required!");
      return;
    }
  
    // Proceed with registration if inputs are filled
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error: error => {
        if (error.error.errors) {
          // If validation errors exist, display them all
          const validationErrors = error.error.errors;
          for (let key in validationErrors) {
            if (validationErrors.hasOwnProperty(key)) {
              validationErrors[key].forEach((message: string) => {
                this.toastr.error(message);
              });
            }
          }
        } else {
          // If it's a single error, show it
          this.toastr.error(error.error);
        }
        console.log(error);
      }
    });
  }
  

  cancel () {
    this.cancelRegister.emit(false);
  }

}
