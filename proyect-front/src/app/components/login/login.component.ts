import { Component } from '@angular/core';
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
  username = '';
  password = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    public snackService: SnackbarService,
    public personaServiceData: PersonaDataService,
    public loginService: LoginService
  ) {}
  login() {
    console.log(this.username);
    console.log(this.password);

    if (this.username.length == 0 && this.password.length == 0) {
      this.snackService.show('Correo o contraseña invalido');
      return;
    }
    combineLatest([
      this.loginService.login({
        usuario: this.username,
        contrasenia: this.password,
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
            console.log(response[0].body);
            let pago = response[0].body;
            let fechaParts = pago.fecha_fin_sus.split('-');
            let fechaA = new Date(
              +fechaParts[2],
              fechaParts[1] - 1,
              +fechaParts[0]
            );
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
