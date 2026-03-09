import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../core/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  username = 'nafath';
  password = '123456';
  error = signal('');
  showPassword = signal(false);

  constructor(private auth: Auth, private router: Router) {}

  onSubmit() {
   
    const success = this.auth.login(this.username, this.password);
    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error.set('Invalid credentials. Please try again.');
    }
  }
}
