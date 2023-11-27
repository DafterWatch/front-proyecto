import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription, combineLatest } from 'rxjs';
import { UsuarioformularioComponent } from '../usuarioformulario/usuarioformulario.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoticiasService } from 'src/app/services/noticias.service';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-noticiasformulario',
  templateUrl: './noticiasformulario.component.html',
  styleUrls: ['./noticiasformulario.component.scss'],
})
export class NoticiasformularioComponent {
  private subscription: Subscription = new Subscription();
  formTitle: string = '';
  idNoticiaFormField = new FormControl(0);
  tituloFormField = new FormControl('', [Validators.required]);
  descripcionFormField = new FormControl('', [Validators.required]);
  imagenFormField = new FormControl('', [Validators.required]);
  fechaFormField = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<UsuarioformularioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private noticiasService: NoticiasService,
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
      this.tituloFormField.invalid ||
      this.descripcionFormField.invalid ||
      this.imagenFormField.invalid
    ) {
      this.snackbarService.show('Los campos con * son obligatorios');
      return;
    }
    if ((this.idNoticiaFormField.value as any) == 0) {
      combineLatest([
        this.noticiasService.addNoticia(this.getFields()),
      ]).subscribe((response: any) => {
        this.snackbarService.show('Noticia registrada');
        this.dialogRef.close();
      });
    } else {
      combineLatest([
        this.noticiasService.editNoticia(
          this.getFields(),
          this.idNoticiaFormField.value
        ),
      ]).subscribe((response) => {
        this.snackbarService.show('Noticia editada');
        this.dialogRef.close();
      });
    }
  }
  private setFields(userId: number) {
    if (userId != 0) {
      this.formTitle = 'Editar Noticia';
      this.noticiasService.listNoticiaUnico(userId).subscribe((response) => {
        if (response != null) {
          this.idNoticiaFormField.setValue(response.body.id_noticia);
          this.tituloFormField.setValue(response.body.titulo);
          this.descripcionFormField.setValue(response.body.descripcion);
          this.imagenFormField.setValue(response.body.imagen);
          this.fechaFormField.setValue(response.body.fecha);
        }
      });
    } else {
      this.formTitle = 'Nueva Noticia';
      this.tituloFormField.setValue('');
      this.descripcionFormField.setValue('');
      this.imagenFormField.setValue('');
      this.fechaFormField.setValue('');
    }
  }
  private getFields(): any {
    return {
      id_noticia: this.idNoticiaFormField.value
        ? this.idNoticiaFormField.value
        : '',
      titulo: this.tituloFormField.value,
      descripcion: this.descripcionFormField.value,
      imagen: this.imagenFormField.value,
      fecha:
        this.idNoticiaFormField.value == 0
          ? this.returnDateInFormatYYYYMMDD(new Date())
          : this.fechaFormField.value,
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
}
