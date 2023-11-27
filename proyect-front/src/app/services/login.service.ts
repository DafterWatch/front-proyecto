import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { IUsuario } from '../components/usuarios/usuarios.component';
import { Observable, throwError } from 'rxjs';
import { SnackbarService } from '../snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl: string = 'http://127.0.0.1:5000/';

  constructor(
    private httpClient: HttpClient,
    public snackbarService: SnackbarService
  ) {}
  public login(body: any): Observable<HttpResponse<any>> {
    return this.httpClient.post(`${this.baseUrl}/login`, body, {
      observe: 'response',
    });
  }
  public listPagoUnico(personId: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get(`${this.baseUrl}pago/${personId}`, {
        observe: 'response',
      })
      .pipe(
        catchError((error: any) => {
          this.snackbarService.show(
            'Este usuario no esta registrado en algun servicio'
          );
          return throwError(error);
        })
      );
  }
}
