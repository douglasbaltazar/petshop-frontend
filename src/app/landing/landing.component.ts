import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from '../login-page/login-page.component';
import { RegisterPageComponent } from '../register-page/register-page.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [LoginPageComponent, CommonModule, RegisterPageComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  title = 'frontend';
  selected: 'login' | 'cadastro' = 'login'
  constructor() {
  }

  changeSelected(option: 'login' | 'cadastro'): void {
    this.selected = option;
  }

  
}