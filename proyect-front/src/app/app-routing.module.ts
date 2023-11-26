import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PersonComponent } from './components/person/person.component';
import { AppMainComponent } from './components/app-main/app-main.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { NoticiasformularioComponent } from './components/noticiasformulario/noticiasformulario.component';
import { RutinasComponent } from './components/rutinas/rutinas.component';
import { RutinainterfazComponent } from './components/rutinainterfaz/rutinainterfaz.component';
import { UsuarioformularioComponent } from './components/usuarioformulario/usuarioformulario.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { PagolistComponent } from './components/pagolist/pagolist.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { ServicioformularioComponent } from './components/servicioformulario/servicioformulario.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'app', component: AppMainComponent, children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'personas', component: PersonComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'usuarioformulario', component: UsuarioformularioComponent },
    { path: 'usuarioformularioedit/:id', component: UsuarioformularioComponent },
    { path: 'noticias', component: NoticiasComponent },
    { path: 'noticiaformulario', component: NoticiasformularioComponent },
    { path: 'noticiasedit/:id', component: NoticiasformularioComponent },
    { path: 'rutinas', component: RutinasComponent },
    { path: 'rutina/:id', component: RutinainterfazComponent },
    { path: 'pagolist', component: PagolistComponent },
    { path: 'pagos', component: PagosComponent },
    { path: 'pagosedit/:id', component: PagosComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'servicios', component: ServiciosComponent },
    { path: 'servicioformulario', component: ServicioformularioComponent },
    { path: 'serviciosedit/:id', component: ServicioformularioComponent },
  ]},
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
