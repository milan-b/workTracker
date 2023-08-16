import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], 
  exports: [
    CommonModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class SharedModule { }
