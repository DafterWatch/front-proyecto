import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { IUsuario } from '../components/usuarios/usuarios.component';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoticiasService {
  baseUrl: string = 'http://127.0.0.1:5000/';

  constructor(private httpClient: HttpClient) {}

  public addNoticia(body: any): Observable<HttpResponse<any>> {
    return this.httpClient.post(`${this.baseUrl}/noticias`, body, {
      observe: 'response',
    });
  }
  public listNoticia(): Observable<HttpResponse<any>> {
    return this.httpClient.get(`${this.baseUrl}/noticias`, {
      observe: 'response',
    });
  }

  public listNoticiaUnico(personId: number): Observable<HttpResponse<any>> {
    return this.httpClient.get(`${this.baseUrl}/noticia/${personId}`, {
      observe: 'response',
    });
  }

  public editNoticia(body: any, id: any): Observable<HttpResponse<any>> {
    return this.httpClient.put(`${this.baseUrl}/noticia/${id}`, body, {
      observe: 'response',
    });
  }
}
