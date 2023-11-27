import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { combineLatest } from 'rxjs';
import { PersonaDataService } from 'src/app/personadata.service';
import { RutinaService } from 'src/app/services/rutinas.service';
export interface IRutina {
  id_rutina: number;
  imagen: string;
  titulo: string;
  repeticiones: string;
  descripcion: string;
  instrucciones: string;
  video: string;
  id_rutina_grupo: number;
}
export interface IRutinaUser {
  id_rutina_usuario: number;
  fk_id_persona: number;
  fk_id_rutina: number;
  completa: boolean;
}
@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.scss'],
})
export class RutinasComponent {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  pageSize = 9;
  pageIndex = 0;
  listRutinas: IRutina[] = [];
  listRutinasScreen: IRutina[] = [];
  listRutinasUser: IRutinaUser[] = [];
  selectedRutina: any;
  idPersona: any;
  modalOpen = false;
  toggleModal(noticia: any) {
    this.modalOpen = !this.modalOpen;
    this.selectedRutina = noticia;
  }
  constructor(
    private rutinasService: RutinaService,
    public personaDataService: PersonaDataService
  ) {
    this.idPersona = personaDataService.getData().id;
  }
  ngOnInit() {
    this.paginator.pageSize = this.pageSize;
    this.GetRutinas();
  }
  private GetRutinas() {
    combineLatest([this.rutinasService.listRutinas()]).subscribe((response) => {
      this.listRutinas = response[0].body.Rutinas;
      this.GetRutinasUser();
    });
  }
  private GetRutinasUser() {
    combineLatest([
      this.rutinasService.listRutinaUnico(this.idPersona),
    ]).subscribe((response) => {
      this.listRutinasUser = response[0].body.RutinaUsuarios;
      this.GetRutinasCombination();
    });
  }
  private GetRutinasCombination() {
    var array: any = [];
    for (var i = 0; i < this.listRutinasUser.length; i++) {
      var si = false;
      var id = 0;
      for (var j = 0; j < this.listRutinas.length; j++) {
        if (
          this.listRutinasUser[i].fk_id_rutina == this.listRutinas[j].id_rutina
        ) {
          si = true;
          id = j;
        }
      }
      array.push(this.listRutinas[id]);
    }
    this.listRutinasScreen = array;
  }
  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
  }
  getRange() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return { startIndex, endIndex };
  }
}
