import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { IUsuario } from '../components/usuarios/usuarios.component';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  baseUrl: string = 'http://127.0.0.1:5000/';

  constructor(private httpClient: HttpClient) {}

  public addServicio(body: any): Observable<HttpResponse<any>> {
    return this.httpClient.post(`${this.baseUrl}/servicios`, body, {
      observe: 'response',
    });
  }
  public listServicio(): Observable<HttpResponse<any>> {
    return this.httpClient.get(`${this.baseUrl}/servicios`, {
      observe: 'response',
    });
  }

  public listServicioUnico(personId: number): Observable<HttpResponse<any>> {
    return this.httpClient.get(`${this.baseUrl}/servicio/${personId}`, {
      observe: 'response',
    });
  }

  public editServicio(body: any, id: any): Observable<HttpResponse<any>> {
    return this.httpClient.put(`${this.baseUrl}/servicio/${id}`, body, {
      observe: 'response',
    });
  }
}
