import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ConversationService} from '../conversation.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})


export class ConversationPage implements OnInit {
  json ; 
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
     { 

     }
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

  similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - this.editDistance(longer, shorter)) / parseFloat(longerLength);
  }



  editDistance(s1, s2) : number {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
  
    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return
  }

}
