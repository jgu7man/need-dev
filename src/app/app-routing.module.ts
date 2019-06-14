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

const routes: Routes = [
  { path: '', component: InicioComponent},
  // Pasarela de inicio
  { path: 'login', component: LoginUserComponent },
  { path: 'login/:idEvento', component: LoginUserComponent },
  { path: 'cotizacion', component: CotizacionComponent },
  { path: 'cotizacion/:idEvento', component: CotizacionComponent },
  { path: 'crear-evento/:idEvento', component: CrearEventoComponent },
  // Notificaciones
  { path: 'evento-creado/:idEvento', component: EventoCreadoComponent},
  { path: 'usuario', component: UsuarioComponent, children: [
    {path: 'evento/:id', component: DatosComponent, children:[
      {path: '', component: DetallesComponent},
      {path: 'detalles', component: DetallesComponent},
      {path: 'data', component: DataComponent},
      {path: 'personal', component: PersonalComponent},
    ]},
    {path: 'tus-eventos', component: TusEventosComponent }
  ]}

];


export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
