import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { InformationRoutingModule } from './information-routing.module';
import { InformationComponent } from './information.component';
import { TeamInfoComponent } from './components/team-info/team-info.component';


@NgModule({
  declarations: [
    InformationComponent,
    TeamInfoComponent,
  ],
  imports: [
    CommonModule,
    InformationRoutingModule,
    TranslateModule
  ]
})
export class InformationModule { }
