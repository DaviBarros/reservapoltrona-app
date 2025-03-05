import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Pessoa } from '../models/pessoa.model';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Poltrona } from '../models/poltrona.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private apiUrl = 'http://localhost:8080/api/pessoas';

  constructor(private http: HttpClient) { }

  getPessoaByPoltrona(codigoPoltrona: string) {
    return this.http.get<Pessoa>(`${this.apiUrl}/poltrona/${codigoPoltrona}`).pipe(
      catchError(error => {
        if (error.status === 404) {
          return of(null); // Retorna null quando não encontrar a pessoa
        }
        return throwError(error); // Propaga outros erros
      })
    );
  }

  liberarPoltrona(idPessoa: number): Observable<Poltrona> {
    return this.http.delete<Poltrona>(`${this.apiUrl}/${idPessoa}`);
  }

  cadastrarPessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.apiUrl, pessoa);
  }

}
