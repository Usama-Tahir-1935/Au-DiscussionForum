import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  model: any = {};

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
  }

  login() {
    // Check if username and/or password is empty before making API call
    if (!this.model.userName && !this.model.password) {
      this.toastr.error("Username and password are required!");
      return;
    }
  
    if (!this.model.userName) {
      this.toastr.error("Username is required!");
      return;
    }
  
    if (!this.model.password) {
      this.toastr.error("Password is required!");
      return;
    }
  
    // Proceed with login if inputs are filled
    this.accountService.login(this.model).subscribe({
      next: _ => this.router.navigateByUrl('/members'),
      error: error => {
        if (error.status === 401) {
          this.toastr.error("Invalid username or password");
        } else {
          this.toastr.error("An error occurred. Please try again.");
        }
      }
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
