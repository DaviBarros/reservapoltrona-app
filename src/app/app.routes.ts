import { Routes } from '@angular/router';
import { FormularioCadastroComponent } from './formulario-cadastro/formulario-cadastro.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, runGuardsAndResolvers: 'always'  },
  { path: 'cadastropessoa', component: FormularioCadastroComponent },

];


