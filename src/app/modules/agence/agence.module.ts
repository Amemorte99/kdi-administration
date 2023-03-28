import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgenceRoutingModule } from './agence-routing.module';
import { AgenceComponent } from './agence.component';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { ListeComponent } from './components/liste/liste.component';
import { DetailComponent } from './components/detail/detail.component';


@NgModule({
  declarations: [
    AgenceComponent,
    ListeComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    AgenceRoutingModule,
    LayoutsModule
  ]
})
export class AgenceModule { }
