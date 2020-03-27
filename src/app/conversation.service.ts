import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { TranslateService } from '@ngx-translate/core';

const API_URL = environment.apiChat;


@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  
  lang = 'en';
  constructor(private httpClient: HttpClient, private translate : TranslateService) { 
   this.lang = this.translate.getBrowserLang();
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
