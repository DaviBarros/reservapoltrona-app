/* // poltrona.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PoltronaService {
  private apiUrl = 'http://localhost:8080/api/poltronas';

  constructor(private http: HttpClient) { }

  getPoltronas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = this.getErrorMessage(error);
    return throwError(() => new Error(errorMessage));
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    // Erros de rede/cliente
    if (error.error instanceof ErrorEvent) {
      return 'Problema de conexão com a internet. Verifique sua rede.';
    }

    // Erros do servidor
    switch (error.status) {
      case 0:
        return 'Servidor indisponível ou conexão perdida';
      case 404:
        return 'Recurso não encontrado (URL incorreta)';
      case 500:
        return 'Erro interno do servidor. Tente novamente mais tarde.';
      case 503:
        return 'Serviço temporariamente indisponível para manutenção';
      case 401:
      case 403:
        return 'Acesso não autorizado. Faça login novamente.';
      default:
        return `Erro inesperado: ${error.message}`;
    }
  }
}
 */

// poltrona.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Poltrona } from '../models/poltrona.model';

@Injectable({ providedIn: 'root' })
export class PoltronaService {
  private apiUrl = 'http://localhost:8080/api/poltronas';
  private poltronasSubject = new BehaviorSubject<Poltrona[]>([]);
  poltronas$ = this.poltronasSubject.asObservable();

  constructor(private http: HttpClient) {}

  getPoltronas(): Observable<Poltrona[]> {
    return this.http.get<Poltrona[]>(this.apiUrl).pipe(
      tap(poltronas => this.poltronasSubject.next(poltronas))
    );
  }

  refreshPoltronas(): void {
    this.getPoltronas().subscribe();
  }
}
