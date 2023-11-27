import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersonaDataService {
  private menu = '';
  private idPersona = 0;

  setData(id: any, menu: any) {
    this.menu = id;
    this.idPersona = menu;
  }

  getData(): any {
    return { menu: this.menu, id: this.idPersona };
  }
}
