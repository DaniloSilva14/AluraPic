import { CardComponent } from './card.component';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CardComponent],
  exports: [CardComponent],
  imports: [CommonModule]
})

export class CardModule{}
