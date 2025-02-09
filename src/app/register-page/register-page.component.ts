import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      cpf: [''],
      password: [''],
      nome: ['']
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.authService
      .signup(this.registerForm.value.nome, this.registerForm.value.cpf, this.registerForm.value.password)
      .subscribe({
        next: () => {
          console.log('deu certo')
        },
        error: () =>
          console.log('deu erro')
      });
    }
  }

}
