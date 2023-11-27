import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { PersonaDataService } from 'src/app/personadata.service';
import { LoginService } from 'src/app/services/login.service';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  signInForm!: UntypedFormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    public snackService: SnackbarService,
    public personaServiceData: PersonaDataService,
    public loginService: LoginService,
    private _formBuilder: UntypedFormBuilder
  ) {}
  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
  login() {
    if (this.signInForm.invalid) {
      this.snackService.show('Correo o contraseña invalido');
      return;
    }
    combineLatest([
      this.loginService.login({
        usuario: this.signInForm.value.username,
        contrasenia: this.signInForm.value.password,
      }),
    ]).subscribe((response: any) => {
      if (response[0].body.resultado == 1) {
        let idPersona = response[0].body.datos.fk_id_persona;
        let rol = response[0].body.datos.rol;
        let idUsuario = response[0].body.datos.id_usuario;
        this.personaServiceData.setData(rol, idPersona);
        if (rol == 'Administrador' || rol == 'Empleado') {
          this.authService.login();
          this.router.navigate(['/app/home']);
        } else {
          combineLatest([
            this.loginService.listPagoUnico(parseInt(idUsuario)),
          ]).subscribe((response: any) => {
            let pago = response[0].body;
            let fechaA = new Date(pago.fecha_fin_sus);
            let fechaB = new Date();
            if (fechaB <= fechaA) {
              this.authService.login();
              this.router.navigate(['/app/home']);
            } else {
              this.snackService.show(
                'El servicio registrado con este usuario ya ha expirado'
              );
            }
          });
        }
      } else {
        this.snackService.show('Usuario no registrado');
      }
    });
  }
}
