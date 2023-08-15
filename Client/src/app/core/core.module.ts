import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './navigation/navigation.component';
import { MaterialModule } from '../shared/material/material.module';
import { LayoutComponent } from './layout/layout.component';




@NgModule({
  declarations: [
    NavigationComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
  ],
  exports:[
    NavigationComponent,
    LayoutComponent
  ]
})
export class CoreModule { }
