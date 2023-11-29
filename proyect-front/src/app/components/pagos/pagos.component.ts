import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription, combineLatest } from 'rxjs';
import { PagoService } from 'src/app/services/pagos.service';
import { ServicioService } from 'src/app/services/servicios.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SnackbarService } from 'src/app/snackbar.service';
export interface IUsuarioReal {
  id_usuario: number;
  usuario: string;
  contrasenia: string;
  correo: string;
  rol: string;
  fk_id_persona: number;
}
export interface IServicio {
  id_servicio: number;
  nombre: string;
  precio: number;
}
@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss'],
})
export class PagosComponent {
  private subscription: Subscription = new Subscription();
  formTitle: string = '';
  listServicios: IServicio[] = [];
  listUsuarios: IUsuarioReal[] = [];
  idPagoFormField = new FormControl(0);
  fkIdServicioFormField = new FormControl('', [Validators.required]);
  fkIdUsuarioFormField = new FormControl('', [Validators.required]);
  montoFormField = new FormControl(0, [
    Validators.required,
    Validators.pattern(/^[0-9]\d*$/),
  ]);
  fechaInicioFormField = new FormControl(new Date(), [Validators.required]);
  fechaFinFormField = new FormControl(new Date(), [
    Validators.required,
  ]);
  fechaFormField = new FormControl(new Date());
  constructor(
    public dialogRef: MatDialogRef<PagosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pagoService: PagoService,
    private snackbarService: SnackbarService,
    private serviciosService: ServicioService,
    private usuariosService: UsuarioService
  ) {
    this.GetServicios();
    this.GetUsuarios();
    this.setFields(this.data.id);
  }
  ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
  private GetServicios() {
    combineLatest([this.serviciosService.listServicio()]).subscribe(
      (response) => {
        this.listServicios = response[0].body.Servicios;
      }
    );
  }
  private GetUsuarios() {
    combineLatest([this.usuariosService.listUsuariosReal()]).subscribe(
      (response) => {
        this.listUsuarios = response[0].body.Usuarios;
      }
    );
  }
  onSave() {
    if (
      this.fkIdServicioFormField.invalid ||
      this.fkIdUsuarioFormField.invalid ||
      this.montoFormField.invalid ||
      this.fechaInicioFormField.invalid ||
      this.fechaFinFormField.invalid
    ) {
      this.snackbarService.show('Los campos con * son obligatorios');
      return;
    }
    if (
      (this.fechaInicioFormField as any).value >
      (this.fechaFinFormField as any).value
    ) {
      this.snackbarService.show(
        'La fecha fin no puede ser menor a la fecha inicio'
      );
      return;
    }
    if ((this.idPagoFormField.value as any) == 0) {
      combineLatest([this.pagoService.addPago(this.getFields())]).subscribe(
        (response: any) => {
          this.snackbarService.show('Pago registrado');
          this.dialogRef.close();
        }
      );
    } else {
      combineLatest([
        this.pagoService.editPago(this.getFields(), this.idPagoFormField.value),
      ]).subscribe((response) => {
        this.snackbarService.show('Pago editado');
        this.dialogRef.close();
      });
    }
  }
  private setFields(userId: number) {
    if (userId != 0) {
      this.formTitle = 'Editar Pago';
      this.pagoService.listPagoUnico(userId).subscribe((response) => {
        if (response != null) {
          this.idPagoFormField.setValue(response.body.id_pago);
          this.fkIdServicioFormField.setValue(response.body.fk_id_servicio);
          this.fkIdUsuarioFormField.setValue(response.body.fk_id_usuario);
          this.montoFormField.setValue(response.body.monto_pagado);
          this.fechaInicioFormField.setValue(response.body.fecha_inicio_sus);
          this.fechaFinFormField.setValue(response.body.fecha_fin_sus);
          this.fechaFormField.setValue(response.body.fecha);
        }
      });
    } else {
      this.formTitle = 'Nuevo Pago';
      this.idPagoFormField.setValue(0);
      this.fkIdServicioFormField.setValue('');
      this.fkIdUsuarioFormField.setValue('');
      this.montoFormField.setValue(0);
      this.fechaInicioFormField.setValue(new Date());
      this.fechaFinFormField.setValue(new Date());
      this.fechaFormField.setValue(new Date());
    }
  }
  private getFields(): any {
    return {
      id_pago: this.idPagoFormField.value ? this.idPagoFormField.value : '',
      fk_id_usuario: this.fkIdUsuarioFormField.value
        ? this.fkIdUsuarioFormField.value
        : '',
      fk_id_servicio: this.fkIdServicioFormField.value
        ? this.fkIdServicioFormField.value
        : '',
      monto_pagado: this.montoFormField.value,
      fecha:
        this.idPagoFormField.value == 0
          ? this.returnDateInFormatYYYYMMDD(new Date())
          : this.fechaFormField.value,
      fecha_inicio_sus: this.fechaInicioFormField.value,
      fecha_fin_sus: this.fechaFinFormField.value,
      fk_id_usuario_empleado: 1,
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
