import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffreurRoutingModule } from './offreur-routing.module';
import { OffreurComponent } from './offreur.component';
import { ListComponent } from './components/list/list.component';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OffreurComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    OffreurRoutingModule,
    LayoutsModule,
    SharedModule
  ]
})
export class OffreurModule { }
