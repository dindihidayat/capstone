import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CountdownModule } from 'ngx-countdown';
import { CountdownTimerModule } from 'ngx-countdown-timer';
import { FormsModule } from '@angular/forms';
import { SockService } from 'src/app/api/Sock.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { firebaseConfig, setting } from '../../../const/setting';
import { AngularFirestoreModule } from '@angular/fire/firestore';
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CountdownModule,
    FormsModule,
    CountdownTimerModule,
    CountdownTimerModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFirestoreModule.enablePersistence(),
  ],
  providers:[SockService,AngularFirestoreModule]
})
export class HomeModule { }
