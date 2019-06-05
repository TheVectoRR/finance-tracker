import { LinearMortgageRoutes } from './linear-mortgage/linear-mortgage.routes';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'linear-mortgage',
        pathMatch: 'full'
      },
      ...LinearMortgageRoutes
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
