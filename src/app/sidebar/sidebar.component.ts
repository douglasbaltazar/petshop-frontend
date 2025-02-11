import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MenuModule, CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  constructor() {}
  
  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'fa-solid fa-house', routerLink: ['/dashboard'] },
    { label: 'Atendimentos', icon: 'fa-solid fa-heart', routerLink: ['/atendimentos'] },
    { label: 'Clientes', icon: 'fa-solid fa-person', routerLink: ['/clientes'] },
    { label: 'Pets', icon: 'fa-solid fa-paw', routerLink: ['/pets'] },
    { label: 'Raças', icon: 'fa-solid fa-bone', routerLink: ['/racas'] },
    { label: 'Logout', icon: 'fa-solid fa-right-from-bracket', routerLink: ['/'] }
  ];

  ngOnInit(): void {
    console.log(this.menuItems)
  }
}
