import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkripsiComponent } from './skripsi.component';
import { SkripsiRoutingModule } from './skripsi-routing.module';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from 'src/app/const/setting';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [SkripsiComponent],
  imports: [
    CommonModule,
    SkripsiRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFirestoreModule.enablePersistence(),
    NgbModule
  ]
})
export class SkripsiModule { }
