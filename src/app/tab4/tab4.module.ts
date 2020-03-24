import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { Tab4page } from './tab4.page';
import { NewsService } from '../news.service';
const routes: Routes = [
  {
    path: '',
    component: Tab4page
  },
  
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: Tab4page }])
  ],
  declarations: [Tab4page],
  providers : [NewsService]
})
export class Tab4PageModule {}
