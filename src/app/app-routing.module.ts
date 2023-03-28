import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'admin/offreur',
    loadChildren: () =>
      import('./modules/offreur/offreur.module').then((m) => m.OffreurModule),
  },
  {
    path: 'admin/partenaires',
    loadChildren: () =>
      import('./modules/agence/agence.module').then((m) => m.AgenceModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
