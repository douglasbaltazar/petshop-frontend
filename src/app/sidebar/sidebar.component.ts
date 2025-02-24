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
  
  menuItems: MenuItem[] = [];

  ngOnInit(): void {
    // Tentar obter dados do usuário diretamente
    const tokenInfo = this.authService.getTokenInfo();
    if (tokenInfo) {
      console.log('Token info obtido diretamente:', tokenInfo);
      const isAdmin = tokenInfo.perfil === 'Admin';
      this.initializeMenu(isAdmin);
    }
    
    // Inscrever-se para atualizações futuras
    this.authService.currentUser.subscribe(user => {
      if (user) {
        console.log('Usuário atualizado:', user);
        const isAdmin = user.perfil === 'Admin';
        this.initializeMenu(isAdmin);
      }
    });
  }
  
  private initializeMenu(isAdmin: boolean) {
    this.menuItems = [
      { label: 'Dashboard', icon: 'fa-solid fa-house', routerLink: ['/dashboard'] },
      { label: 'Atendimentos', icon: 'fa-solid fa-heart', routerLink: ['/atendimentos'] },
      { label: 'Clientes', icon: 'fa-solid fa-person', routerLink: ['/clientes'] },
      { label: 'Pets', icon: 'fa-solid fa-paw', routerLink: ['/pets'] },
      { label: 'Raças', icon: 'fa-solid fa-bone', routerLink: ['/racas'] },
      { label: 'Logout', icon: 'fa-solid fa-right-from-bracket', command: () => {
          this.authService.logout();
        }
      }
    ];
  }
}
