import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { IUsuario } from '../components/usuarios/usuarios.component';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  baseUrl: string = 'http://127.0.0.1:5000/';

  constructor(private httpClient: HttpClient) {}

  public addUsuario(body: any): Observable<HttpResponse<any>> {
    return this.httpClient.post(`${this.baseUrl}/usuarios`, body, {
      observe: 'response',
    });
  }
  public addPersona(body: any): Observable<HttpResponse<any>> {
    return this.httpClient.post(`${this.baseUrl}/personas`, body, {
      observe: 'response',
    });
  }
  public addDiagnostico(body: any): Observable<HttpResponse<any>> {
    return this.httpClient.post(`${this.baseUrl}/diagnosticos`, body, {
      observe: 'response',
    });
  }
  public addRutinaUsuario(body: any): Observable<HttpResponse<any>> {
    return this.httpClient.post(`${this.baseUrl}/rutinausuarios`, body, {
      observe: 'response',
    });
  }
  public validate(body: any): Observable<HttpResponse<any>> {
    return this.httpClient.post(`${this.baseUrl}/validateAdd`, body, {
      observe: 'response',
    });
  }
  public listPrediccion(body: any): Observable<HttpResponse<any>> {
    return this.httpClient.post(`${this.baseUrl}/modelo`, body, {
      observe: 'response',
    });
  }
  public listRutinas(): Observable<HttpResponse<any>> {
    return this.httpClient.get(`${this.baseUrl}/rutinas`, {
      observe: 'response',
    });
  }

  public listUsuarios(): Observable<HttpResponse<any>> {
    return this.httpClient.get(`${this.baseUrl}/personas`, {
      observe: 'response',
    });
  }public deleteRutinasUser(personId: number): Observable<HttpResponse<any>> {
    return this.httpClient.delete(`${this.baseUrl}/rutinausuario/${personId}`, {
      observe: 'response',
    });
  }

  public listPersonaUnico(personId: number): Observable<HttpResponse<any>> {
    return this.httpClient.get(`${this.baseUrl}/persona/${personId}`, {
      observe: 'response',
    });
  }
  public listUsuarioUnico(personId: number): Observable<HttpResponse<any>> {
    return this.httpClient.get(`${this.baseUrl}/usuario/${personId}`, {
      observe: 'response',
    });
  }
  public listDiagnosticoUnico(personId: number): Observable<HttpResponse<any>> {
    return this.httpClient.get(`${this.baseUrl}diagnostico/${personId}`, {
      observe: 'response',
    });
  }

  public editPersona(body: any, id: any): Observable<HttpResponse<any>> {
    return this.httpClient.put(`${this.baseUrl}/persona/${id}`, body, {
      observe: 'response',
    });
  }
  public editUsuario(body: any, id: any) {
    return this.httpClient.put(`${this.baseUrl}/usuario/${id}`, body, {
      observe: 'response',
    });
  }
  public editDiagnostico(body: any, id: any) {
    return this.httpClient.put(`${this.baseUrl}/diagnostico/${id}`, body, {
      observe: 'response',
    });
  }
  public listUsuariosReal(): Observable<HttpResponse<any>> {
    return this.httpClient.get(`${this.baseUrl}/usuarios`, {
      observe: 'response',
    });
  }
}
