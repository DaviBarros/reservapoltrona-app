import { PessoaService } from './../services/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { Poltrona } from '../models/poltrona.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PoltronaService } from '../services/poltrona.service';
import { map } from 'rxjs';
import { Pessoa } from '../models/pessoa.model';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-formulario-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './formulario-cadastro.component.html',
  styleUrl: './formulario-cadastro.component.css'
})
export class FormularioCadastroComponent implements OnInit {

  form: FormGroup;
  poltronas: Poltrona[] = [];
  errorMessage?: string;
  mostrarAlertSucesso = false;
  nomeCadastrado = '';

  constructor(private fb: FormBuilder, private pessoaService: PessoaService, private poltronaService: PoltronaService, private router: Router) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      codigoPoltrona: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarPoltronasAtivas();
  }

  carregarPoltronasAtivas(): void {
    this.poltronaService.getPoltronas().pipe(
      map((poltronas: any[]) =>
        poltronas.filter(p => p.status && p.status.toUpperCase() === 'ATIVO')
      )
    ).subscribe({
      next: (poltronasAtivas: any[]) => {
        this.poltronas = poltronasAtivas;
      },
      error: (err) => console.error('Erro ao carregar as poltronas:', err)
    });
  }


  /* onSubmit(): void {
    if (this.form.invalid) return;

    // Constrói o objeto Pessoa utilizando os valores do formulário
    const novaPessoa: Pessoa = {
      nome: this.form.value.nome,
      poltrona: {
        codigoPoltrona: this.form.value.codigoPoltrona
      }
    };

    this.pessoaService.cadastrarPessoa(novaPessoa).subscribe({

      next: (res) => {
        this.mostrarAlertSucesso = true;
        this.nomeCadastrado = this.form.value.nome;
        console.log('Pessoa cadastrada com sucesso:', res);
        this.form.reset();
        setTimeout(() => {
          this.dismissAlert();
        }, 8000);
      },
      error: (err) => console.error('Erro ao cadastrar pessoa:', err)
    });

  } */


  onSubmit(): void {
    if (this.form.invalid) return;

    const novaPessoa: Pessoa = {
      nome: this.form.value.nome,
      poltrona: {
        codigoPoltrona: this.form.value.codigoPoltrona
      }
    };

    this.pessoaService.cadastrarPessoa(novaPessoa).subscribe({
      next: (res) => {
        this.mostrarAlertSucesso = true;
        this.nomeCadastrado = this.form.value.nome;
        this.form.reset();
        // Atualiza as poltronas
        this.poltronaService.refreshPoltronas();
        setTimeout(() => {
          this.dismissAlert();
        }, 8000);
      },
      error: (err) => console.error('Erro ao cadastrar pessoa:', err)
    });
  }

  dismissAlert(): void {
    this.mostrarAlertSucesso = false;
  }

}
