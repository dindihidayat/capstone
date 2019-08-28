import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from 'src/app/auth/auth.guard';

const routes : Routes = [
  {
    path:"",
    component:LayoutComponent,
    children:[
      {
        path:"",
        redirectTo:"topik"
      },
      {
        path:"home",
        loadChildren:"../content/home/home.module#HomeModule",
        canActivate:[AuthGuard]
      },
      {
        path:"dataskripsi",
        loadChildren:"../content/skripsi/skripsi.module#SkripsiModule",
        canActivate:[AuthGuard]
      },
      {
        path:"topik",
        loadChildren:"../content/topik/topik.module#TopikModule",
        canActivate:[AuthGuard]
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class LayoutRoutingModule { }
