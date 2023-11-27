import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PagoService {
  baseUrl: string = 'http://127.0.0.1:5000/';

  constructor(private httpClient: HttpClient) {}

  public addPago(body: any): Observable<HttpResponse<any>> {
    return this.httpClient.post(`${this.baseUrl}/pagos`, body, {
      observe: 'response',
    });
  }
  public listPago(): Observable<HttpResponse<any>> {
    return this.httpClient.get(`${this.baseUrl}/pagos`, {
      observe: 'response',
    });
  }

  public listPagoUnico(personId: number): Observable<HttpResponse<any>> {
    return this.httpClient.get(`${this.baseUrl}/pago/${personId}`, {
      observe: 'response',
    });
  }

  public editPago(body: any, id: any): Observable<HttpResponse<any>> {
    return this.httpClient.put(`${this.baseUrl}/pago/${id}`, body, {
      observe: 'response',
    });
  }
}
