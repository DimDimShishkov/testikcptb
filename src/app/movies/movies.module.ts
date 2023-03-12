import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CardComponent } from './components/card/card.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
    imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatDialogModule, MatButtonModule, FormsModule],
    declarations: [CatalogComponent, CardComponent, ModalComponent],
})
export class MoviesModule {}
