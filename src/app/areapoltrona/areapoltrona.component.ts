import { PessoaService } from './../services/pessoa.service';
import { Component } from '@angular/core';
import { Poltrona, StatusPoltrona } from '../models/poltrona.model';
import { Pessoa } from '../models/pessoa.model';
import { PoltronaService } from '../services/poltrona.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-areapoltrona',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './areapoltrona.component.html',
  styleUrl: './areapoltrona.component.css'
})
export class AreapoltronaComponent {
  poltronas: Poltrona[] = []; // Lista de poltronas
  loading = false;
  errorMessage = '';
  public StatusPoltrona = StatusPoltrona;
  pessoa: Pessoa | null = null;

  constructor(private poltronaService: PoltronaService, private pessoaService: PessoaService, private router: Router) { }

  ngOnInit() {
    this.carregarPoltronas();

    this.poltronaService.poltronas$.subscribe(poltronas => {
      this.poltronas = poltronas;
      this.atualizarNomesPessoas();
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd && event.url === '/home')
    ).subscribe(() => {
      this.poltronaService.refreshPoltronas();
    });

    /* this.poltronas.forEach(p => {
      const codigo = p.codigoPoltrona.toString();
      this.buscarPessoaPorPoltrona(codigo);
    }); */
  }

  private atualizarNomesPessoas():void{
    this.poltronas.forEach(p => {
      const codigo = p.codigoPoltrona.toString();
      this.buscarPessoaPorPoltrona(codigo);
    });
  }

  carregarPoltronas() {
    this.loading = true;
    this.errorMessage = '';

    this.poltronaService.getPoltronas().subscribe({
      next: (data) => {
        this.poltronas = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Falha ao carregar poltronas: ' + err.message;
        this.loading = false;
      }
    });
  }

  buscarPessoaPorPoltrona(codigoPoltrona: string): void {

    this.pessoaService.getPessoaByPoltrona(codigoPoltrona).subscribe({
      next: (pessoa) => {
        const index = this.poltronas.findIndex(p => p.codigoPoltrona === codigoPoltrona);

        if (index !== -1) {
          // Sempre atualiza, mesmo se pessoa for null
          const novasPoltronas = [...this.poltronas];
          novasPoltronas[index] = {
            ...novasPoltronas[index],
            pessoaNome: pessoa?.nome || '',
            pessoaId: pessoa?.id_pessoa
          };
          this.poltronas = novasPoltronas;
        }
      },
      error: (err) => {
        console.error('Erro inesperado:', err);
      }
    });

  }

  trackByCodigo(index: number, poltrona: Poltrona): string | undefined {
    return poltrona.codigoPoltrona;
  }


  liberarPoltrona(poltrona: Poltrona): void {

    if (!poltrona.pessoaId) return;
    const confirmacao = confirm(`Liberar poltrona ${poltrona.codigoPoltrona}?`);

    if (confirmacao) {
      this.pessoaService.liberarPoltrona(poltrona.pessoaId).subscribe({
        next: () => { this.atualizarPoltrona(poltrona.codigoPoltrona); },
        error: (err) => this.mostrarErro(err)
      });
    }

  }

  private atualizarPoltrona(codigo: string): void {
    this.poltronas = this.poltronas.map(p =>
      p.codigoPoltrona === codigo ? {
        ...p,
        status: StatusPoltrona.ATIVO,
        pessoaNome: undefined,
        pessoa: undefined
      } : p
    );
  }

  private mostrarErro(erro: any): void {
    console.error('Erro:', erro);

    if (erro.error?.message) {
      alert(`Erro: ${erro.error.message}`);
    } else {
      alert('Erro ao processar a solicitação');
    }
  }

}
