import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategorieComponent } from './components/categorie/categorie.component';
import { LocalityComponent } from './components/locality/locality.component';
import { StatistiqueComponent } from './components/statistique/statistique.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    CategorieComponent,
    LocalityComponent,
    StatistiqueComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LayoutsModule,
    SharedModule
  ]
})
export class DashboardModule { }
