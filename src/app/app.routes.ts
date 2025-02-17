import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './landing/landing.component';
import { RacasComponent } from './racas/list/racas.component';
import { CadastroRacasComponent } from './racas/cadastro-racas/cadastro-racas.component';
import { CadastroClientesComponent } from './clientes/cadastro-clientes/cadastro-clientes.component';
import { ListagemClientesComponent } from './clientes/listagem-clientes/listagem-clientes.component';
import { AuthService } from './services/auth/auth.service';
import { CadastroPetsComponent } from './pets/cadastro-pets/cadastro-pets.component';
import { ListComponent } from './pets/list/list.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthService] },
  { path: 'racas', component: RacasComponent, canActivate: [AuthService] },
  { path: 'racas/novo', component: CadastroRacasComponent, canActivate: [AuthService] },
  { path: 'racas/:id', component: CadastroRacasComponent, canActivate: [AuthService] },
  { path: 'clientes', component: ListagemClientesComponent, canActivate: [AuthService] },
  { path: 'cliente/novo', component: CadastroClientesComponent, canActivate: [AuthService] },
  { path: 'cliente/:id', component: CadastroClientesComponent, canActivate: [AuthService] },
  { path: 'pets', component: ListComponent, canActivate: [AuthService] },
  { path: 'pets/novo', component: CadastroPetsComponent, canActivate: [AuthService] },
  { path: 'pets/:id', component: CadastroPetsComponent, canActivate: [AuthService] },
  
];
