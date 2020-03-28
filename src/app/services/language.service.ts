import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Storage  } from '@ionic/storage';
const LNG_KEY = 'SELECTED_LANGUAGE'; 


@Injectable({
  providedIn: 'root'
})
export class LanguageService {
 selected = ''; 

  constructor(private translate : TranslateService , private storage : Storage ) { }
  setInitialApplanguage(){
        let language = this.translate.getBrowserLang(); 
        if(language !== 'ar' && language !== 'fr') language="en";
        this.translate.setDefaultLang(language); 
        this.selected = language ; 

        //console.log(this.selected); 
        this.storage.get(LNG_KEY).then(val =>{
          if (val){
            this.setLanguage(language);
            this.selected=val ;  
          }
         
      })
  
  
      }

      getLanguages (){
          return [
            {
              text : 'English',value :'en'
            },
            {
              text :'French',value :'fr'
            },
            {
              text :'العربية ',value :'ar' 
            }
          ]
      }

      setLanguage(val){
          this.translate.use(val); 
          this.selected = val ; 
          this.storage.set(LNG_KEY,val);
      }


}
