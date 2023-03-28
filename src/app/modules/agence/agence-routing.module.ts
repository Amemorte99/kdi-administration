import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgenceComponent } from './agence.component';
import { DetailComponent } from './components/detail/detail.component';
import { ListeComponent } from './components/liste/liste.component';

const routes: Routes = [
  {
    path: '',
    component: AgenceComponent,
    children: [
      {
        path: 'liste',
        component: ListeComponent
      },
      {
        path: 'detail/:id',
        component: DetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgenceRoutingModule { }
