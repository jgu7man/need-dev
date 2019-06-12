import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from "@angular/platform-browser";


// LOG IN SOCIAL NETWORKS
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider  } from "ng4-social-login";

const config = new AuthServiceConfig([
{
  id: GoogleLoginProvider.PROVIDER_ID,
  provider: new GoogleLoginProvider('629795126309-6al0vlu4tanpmkb58tcve7ogbd1mqbe7.apps.googleusercontent.com'),
},
{
  id: FacebookLoginProvider.PROVIDER_ID,
  provider: new FacebookLoginProvider('349861319049977')
}
], false);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule,
    SocialLoginModule
  ],
  providers: [
    {provide: AuthServiceConfig, useFactory: provideConfig}
  ]
})
export class LoginModule { }
