import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RateComponent } from './rate/rate.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
},
{
  path: 'rate/:id',
  component: RateComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
