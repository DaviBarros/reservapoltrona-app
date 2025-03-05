import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AreapoltronaComponent } from './areapoltrona/areapoltrona.component';
import { FormularioCadastroComponent } from './formulario-cadastro/formulario-cadastro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AreapoltronaComponent, FormularioCadastroComponent, RouterLink, RouterLinkActive],
  providers: [],
  template:'<router-outlet></router-outlet>',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'poltrona-app';
}
