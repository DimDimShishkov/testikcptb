import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CatalogComponent } from './movies/pages/catalog/catalog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([{ path: '', component: CatalogComponent }]),
  ],
})
export class AppRoutingModule {}
