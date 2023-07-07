import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DotsPaginationComponent } from './dots-pagination/dots-pagination.component';
import { ScrollPaginationComponent } from './scroll-pagination/scroll-pagination.component';


@NgModule({
  declarations: [DotsPaginationComponent, ScrollPaginationComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [DotsPaginationComponent, ScrollPaginationComponent],
})
export class ComponentsModule { }
