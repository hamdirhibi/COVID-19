import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ConversationService} from '../conversation.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';



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

  sim : number[] ; 
  res : String[];
  json : String ; 
  message : String =""; 
  showOptions: boolean = false;
  questions ; 
  dt : any = [
    { id : 1  , question :'What is COVID-19' , response : 'COVID-19 is the infectious disease caused by the most recently discovered coronavirus. This new virus and disease were unknown before the outbreak began in Wuhan, China, in December 2019. '},
    { id : 2  , question :'What are the symptoms of COVID-19 ' , response :"The most common symptoms of COVID-19 are fever, tiredness, and dry cough. Some patients may have aches and pains, nasal congestion, runny nose, sore throat or diarrhea. These symptoms are usually mild and begin gradually. Some people become infected but don’t develop any symptoms and don't feel unwell. Most people (about 80%) recover from the disease without needing special treatment. Around 1 out of every 6 people who gets COVID-19 becomes seriously ill and develops difficulty breathing. Older people, and those with underlying medical problems like high blood pressure, heart problems or diabetes, are more likely to develop serious illness. People with fever, cough and difficulty breathing should seek medical attention."},
    { id : 3  , question :'What is a coronavirus ' , response :"Coronaviruses are a large family of viruses which may cause illness in animals or humans.  In humans, several coronaviruses are known to cause respiratory infections ranging from the common cold to more severe diseases such as Middle East Respiratory Syndrome (MERS) and Severe Acute Respiratory Syndrome (SARS). The most recently discovered coronavirus causes coronavirus disease COVID-19. "},
    { id : 4 , question :'What can i do to protect my self  ' , response : "Stay aware of the latest information on the COVID-19 outbreak, available on the WHO website and through your national and local public health authority. Many countries around the world have seen cases of COVID-19 and several have seen outbreaks. Authorities in China and some other countries have succeeded in slowing or stopping their outbreaks. However, the situation is unpredictable so check regularly for the latest news.   You can reduce your chances of being infected or spreading COVID-19 by taking some simple precautions:. "},
    { id : 5  , question :'should i worry about COVID-19' , response : "Illness due to COVID-19 infection is generally mild, especially for children and young adults. However, it can cause serious illness: about 1 in every 5 people who catch it need hospital care. It is therefore quite normal for people to worry about how the COVID-19 outbreak will affect them and their loved ones. \n We can channel our concerns into actions to protect ourselves, our loved ones and our communities. First and foremost among these actions is regular and thorough hand-washing and good respiratory hygiene. Secondly, keep informed and follow the advice of the local health authorities including any restrictions put in place on travel, movement and gatherings. \n   Learn more about how to protect yourself at https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"} 
    // ,{ id : 6  , question :'Who ai at risk of developing severe illness ' , response : 'While we are still learning about how COVID-2019 affects people, older persons and persons with pre-existing medical conditions (such as high blood pressure, heart disease, lung disease, cancer or diabetes)  appear to develop serious illness more often than others. '},
    // ,{ id : 7  , question :'The following measures ARE NOT effective against COVID-2019 and can be harmful: 1 Smoking 2 Wearing multiple masks 3     Taking antibiotics (See question 10 "Are there any medicines of therapies that can prevent or cure COVID-19?") 4  In any case, if you have fever, cough and difficulty breathing seek medical care early to reduce the risk of developing a more severe infection and be sure to share your recent travel history with your health care provider. '},
  ]



  messages: Array<any> = [
    { text: "Hello there!😊", type: 'received' },
    { text: "Welcome to Amal-Assist", type: 'received' },
    { text: "I'm here to help you, ask me what you want about COVID-19!", type:"received"},

  ];

  container: HTMLElement;          
  constructor(
    private http :HttpClient ,
    //  stringSimilarity : String
    private os : Platform, 
    private conversationService:ConversationService
    )
     { 
        this.http.get('../../assets/json/code.json').subscribe(data=>{
          this.json = data['conversations'] ; 
          this.res =   (this.json).toString().split("\n-"); 
       //   console.log(this.res);       
        })
     }

  ngOnInit() {
      this.os.ready().then(()=>{
        this.ngAfterViewInit();
       // this.importdata()
       this.questions = this.dt ; 
      })
  
    }

  ngAfterViewInit() {

      this.container = document.getElementById("scrollframe") as HTMLElement ;           
      this.container.scrollTop = this.container.scrollHeight;     

    } 
  
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
       this.messages.push({
        text: this.getbestsimilarity(messageToSend) , type:'received' 
      })     

       
      this.ngAfterViewInit();
      /*this.conversationService
      .getMessage(messageToSend)
      .subscribe(data => { 
         this.messages.push({
          text: data.response , type:'received' 
        })     
       })

       */
      
       this.ngAfterViewInit() ; 
  }

  getbestsimilarity(message){
    var priorityQueue =new PriorityQueue(); 
    this.res.forEach(element =>{
      priorityQueue.enqueue(element, this.StringSimilarity(element, message)) ; 
    })
    let response =  priorityQueue.front().element; 
    console.log(priorityQueue.front().priority)
    if (response == "- Good morning, how are you?"&& priorityQueue.front().priority==0)
      return "im here for you ! please chose one of the questions if you need a help" ; 
    return response ; 
  }



  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      bottom : 0 , 
      behavior: 'smooth'
    });
  }

  sendSug(q,a){
    
    this.messages.push(
      {
          text: q, type: 'send', created: new Date().toDateString() 
      });
      this.messages.push(
        {
            text: a, type: 'received', created: new Date().toDateString() 
          });  
       this.showOptionsToggle(); 
      }



    StringSimilarity (s1, s2) {
    var m = 0;

    // Exit early if either are empty.
    if ( s1.length === 0 || s2.length === 0 ) {
        return 0;
    }

    // Exit early if they're an exact match.
    if ( s1 === s2 ) {
        return 1;
    }

    var range     = (Math.floor(Math.max(s1.length, s2.length) / 2)) - 1,
        s1Matches = new Array(s1.length),
        s2Matches = new Array(s2.length);

    for ( let i = 0; i < s1.length; i++ ) {
        var low  = (i >= range) ? i - range : 0,
            high = (i + range <= s2.length) ? (i + range) : (s2.length - 1);

        for ( let  j = low; j <= high; j++ ) {
        if ( s1Matches[i] !== true && s2Matches[j] !== true && s1[i] === s2[j] ) {
            ++m;
            s1Matches[i] = s2Matches[j] = true;
            break;
        }
        }
    }

    // Exit early if no matches were found.
    if ( m === 0 ) {
        return 0;
    }

    // Count the transpositions.
    let  k = 0 ; let  n_trans = 0;

    for (let  i = 0; i < s1.length; i++ ) {
      let  j = k  
      if ( s1Matches[i] === true ) {

        for (; j < s2.length; j++ ) {
            if ( s2Matches[j] === true ) {
            k = j + 1;
            break;
            }
        }

        if ( s1[i] !== s2[j] ) {
            ++n_trans;
        }
        }
    }

    var weight = (m / s1.length + m / s2.length + (m - (n_trans / 2)) / m) / 3,
        l      = 0,
        p      = 0.1;

    if ( weight > 0.7 ) {
        while ( s1[l] === s2[l] && l < 4 ) {
        ++l;
        }

        weight = weight + l * p * (1 - weight);
    }

    return weight;
}




}





export class PriorityQueue {
  items: any[]; 
  
  // An array is used to implement priority 
  constructor() 
  { 
      this.items = []; 
  } 

  // functions to be implemented 
  // enqueue(item, priority) 
  // dequeue() 
  // front() 
  // isEmpty() 
  // printPQueue() 


// enqueue function to add element 
// to the queue as per priority 
enqueue(element, priority) 
{ 
  // creating object from queue element 
  var qElement = new QElement(element, priority); 
  var contain = false; 

  // iterating through the entire 
  // item array to add element at the 
  // correct location of the Queue 
  for (var i = 0; i < this.items.length; i++) { 
      if (this.items[i].priority <= qElement.priority) { 
          // Once the correct location is found it is 
          // enqueued 
          this.items.splice(i, 0, qElement); 
          contain = true; 
          break; 
      } 
  } 

  // if the element have the highest priority 
  // it is added at the end of the queue 
  if (!contain) { 
      this.items.push(qElement); 
  } 
} 



// front function 
front() 
{ 
  // returns the highest priority element 
  // in the Priority queue without removing it. 
  if (this.isEmpty()) 
      return "No elements in Queue"; 
  return this.items[0]; 
} 

// isEmpty function 
isEmpty() 
{ 
  // return true if the queue is empty. 
  return this.items.length == 0; 
} 



// printQueue function 
// prints all the element of the queue 
printPQueue() 
{ 
  var str = ""; 
  for (var i = 0; i < this.items.length; i++) 
      str += this.items[i].element + " "; 
  return str; 
} 



} 


export class QElement {
  element: any; 
  priority: any;
  constructor(element, priority) 
  { 
      this.element = element; 
      this.priority = priority; 
  } 
} 
