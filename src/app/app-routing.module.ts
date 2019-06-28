import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// IMPORT COMPONENTS
import { CrearEventoComponent } from './components/inicio/crear-evento/crear-evento.component';
// import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CotizacionComponent } from './components/inicio/cotizacion/cotizacion.component';
import { LoginUserComponent } from './components/inicio/login-user/login-user.component';
import { EventoCreadoComponent } from './components/notificaciones/evento-creado/evento-creado.component';
import { UsuarioComponent } from './components/user/user.component';
import { TusEventosComponent } from './components/user/tus-eventos/tus-eventos.component';
import { DatosComponent } from './components/user/tus-eventos/datos/datos.component';
import { DetallesComponent } from './components/user/tus-eventos/detalles/detalles.component';
import { DataComponent } from './components/user/tus-eventos/data/data.component';
import { PersonalComponent } from './components/user/tus-eventos/personal/personal.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { DirectorioComponent } from './components/directorio/directorio.component';
import { NuevoEventoComponent } from './components/user/nuevo-evento/nuevo-evento.component';
import { CategoriaComponent } from './components/directorio/categoria/categoria.component';

// Import canActivate guard services
import { AuthGuard } from "./shared/guard/auth.guard";
import { SecureInnerPagesGuard } from "./shared/guard/secure-inner-pages.guard";

const routes: Routes = [
  { path: '', component: InicioComponent, data:{nav: 1}},
  // Pasarela de inicio
  { path: 'login', component: LoginUserComponent, canActivate:[SecureInnerPagesGuard] },
  { path: 'login/:idEvento', component: LoginUserComponent },
  { path: 'cotizacion', component: CotizacionComponent },
  { path: 'cotizacion/:idEvento', component: CotizacionComponent },
  { path: 'crear-evento/:idEvento', component: CrearEventoComponent },
  // Notificaciones
  { path: 'evento-creado/:idEvento', component: EventoCreadoComponent},
  // USUARIO
  { path: 'usuario', component: UsuarioComponent, children: [
    {path: 'evento/:id', component: DatosComponent, children:[
      {path: '', component: DetallesComponent},
      {path: 'detalles', component: DetallesComponent},
      {path: 'data', component: DataComponent},
      {path: 'personal', component: PersonalComponent},
    ]},
    { path: 'tus-eventos', component: TusEventosComponent, data: {nav: 2} },
    { path: 'perfil', component: PerfilComponent, data: {nav: 3}, canActivate:[AuthGuard]},
    { path: 'nuevo-evento', component: NuevoEventoComponent}
  ]},
  { path: 'directorio', component: DirectorioComponent, data: {nav: 4} },
  { path: 'categoria/:name', component: CategoriaComponent},

];


export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
