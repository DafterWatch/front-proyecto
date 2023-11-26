import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IUsuario } from '../components/usuarios/usuarios.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  baseUrl: string = 'http://127.0.0.1:5000/';

  constructor(private httpClient: HttpClient) {}

  public addUsuario(formUsuario: any) {
    return this.httpClient
      .post<any>(this.baseUrl + 'usuarios', formUsuario)
      .pipe(
        map((Usuario: any) => {
          return Usuario;
        })
      );
  }

  public listUsuarios(): Observable<HttpResponse<any>> {
    return this.httpClient.get(`${this.baseUrl}/personas`, {
        observe: 'response',
    });
}

  public listUsuarioUnico(id: any) {
    return this.httpClient.get<IUsuario>(this.baseUrl + 'usuario/' + id);
  }

  public editUsuario(formUsuario: any, id: any) {
    return this.httpClient
      .put<any>(this.baseUrl + 'usuario/' + id, formUsuario)
      .pipe(
        map((Persona: any) => {
          return Persona;
        })
      );
  }
}
