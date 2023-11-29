import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { PersonaDataService } from 'src/app/personadata.service';
import { PerfilService } from 'src/app/services/perfil.service';

export interface IPerfil {
  id_persona: number;
  primernombre: string;
  segundonombre: string;
  paterno: string;
  materno: string;
  ci: string;
  celular: number;
  id_usuario: number;
  usuario: string;
  contrasenia: string;
  correo: string;
  rol: string;
  fk_id_persona: number;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent {
  form!: UntypedFormGroup;
  constructor(
    public perfilService: PerfilService,
    private _formBuilder: UntypedFormBuilder,
    public personaDataService: PersonaDataService
  ) {
    this.form = this._formBuilder.group({
      nombres: [''],
      ci: [''],
      celular: [''],
      correo: [''],
      rol: [''],
    });
    let idPerson = personaDataService.getData().id;
    this.setData(idPerson);
  }
  ngOnInit(): void {}
  setData(id: any) {
    combineLatest([this.perfilService.listPerfil(parseInt(id))]).subscribe(
      (response: any) => {
        let data = response[0].body;
        this.form.patchValue({
          nombres:
            data.primernombre +
            ' ' +
            data.segundonombre +
            ' ' +
            data.paterno +
            ' ' +
            data.materno,
          ci: data.ci,
          celular: data.celular,
          correo: data.correo,
          rol: data.rol,
        });
        console.log('data', this.form.value);

      }
    );
  }
}
