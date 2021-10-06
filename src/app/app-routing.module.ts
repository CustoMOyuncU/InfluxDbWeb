import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { TemperatureAddComponent } from './components/tempareture-add/temperature-add.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:MainComponent},
  {path:"admin/add/temperature-property",component:TemperatureAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
