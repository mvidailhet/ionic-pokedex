import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [PaginationComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [PaginationComponent],
})
export class ComponentsModule { }
