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
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/navbar/home/home.component';
import { MenuComponent } from './components/navbar/menu/menu.component';
import { UserComponent } from './components/navbar/user/user.component';
import { DirComponent } from './components/navbar/dir/dir.component';
import { RegComponent } from './components/navbar/reg/reg.component';
import { HeroformComponent } from './components/inicio/heroform/heroform.component';
import { CrearEventoComponent } from './components/pasarela/crear-evento/crear-evento.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FooterComponent } from './components/footer/footer.component';
import { CotizacionComponent } from './components/inicio/cotizacion/cotizacion.component';
import { LoginUserComponent } from './components/login-user/login-user.component';

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
    LoginUserComponent
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
