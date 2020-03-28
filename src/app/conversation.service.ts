import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './services/language.service';

//const API_URL = environment.apiChat;
const  API_URL ='http://51.79.27.231:5000/ask/api/v1.0/' ;


@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  
  lang = 'en';
  constructor(private httpClient: HttpClient,  private languageService : LanguageService) { 
   this.lang = this.languageService.selected;
   console.log("language = " +this.lang);
   if(this.lang !== 'ar') this.lang = 'en';
  }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getMessage(message){
    return this.httpClient.get<any>(`${API_URL}${this.lang}/${message}` , this.httpOptions);
  }
}
