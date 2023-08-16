import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '../shared';




@NgModule({
  declarations: [
    NavigationComponent,
    LayoutComponent
  ],
  imports: [
    SharedModule
  ],
  exports:[
    NavigationComponent,
    LayoutComponent
  ]
})
export class CoreModule { }
