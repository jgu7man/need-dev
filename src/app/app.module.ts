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
// import { Fire } from "firebase-admin";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { environment } from "../environments/environment";



// SERVICIOS
import { FirebaseService } from "./log/firebase.service";
import { UsuarioService } from './services/usuario.service';
import { EventoService } from './services/evento.service';
// import { EventoService } from "./services/evento.service";


// COMPONENTS
import { AppComponent } from './app.component';
// NAVBAR
import { NavbarComponent } from './components/navbar/navbar.component';
import { DirComponent } from './components/navbar/dir/dir.component';
import { HomeComponent } from './components/navbar/home/home.component';
import { MenuComponent } from './components/navbar/menu/menu.component';
import { RegComponent } from './components/navbar/reg/reg.component';
import { UserComponent } from './components/navbar/user/user.component';
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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MenuComponent,
    UserComponent,
    DirComponent,
    RegComponent,
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
    PerfilComponent
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
    AngularFireModule.initializeApp({
      credential: environment.firebase,
      databaseURL: "https://need-f6bad.firebaseio.com"}),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
  ],
  providers: [
    FirebaseService,
    UsuarioService,
    EventoService
    // {provide: AuthServiceConfig, useFactory: provideConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
