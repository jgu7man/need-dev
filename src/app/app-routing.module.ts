import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// IMPORT COMPONENTS
import { CrearEventoComponent } from './components/pasarela/crear-evento/crear-evento.component';
// import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CotizacionComponent } from './components/inicio/cotizacion/cotizacion.component';
import { LoginUserComponent } from './components/login-user/login-user.component';

const routes: Routes = [
  { path: '', component: InicioComponent},
  { path: 'login', component: LoginUserComponent },
  { path: 'login/:idEvento', component: LoginUserComponent },
  { path: 'cotizacion', component: CotizacionComponent },
  { path: 'cotizacion/:idEvento', component: CotizacionComponent },
  { path: 'crear-evento/:idEvento', component: CrearEventoComponent },

];


export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
