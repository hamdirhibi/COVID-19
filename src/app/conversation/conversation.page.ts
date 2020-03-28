import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ConversationService} from '../conversation.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})


export class ConversationPage implements OnInit {
  @ViewChild('scrollframe') scrollFrame: ElementRef;
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

  container: HTMLElement;          
  constructor(
    private conversationService:ConversationService
    )
     { }

  ngOnInit() {
      this.ngAfterViewInit();
  }
  ngAfterViewInit() {

      this.container = document.getElementById("scrollframe") as HTMLElement ;           
      this.container.scrollTop = this.container.scrollHeight;     

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
       this.ngAfterViewInit();
        const messageToSend = this.message; 
        this.message="";
         
       //window.scrollTo(0,this.scrollContainer.scrollHeight);
      this.ngAfterViewInit();
      this.conversationService
      .getMessage(messageToSend)
      .subscribe(data => { 
         this.messages.push({
          text: data.response , type:'received' 
        })     
       })
       this.ngAfterViewInit() ; 
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      bottom : 0 , 
      behavior: 'smooth'
    });
  }
}
