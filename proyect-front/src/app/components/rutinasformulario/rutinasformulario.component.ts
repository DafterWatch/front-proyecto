import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription, combineLatest } from 'rxjs';
import { RutinaService } from 'src/app/services/rutinas.service';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-rutinasformulario',
  templateUrl: './rutinasformulario.component.html',
  styleUrls: ['./rutinasformulario.component.scss'],
})
export class RutinasformularioComponent {
  private subscription: Subscription = new Subscription();
  formTitle: string = '';
  idRutinaFormField = new FormControl(0);
  imagenFormField = new FormControl('', [Validators.required]);
  tituloFormField = new FormControl('', [Validators.required]);
  repeticionesFormField = new FormControl('', [Validators.required]);
  descripcionFormField = new FormControl('', [Validators.required]);
  instruccionesFormField = new FormControl('', [Validators.required]);
  videoFormField = new FormControl('', [Validators.required]);
  idrutinagrupoFormField = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<RutinasformularioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rutinasService: RutinaService,
    private snackbarService: SnackbarService
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
    if (
      this.imagenFormField.invalid ||
      this.tituloFormField.invalid ||
      this.repeticionesFormField.invalid ||
      this.instruccionesFormField.invalid ||
      this.descripcionFormField.invalid ||
      this.videoFormField.invalid
    ) {
      this.snackbarService.show('Los campos con * son obligatorios');
      return;
    }
    if ((this.idRutinaFormField.value as any) == 0) {
    } else {
      combineLatest([
        this.rutinasService.editRutinas(
          this.getFields(),
          this.idRutinaFormField.value
        ),
      ]).subscribe((response) => {
        this.snackbarService.show('Rutina editada');
        this.dialogRef.close();
      });
    }
  }
  private setFields(userId: number) {
    if (userId != 0) {
      this.formTitle = 'Editar Rutina';
      this.rutinasService.listRutinarealUnico(userId).subscribe((response) => {
        if (response != null) {
          this.idRutinaFormField.setValue(response.body.id_rutina);
          this.imagenFormField.setValue(response.body.imagen);
          this.tituloFormField.setValue(response.body.titulo);
          this.repeticionesFormField.setValue(response.body.repeticiones);
          this.instruccionesFormField.setValue(response.body.instrucciones);
          this.descripcionFormField.setValue(response.body.descripcion);
          this.videoFormField.setValue(response.body.video);
          this.idrutinagrupoFormField.setValue(response.body.id_rutina_grupo);
        }
      });
    }
  }
  private getFields(): any {
    return {
      id_rutina: this.idRutinaFormField.value
        ? this.idRutinaFormField.value
        : '',
      imagen: this.imagenFormField.value,
      titulo: this.tituloFormField.value,
      repeticiones: this.repeticionesFormField.value,
      descripcion: this.descripcionFormField.value,
      instrucciones: this.instruccionesFormField.value,
      video: this.videoFormField.value,
      id_rutina_grupo: this.idrutinagrupoFormField.value,
    };
  }
}
