import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainViewComponent} from './main-view/main-view.component';
import {MapViewComponent} from './map-view/map-view.component';

const routes: Routes = [
  {
    path: '', component: MainViewComponent, canActivate: [],
    children: [
      {
        path: '',
        component: MapViewComponent,
        outlet: 'container'
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
