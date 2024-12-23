import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  onSubmit() {
    if (this.username && this.password) {
      console.log('Login successful');
      console.log(`Username: ${this.username}, Password: ${this.password}`);
    } else {
      console.error('Form is invalid');
    }
  }
}
