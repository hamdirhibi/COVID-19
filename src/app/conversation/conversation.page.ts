import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ConversationService} from '../conversation.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
  @ViewChild('scrollframe') myScrollContainer: ElementRef;
   scrollContainer: any;
   contactInfo: any = {
    name: 'Amal',
    status: 'ONLINE'
  }
  message : String =""; 
  showOptions: boolean = false;
  messages: Array<any> = [
  ];
  message1; 
  message2;


  questions = [
    '1' ,
    '2',
    '3',
    '4'
  ] ;

  container: HTMLElement;          
  constructor(
    private conversationService:ConversationService,
    private translate: TranslateService

    )
     { }

  ngOnInit() { 
      
      this.message1 = {text: this.translate.instant("CONVERSATION.HELLO"),  type: 'received'};
      this.message2 = {text:this.translate.instant("CONVERSATION.SEC"), type:'received' };
      this.messages.push(this.message1);
      this.messages.push(this.message2);      
    }

  
    // this.scrollContainer = this.scrollFrame.nativeElement;  
  //  this.scrollToBottom() ; 
  
  showOptionsToggle(value?: boolean) {
    if (value !== undefined) {
      this.showOptions = value;
      return;
    }
    this.showOptions = !this.showOptions;
  }
  send(){
    if (this.message.length>0)
    this.messages.push(
       {
          text: this.message, type: 'send', created: new Date().toDateString() 
       });
         const messageToSend = this.message; 
        this.message="";
         
       //window.scrollTo(0,this.scrollContainer.scrollHeight);
      this.conversationService
      .getMessage(messageToSend)
      .subscribe(data => { 
         this.messages.push({
          text: data.response , type:'received' 
         
        }) ;
        
         
       });
         
  }

  /*private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      bottom : 0 , 
      behavior: 'smooth'
    });
  }*/

  sendSug(message){
    this.showOptions=false;

    this.message = this.translate.instant("CONVERSATION."+message);
    this.send(); 
  }

  
}
