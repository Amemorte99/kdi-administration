import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienRoutingModule } from './bien-routing.module';
import { BienComponent } from './bien.component';
import { ListeComponent } from './components/liste/liste.component';
import { DetailComponent } from './components/detail/detail.component';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [BienComponent, ListeComponent, DetailComponent],
  imports: [
    CommonModule,
    BienRoutingModule,
    LayoutsModule,
    FormsModule,
    NgSelectModule,
  ],
})
export class BienModule {}
