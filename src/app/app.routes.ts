import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './landing/landing.component';
import { RacasComponent } from './racas/list/racas.component';
import { CadastroRacasComponent } from './racas/cadastro-racas/cadastro-racas.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'racas', component: RacasComponent },
  { path: 'racas/novo', component: CadastroRacasComponent },
  { path: 'racas/:id', component: CadastroRacasComponent }
];
