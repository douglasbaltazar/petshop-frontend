import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, ToastModule],
  providers: [AuthService, MessageService],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private messageService: MessageService) {
    this.loginForm = this.fb.group({
      cpf: [''],
      password: ['']
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService
      .login(this.loginForm.value.cpf, this.loginForm.value.password)
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Login', detail: 'Login realizado com sucesso!' });
          setTimeout(() => {
            this.router.navigate(['/dashboard'])
          }, 300)
        },
        error: () =>
          console.log('deu erro')
      });
    }
  }
}
