import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PersonComponent } from './components/person/person.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMainComponent } from './components/app-main/app-main.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { MatIconModule } from '@angular/material/icon';
import { UsuarioformularioComponent } from './components/usuarioformulario/usuarioformulario.component';
import { PagolistComponent } from './components/pagolist/pagolist.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { RutinasComponent } from './components/rutinas/rutinas.component';
import { RutinainterfazComponent } from './components/rutinainterfaz/rutinainterfaz.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { NoticiasformularioComponent } from './components/noticiasformulario/noticiasformulario.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { ServicioformularioComponent } from './components/servicioformulario/servicioformulario.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { getEsPaginatorIntl } from './es-paginator-intl';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  MatOptionModule,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SafePipe } from './safe.pipe';
import { RutinasformularioComponent } from './components/rutinasformulario/rutinasformulario.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PersonComponent,
    AppMainComponent,
    UsuariosComponent,
    UsuarioformularioComponent,
    PagolistComponent,
    PagosComponent,
    RutinasComponent,
    RutinainterfazComponent,
    PerfilComponent,
    NoticiasComponent,
    NoticiasformularioComponent,
    ServiciosComponent,
    ServicioformularioComponent,
    SafePipe,
    RutinasformularioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getEsPaginatorIntl() },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
