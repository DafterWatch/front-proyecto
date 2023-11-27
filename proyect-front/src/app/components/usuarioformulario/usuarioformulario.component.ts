import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription, combineLatest } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-usuarioformulario',
  templateUrl: './usuarioformulario.component.html',
  styleUrls: ['./usuarioformulario.component.scss'],
})
export class UsuarioformularioComponent {
  expValue = 5;
  grasaValue = 5;
  expText = 'Intermedio';
  grasaText = 'Intermedio';
  rutinasList = [];
  private subscription: Subscription = new Subscription();
  formTitle: string = '';
  idPersonaFormField = new FormControl(0);
  idUsuarioFormField = new FormControl(0);
  idDiagnosticoFormField = new FormControl(0);
  fkidpersonaFormField = new FormControl(0);
  primernombreFormField = new FormControl('', [Validators.required]);
  segundonombreFormField = new FormControl('');
  paternoFormField = new FormControl('', [Validators.required]);
  maternoFormField = new FormControl('');
  ciFormField = new FormControl('', [Validators.required]);
  celularFormField = new FormControl('', [Validators.required]);
  contraseniaFormField = new FormControl('', [Validators.required]);
  correoFormField = new FormControl('', [Validators.required]);
  rolFormField = new FormControl('', Validators.required);
  fechaNacimientoFormField = new FormControl(new Date(), Validators.required);
  pesoFormField = new FormControl('', [Validators.required]);
  alturaFormField = new FormControl('', [Validators.required]);
  problemasSaludFormField = new FormControl('', [Validators.required]);
  objetivoFormField = new FormControl('', [Validators.required]);
  grasaFormField = new FormControl(5);
  experienciaFormField = new FormControl(5);
  sexoFormField = new FormControl('', Validators.required);
  tipoCuerpoFormField = new FormControl('', Validators.required);
  rutinaFormField = new FormControl('');
  constructor(
    public dialogRef: MatDialogRef<UsuarioformularioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuarioService: UsuarioService,
    private snackbarService: SnackbarService,
  ) {
    this.setFields(this.data.id);
  }
  ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
  onSave() {
    if ((this.idPersonaFormField as any) == 0) {
      combineLatest([
        this.usuarioService.validate({
          ci: this.ciFormField.value,
          correo: this.correoFormField.value,
        }),
      ]).subscribe((response: any) => {
        if (response[0].body.resultado === 1) {
          combineLatest([
            this.usuarioService.addPersona(this.getFieldsPersona()),
          ]).subscribe((response2: any) => {
            let id_persona = response2[0].body.datos.id_persona;
            this.fkidpersonaFormField.setValue(id_persona);
            combineLatest([
              this.usuarioService.addUsuario(this.getFieldsUsuario()),
            ]).subscribe((response3: any) => {
              combineLatest([
                this.usuarioService.listPrediccion(this.getFieldsModelo()),
              ]).subscribe((response4: any) => {
                let rutina = response4[0].body.valor;
                combineLatest([
                  this.usuarioService.addDiagnostico(
                    this.getFieldsDiagnostico(rutina)
                  ),
                ]).subscribe((response5: any) => {
                  combineLatest([this.usuarioService.listRutinas()]).subscribe(
                    (response6: any) => {
                      this.rutinasList = response6[0].body.Rutinas;
                      const result = this.rutinasList.filter((obj) => {
                        return (obj as any).id_rutina_grupo == parseInt(rutina);
                      });
                      for (let i = 0; i < result.length; i++) {
                        combineLatest([
                          this.usuarioService.addRutinaUsuario({
                            fk_id_persona: this.fkidpersonaFormField.value,
                            fk_id_rutina: (result[i] as any).id_rutina,
                            completa: false,
                          }),
                        ]).subscribe((response7: any) => {});
                      }
                      this.snackbarService.show('Usuario nuevo registrado');
                      this.dialogRef.close(response);
                    }
                  );
                });
              });
            });
          });
        } else {
          this.snackbarService.show('Error del sistema');
        }
      });
    } else {
      combineLatest([
        this.usuarioService.editPersona(
          this.getFieldsPersona(),
          this.idPersonaFormField.value
        ),
      ]).subscribe((response) => {
        let id_persona = (response as any)[0].body.id_persona;
        this.fkidpersonaFormField.setValue(id_persona);
        combineLatest([
          this.usuarioService.editUsuario(
            this.getFieldsUsuario(),
            this.idUsuarioFormField.value
          ),
        ]).subscribe((response2) => {
          combineLatest([
            this.usuarioService.editDiagnostico(
              this.getFieldsDiagnostico(this.rutinaFormField.value),
              this.idDiagnosticoFormField.value
            ),
          ]).subscribe((response3) => {
            this.snackbarService.show('Usuario editado');
            this.dialogRef.close();
          });
        });
      });
    }
  }
  private setFields(userId: number) {
    if (userId != 0) {
      this.formTitle = 'Editar Usuario';
      this.usuarioService.listUsuarioUnico(userId).subscribe((response) => {
        if (response != null) {
          this.idUsuarioFormField.setValue(response.body.id_usuario);
          this.correoFormField.setValue(response.body.correo);
          this.contraseniaFormField.setValue(response.body.contrasenia);
          this.rolFormField.setValue(response.body.rol);
          this.fkidpersonaFormField.setValue(response.body.fk_id_persona);
        }
      });
      this.usuarioService.listPersonaUnico(userId).subscribe((response) => {
        if (response != null) {
          this.idPersonaFormField.setValue(response.body.id_persona);
          this.primernombreFormField.setValue(response.body.primernombre);
          this.segundonombreFormField.setValue(response.body.segundonombre);
          this.paternoFormField.setValue(response.body.paterno);
          this.maternoFormField.setValue(response.body.materno);
          this.ciFormField.setValue(response.body.ci);
          this.celularFormField.setValue(response.body.celular);
        }
      });
      this.usuarioService.listDiagnosticoUnico(userId).subscribe((response) => {
        if (response != null) {
          let diagnostico = response;
          let edadParts = (diagnostico as any).body.edad.split('-');
          let edadObjeto = new Date(
            +edadParts[2],
            edadParts[1] - 1,
            +edadParts[0]
          );
          this.idDiagnosticoFormField.setValue(response.body.id_diagnostico);
          this.fechaNacimientoFormField.setValue(edadObjeto);
          this.pesoFormField.setValue(response.body.peso);
          this.alturaFormField.setValue(response.body.altura);
          this.problemasSaludFormField.setValue(response.body.problemas_salud);
          this.objetivoFormField.setValue(response.body.objetivo);
          this.grasaFormField.setValue(response.body.grasa.toString());
          this.experienciaFormField.setValue(
            response.body.experiencia.toString()
          );
          this.sexoFormField.setValue(response.body.sexo.toString());
          this.tipoCuerpoFormField.setValue(response.body.tipocuerpo);
          this.rutinaFormField.setValue(response.body.rutina);
        }
      });
    } else {
      this.formTitle = 'Nuevo Usuario';
      this.primernombreFormField.setValue('');
      this.segundonombreFormField.setValue('');
      this.paternoFormField.setValue('');
      this.maternoFormField.setValue('');
      this.ciFormField.setValue('');
      this.celularFormField.setValue('');
    }
  }
  private getFieldsPersona(): any {
    return {
      id_persona: this.idPersonaFormField.value
        ? this.idPersonaFormField.value
        : '',
      primernombre: this.primernombreFormField.value,
      segundonombre: this.segundonombreFormField.value,
      paterno: this.paternoFormField.value,
      materno: this.maternoFormField.value,
      ci: this.ciFormField.value,
      celular: this.celularFormField.value,
    };
  }
  private getFieldsUsuario(): any {
    return {
      id_usuario: this.idUsuarioFormField.value
        ? this.idUsuarioFormField.value
        : '',
      usuario: this.correoFormField.value,
      correo: this.correoFormField.value,
      contrasenia: this.contraseniaFormField.value,
      rol: this.rolFormField.value,
      fk_id_persona: this.fkidpersonaFormField.value,
    };
  }
  private getFieldsDiagnostico(rutina: any): any {
    let meso = 0,
      endo = 0;
    if (this.tipoCuerpoFormField.value == 'Mesomorfo') {
      meso = 1;
      endo = 0;
    } else if (this.tipoCuerpoFormField.value == 'Endomorfo') {
      meso = 0;
      endo = 1;
    } else {
      meso = 0;
      endo = 0;
    }
    let perpeso = 0;
    if (this.objetivoFormField.value === 'PerderPeso') {
      perpeso = 1;
    } else {
      perpeso = 0;
    }
    return {
      id_diagnostico: this.idDiagnosticoFormField.value
        ? this.idDiagnosticoFormField.value
        : '',
      edad: this.returnDateInFormatYYYYMMDD(
        this.fechaNacimientoFormField.value
          ? this.fechaNacimientoFormField.value
          : new Date()
      ),
      peso: this.pesoFormField.value,
      altura: this.alturaFormField.value,
      problemas_salud: this.problemasSaludFormField.value,
      objetivo: this.objetivoFormField.value,
      grasa: this.grasaFormField.value,
      experiencia: this.experienciaFormField.value,
      sexo: this.sexoFormField.value,
      tipocuerpo: this.tipoCuerpoFormField.value,
      fk_id_persona: this.fkidpersonaFormField.value,
      rutina: rutina,
    };
  }
  private getFieldsModelo(): any {
    let meso = 0,
      endo = 0;
    if (this.tipoCuerpoFormField.value == 'Mesomorfo') {
      meso = 1;
      endo = 0;
    } else if (this.tipoCuerpoFormField.value == 'Endomorfo') {
      meso = 0;
      endo = 1;
    } else {
      meso = 0;
      endo = 0;
    }
    let perpeso = 0;
    if (this.objetivoFormField.value === 'PerderPeso') {
      perpeso = 1;
    } else {
      perpeso = 0;
    }
    return {
      grasa: this.grasaFormField.value,
      altura: parseInt(
        this.alturaFormField.value ? this.alturaFormField.value : '0'
      ),
      peso: parseInt(this.pesoFormField.value ? this.pesoFormField.value : '0'),
      experiencia: this.experienciaFormField.value,
      endomorfo: endo,
      mesomorfo: meso,
      objetivo: perpeso,
      sexo: parseInt(this.sexoFormField.value ? this.sexoFormField.value : '0'),
    };
  }
  returnDateInFormatYYYYMMDD(date: Date) {
    let day = date.getDate() + '';
    let month = date.getMonth() + 1 + '';
    let year = date.getFullYear() + '';
    day = parseInt(day) < 10 ? '0' + day : day;
    month = parseInt(month) < 10 ? '0' + month : month;
    return `${day}-${month}-${year}`;
  }
  updateSettingGrasa(event: any) {
    this.grasaValue = event.value;
    switch (event.value) {
      case 1:
        this.grasaText = 'Obesidad Morbida';
        break;
      case 2:
        this.grasaText = 'Obesidad Grave';
        break;
      case 3:
        this.grasaText = 'Obesidad Alta';
        break;
      case 4:
        this.grasaText = 'Obesidad Baja';
        break;
      case 5:
        this.grasaText = 'Intermedio';
        break;
      case 6:
        this.grasaText = 'Fisico Promedio';
        break;
      case 7:
        this.grasaText = 'Fisico Bueno';
        break;
      case 8:
        this.grasaText = 'Fisico Alto';
        break;
      case 9:
        this.grasaText = 'Fisico Sobresaliente';
        break;
      case 10:
        this.grasaText = 'Fisico Excelente';
        break;
    }
  }
  updateSettingExperiencia(event: any) {
    this.expValue = event.value;
    switch (event.value) {
      case 1:
        this.expText = 'Novato';
        break;
      case 2:
        this.expText = 'Muy Bajo';
        break;
      case 3:
        this.expText = 'Bajo';
        break;
      case 4:
        this.expText = 'Bajo Intermedio';
        break;
      case 5:
        this.expText = 'Intermedio';
        break;
      case 6:
        this.expText = 'Alto Intermedio';
        break;
      case 7:
        this.expText = 'Conocedor';
        break;
      case 8:
        this.expText = 'Muy Alto';
        break;
      case 9:
        this.expText = 'Demasiado Alto';
        break;
      case 10:
        this.expText = 'Experto';
        break;
    }
  }
}
