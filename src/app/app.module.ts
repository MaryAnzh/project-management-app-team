import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { ProjectManagementModule } from './project-management/project-management.module';
import { InformationModule } from './information/information.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,
    ProjectManagementModule,
    InformationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
