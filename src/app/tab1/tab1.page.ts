import { Component, OnInit } from '@angular/core';
import { NavController, Platform, Events } from '@ionic/angular';
import { LanguageService } from '../services/language.service';
import { ModalController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Tab4PageModule } from '../tab4/tab4.module';
import { Tab4page } from '../tab4/tab4.page';

class Port {
  public id: string;
  public name: string;
  public src : string ; 
}
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page  implements OnInit{
  port: Port;
  ports: Port[];

    lang ='' ; 
    ngOnInit() {
      this.lang = this.languageService.selected; 
      console.log(this.lang);
      this.ports = [
        { id: 'en', name: 'English' , src : '../../assets/img/en.jpg'},
        { id: 'fr', name: 'Français',src : '../../assets/img/fr.png' },
        { id: 'ar', name: 'العربية' ,src : '../../assets/img/uae.png'}
      ];
  
      if (this.lang=='en')
        this.port = this.ports[0] ;
      else if (this.lang =='fr')
      this.port = this.ports[1] ;
      else 
      this.port = this.ports[2] ;
      
       
    }

  constructor(
    private events: Events,
    private ModalController : ModalController,
    private navCtrl: NavController,
    private languageService : LanguageService  , 
  ) {
  }
  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.languageService.setLanguage(this.port.id);
    
    console.log('port:', event.value);
    this.events.publish('togglenews'); 
  }
  
  public showConversationPage ()
  {
    this.navCtrl.navigateForward('conversation')
  }

}
