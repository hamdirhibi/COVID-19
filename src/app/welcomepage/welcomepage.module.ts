import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { WelcomepagePage } from './welcomepage.page';
import 'gl-ionic-background-video';
import { TranslateModule } from '@ngx-translate/core';
const routes: Routes = [
  {
    path: '',
    component: WelcomepagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(), 

    RouterModule.forChild(routes)
  ],
  declarations: [WelcomepagePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // here is the schema declaration to add
})
export class WelcomepagePageModule {}
