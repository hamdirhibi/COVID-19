import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';


const API_URL = environment.apiChat;


@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private httpClient: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getMessage(message){
    return this.httpClient.get<any>(`${API_URL}en/${message}` , this.httpOptions);
  }

}
