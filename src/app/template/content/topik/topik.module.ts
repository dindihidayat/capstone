import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopikComponent } from './topik.component';
import { TopikRoutingModule } from './topik-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [TopikComponent],
  imports: [
    CommonModule,
    TopikRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ]
})
export class TopikModule { }
