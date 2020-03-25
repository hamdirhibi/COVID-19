import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
  @ViewChild('scrollframe') scrollFrame: ElementRef;
  private scrollContainer: any;
    private contactInfo: any = {
    name: 'Amal',
    status: 'ONLINE'
  }
  message : String =""; 
  private showOptions: boolean = false;
  private messages: Array<any> = [
    { text: "Hey what's up?", type: 'received', created: '14:02' },
    { text: "Nothing", type: 'send', created: '14:05' },
    { text: "Want to go to the movies?", type: 'send', created: '14:05' },
    { text: "I'm sorry, I can't", type: 'received', created: '14:15' },
    { text: "but can we go tomorrow?", type: 'received', created: '14:16' },
    { text: "Nothing", type: 'send', created: '14:05' },
    { text: "Nothing", type: 'send', created: '14:05' },
    { text: "Nothing", type: 'send', created: '14:05' },
    { text: "Nothing", type: 'send', created: '14:05' },
    { text: "Nothing", type: 'send', created: '14:05' },
    { text: "Nothing", type: 'send', created: '14:05' },
    { text: "Nothing", type: 'send', created: '14:05' },
    { text: "Nothing", type: 'send', created: '14:05' },
    { text: "Nothing", type: 'send', created: '14:05' },
    { text: "Nothing", type: 'send', created: '14:05' },
    { text: "Nothing", type: 'send', created: '14:05' },
    { text: "Nothing", type: 'send', created: '14:05' },

    { text: "I'm sorry, I can't", type: 'received', created: '14:15' },
    { text: "but can we go tomorrow?", type: 'received', created: '14:16' },
  ];

  container: HTMLElement;          
  constructor() { }

  ngOnInit() {
      this.ngAfterViewInit();
  }
  ngAfterViewInit() {

      this.container = document.getElementById("scrollframe");           
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

    this.message ="";
    //window.scrollTo(0,this.scrollContainer.scrollHeight);
        this.ngAfterViewInit();
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
