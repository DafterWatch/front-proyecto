import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription, combineLatest } from 'rxjs';
import { ServicioService } from 'src/app/services/servicios.service';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-servicioformulario',
  templateUrl: './servicioformulario.component.html',
  styleUrls: ['./servicioformulario.component.scss'],
})
export class ServicioformularioComponent {
  private subscription: Subscription = new Subscription();
  formTitle: string = '';
  idServicioFormField = new FormControl(0);
  nombreFormField = new FormControl('', [Validators.required]);
  precioFormField = new FormControl(0, [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<ServicioformularioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicioService: ServicioService,
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
      this.nombreFormField.invalid ||
      this.precioFormField.invalid
    ) {
      this.snackbarService.show('Los campos con * son obligatorios');
      return;
    }
    if ((this.idServicioFormField.value as any) == 0) {
      combineLatest([
        this.servicioService.addServicio(this.getFields()),
      ]).subscribe((response: any) => {
        this.snackbarService.show('Servicio registrado');
        this.dialogRef.close();
      });
    } else {
      combineLatest([
        this.servicioService.editServicio(
          this.getFields(),
          this.idServicioFormField.value
        ),
      ]).subscribe((response) => {
        this.snackbarService.show('Servicio editada');
        this.dialogRef.close();
      });
    }
  }
  private setFields(userId: number) {
    if (userId != 0) {
      this.formTitle = 'Editar Servicio';
      this.servicioService.listServicioUnico(userId).subscribe((response) => {
        if (response != null) {
          this.idServicioFormField.setValue(response.body.id_servicio);
          this.nombreFormField.setValue(response.body.nombre);
          this.precioFormField.setValue(response.body.precio);
        }
      });
    } else {
      this.formTitle = 'Nuevo Servicio';
      this.nombreFormField.setValue('');
      this.precioFormField.setValue(0);
    }
  }
  private getFields(): any {
    return {
      id_servicio: this.idServicioFormField.value
        ? this.idServicioFormField.value
        : '',
      nombre: this.nombreFormField.value,
      precio: this.precioFormField.value,
    };
  }
}
