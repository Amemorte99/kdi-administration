import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienComponent } from './bien.component';
import { ListeComponent } from './components/liste/liste.component';
import { DetailComponent } from './components/detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: BienComponent,
    children: [
      {
        path: 'liste',
        component: ListeComponent,
      },
      {
        path: 'detail/:id',
        component: DetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BienRoutingModule { }
