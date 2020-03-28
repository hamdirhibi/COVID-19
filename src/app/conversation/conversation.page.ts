import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ConversationService} from '../conversation.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
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
    { text: "Hello there!😊", type: 'received' },
    { text: "Welcome to CovidAssist", type: 'received' },
    { text: "I'm here to help you, ask me what you want about COVID-19!", type:"received"},

    
  ];

  questions = [
    'I am pregnant, should I be extra worried?' ,
    'I think I have the new corona virus. What should I do?',
    'What can I do to prevent the new coronavirus from spreading?',
    'Why am I not allowed to shake hands anymore?',
    
  ]

  container: HTMLElement;          
  constructor(
    private conversationService:ConversationService
    )
     { }

  ngOnInit() {
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
    this.message = message;
    this.send(); 
  }

  
}
