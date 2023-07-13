import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';
import { FooterAdminComponent } from './components/footer-admin/footer-admin.component';
import { ParamAdminComponent } from './components/param-admin/param-admin.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    HeaderAdminComponent,
    MenuAdminComponent,
    FooterAdminComponent,
    ParamAdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule
  ],
  exports: [
    HeaderAdminComponent,
    MenuAdminComponent,
    FooterAdminComponent,
    ParamAdminComponent
  ]
})
export class LayoutsModule { }
