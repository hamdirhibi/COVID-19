import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { TranslateModule } from '@ngx-translate/core';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    IonicSelectableModule, 
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
    TranslateModule.forChild(), 

  ],
  declarations: [Tab1Page],
 // entryComponents: [ModalPage],

})
export class Tab1PageModule {}
