import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { IUsuario } from '../components/usuarios/usuarios.component';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RutinaService {
  baseUrl: string = 'http://127.0.0.1:5000/';

  constructor(private httpClient: HttpClient) {}
  public listRutinas(): Observable<HttpResponse<any>> {
    return this.httpClient.get(`${this.baseUrl}/rutinas`, {
      observe: 'response',
    });
  }

  public listRutinaUnico(personId: number): Observable<HttpResponse<any>> {
    return this.httpClient.get(`${this.baseUrl}/rutinausuario/${personId}`, {
      observe: 'response',
    });
  }
}
