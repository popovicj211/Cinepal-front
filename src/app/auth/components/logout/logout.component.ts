import { Subscription } from 'rxjs';
import { HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  private subsription: Subscription = null;
  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  ngOnInit(): void {
    this.subsription = this.authService.logout().subscribe((res: string) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigate(['/auth/signin']);
  },
    (err: HttpErrorResponse) => {
      this.router.navigate(['/auth/signin']);
    }
  );
  }

}
