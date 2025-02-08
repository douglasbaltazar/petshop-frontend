import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginPageComponent } from "./login-page/login-page.component";
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './register-page/register-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginPageComponent, CommonModule, RegisterPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  selected: 'login' | 'cadastro' = 'login'
  constructor(private fb: FormBuilder) {
  }

  changeSelected(option: 'login' | 'cadastro'): void {
    this.selected = option;
  }

  
}