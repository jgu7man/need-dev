import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterializeModule } from 'angular2-materialize';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxCalendarModule, IgxTimePickerModule, IgxDatePickerModule } from 'igniteui-angular';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from "./log/login.module";
import {HttpClientModule, HttpBackend} from '@angular/common/http';
//firebase services
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from "../environments/environment";

// SERVICIOS
import { FirebaseService } from "./log/firebase.service";
import { AuthService } from './shared/services/auth.service';
import { UsuarioService } from './services/usuario.service';
import { EventoService } from './services/evento.service';
// import { EventoService } from "./services/evento.service";


// COMPONENTS
import { AppComponent } from './app.component';
// NAVBAR
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainMenuComponent } from './components/navbar/main-menu/main-menu.component';
// FOOTER
import { FooterComponent } from './components/footer/footer.component';
// Pasarela de inicio
import { HeroformComponent } from './components/inicio/heroform/heroform.component';
import { CotizacionComponent } from './components/inicio/cotizacion/cotizacion.component';
import { CrearEventoComponent } from './components/inicio/crear-evento/crear-evento.component';
import { LoginUserComponent } from './components/inicio/login-user/login-user.component';
// Sección usuario
import { InicioComponent } from './components/inicio/inicio.component';
import { TusEventosComponent } from './components/user/tus-eventos/tus-eventos.component';
import { EventoCreadoComponent } from './components/notificaciones/evento-creado/evento-creado.component';
import { UsuarioComponent } from './components/user/user.component';
import { DatosComponent } from './components/user/tus-eventos/datos/datos.component';
import { DataComponent } from './components/user/tus-eventos/data/data.component';
import { PersonalComponent } from './components/user/tus-eventos/personal/personal.component';
import { DetallesComponent } from './components/user/tus-eventos/detalles/detalles.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { NuevoEventoComponent } from './components/user/nuevo-evento/nuevo-evento.component';

import { DirectorioComponent } from './components/directorio/directorio.component';
import { CategoriaComponent } from './components/directorio/categoria/categoria.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroformComponent,
    CrearEventoComponent,
    InicioComponent,
    FooterComponent,
    CotizacionComponent,
    LoginUserComponent,
    TusEventosComponent,
    EventoCreadoComponent,
    UsuarioComponent,
    DatosComponent,
    DataComponent,
    PersonalComponent,
    DetallesComponent,
    PerfilComponent,
    DirectorioComponent,
    MainMenuComponent,
    NuevoEventoComponent,
    CategoriaComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MaterializeModule,
    AngularDateTimePickerModule,
    IgxDatePickerModule,
    BrowserAnimationsModule,
    IgxCalendarModule,
    IgxTimePickerModule,
    // SocialLoginModule,
    LoginModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule
  ],
  providers: [
    // FirebaseService,
    AuthService,
    UsuarioService,
    EventoService
    // {provide: AuthServiceConfig, useFactory: provideConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
