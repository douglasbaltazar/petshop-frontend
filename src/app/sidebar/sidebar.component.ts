import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, PanelMenuModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  constructor(private authService: AuthService) {}
  
  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'fa-solid fa-house', routerLink: ['/dashboard'] },
    { label: 'Atendimentos', icon: 'fa-solid fa-heart', routerLink: ['/atendimentos'] },
    // { label: 'Pessoal', icon: 'fa-solid fa-person', items: [,{
    //   label: 'Endereços', icon: 'fa-solid fa-building', routerLink: ['/enderecos']},{
    //   label: 'Contatos', icon: 'fa-solid fa-address-book', routerLink: ['/contatos'],
    // }] },
    {label: 'Clientes', icon: 'fa-solid fa-person', routerLink: ['/clientes']},
    { label: 'Pets', icon: 'fa-solid fa-paw', routerLink: ['/pets'] },
    { label: 'Raças', icon: 'fa-solid fa-bone', routerLink: ['/racas'] },
    { label: 'Logout', icon: 'fa-solid fa-right-from-bracket', command: () => {
      this.authService.logout();
    } }
  ];

  ngOnInit(): void {

  }
}
