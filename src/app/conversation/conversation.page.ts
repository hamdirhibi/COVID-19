import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ConversationService} from '../conversation.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Platform, Events } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from '../services/language.service';



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
  showOptions: boolean = true;
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
  dt_fr : any = [
    { id : 1  , question :"Qu'est-ce que COVID-19" , response : "COVID-19 est la maladie infectieuse causée par le coronavirus le plus récemment découvert. Ce nouveau virus et cette nouvelle maladie étaient inconnus avant le début de l'épidémie à Wuhan, en Chine, en décembre 2019."},
    { id : 2  , question :'Quels sont les symptômes de COVID-19 ' , response :"Les symptômes les plus courants de COVID-19 sont la fièvre, la fatigue et la toux sèche. Certains patients peuvent souffrir de maux et de douleurs, de congestion nasale, d'écoulement nasal, de maux de gorge ou de diarrhée. Ces symptômes sont généralement légers et commencent progressivement. Certaines personnes sont infectées mais ne développent aucun symptôme et ne se sentent pas mal. La plupart des gens (environ 80%) se remettent de la maladie sans avoir besoin d'un traitement spécial. Environ 1 personne sur 6 qui reçoit COVID-19 tombe gravement malade et éprouve des difficultés à respirer. Les personnes âgées et celles qui ont des problèmes médicaux sous-jacents comme l'hypertension artérielle, des problèmes cardiaques ou le diabète sont plus susceptibles de développer une maladie grave. Les personnes souffrant de fièvre, de toux et de difficultés respiratoires doivent consulter un médecin."},
    { id : 3  , question :"Qu'est-ce qu'un coronavirus" , response :"Les coronavirus sont une grande famille de virus qui peuvent provoquer des maladies chez les animaux ou les humains. Chez l'homme, plusieurs coronavirus sont connus pour provoquer des infections respiratoires allant du rhume à des maladies plus graves telles que le syndrome respiratoire du Moyen-Orient (MERS) et le syndrome respiratoire aigu sévère (SRAS). Le coronavirus le plus récemment découvert provoque la maladie à coronavirus COVID-19. "},
    { id : 4 , question :"Que puis-je faire pour me protéger", response : "Restez au courant des dernières informations sur l'épidémie de COVID-19, disponibles sur le site Web de l'OMS et par le biais de votre autorité nationale et locale de santé publique. De nombreux pays à travers le monde ont vu des cas de COVID-19 et plusieurs ont vu des flambées. Les autorités chinoises et certains autres pays ont réussi à ralentir ou à arrêter leurs flambées. Cependant, la situation est imprévisible, alors vérifiez régulièrement les dernières nouvelles. Vous pouvez réduire vos risques d'être infecté ou de propager COVID-19 en prenant quelques précautions simples"},
    { id : 5  , question :"dois-je m'inquiéter pour COVID-19" , response : "La maladie due à l'infection par COVID-19 est généralement bénigne, en particulier pour les enfants et les jeunes adultes. Cependant, il peut provoquer une maladie grave: environ 1 personne sur 5 qui l'attrape a besoin de soins hospitaliers. Il est donc tout à fait normal que les gens s'inquiètent de la façon dont l'épidémie de COVID-19 les affectera, eux et leurs proches. \ n Nous pouvons canaliser nos préoccupations en actions pour nous protéger, protéger nos proches et nos communautés. Au premier rang de ces actions figure le lavage régulier et minutieux des mains et une bonne hygiène respiratoire. Deuxièmement, restez informé et suivez les conseils des autorités sanitaires locales, y compris toute restriction mise en place sur les voyages, les déplacements et les rassemblements. \ n En savoir plus sur la façon de vous protéger sur https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"} 
    // ,{ id : 6  , question :'Who ai at risk of developing severe illness ' , response : 'While we are still learning about how COVID-2019 affects people, older persons and persons with pre-existing medical conditions (such as high blood pressure, heart disease, lung disease, cancer or diabetes)  appear to develop serious illness more often than others. '},
    // ,{ id : 7  , question :'The following measures ARE NOT effective against COVID-2019 and can be harmful: 1 Smoking 2 Wearing multiple masks 3     Taking antibiotics (See question 10 "Are there any medicines of therapies that can prevent or cure COVID-19?") 4  In any case, if you have fever, cough and difficulty breathing seek medical care early to reduce the risk of developing a more severe infection and be sure to share your recent travel history with your health care provider. '},
  ]


  dt_ar: any = [
    {id: 1, question: ' COVID-19 ما هي' ,  response: "COVID-19 هو المرض المعدي الذي يسببه أحدث فيروسات التاجية المكتشفة. كان هذا الفيروس والمرض الجديدان غير معروفين قبل بدء تفشي المرض في ووهان ، الصين ، في ديسمبر 2019. "}
    ,{id:2, question: " COVID-19 ما هي أعراض" , response: "أكثر أعراض COVID-19 شيوعًا هي الحمى والتعب والسعال الجاف. قد يعاني بعض المرضى من آلام وآلام واحتقان بالأنف وسيلان الأنف أو التهاب الحلق أو الإسهال. هذه الأعراض عادة ما تكون خفيفة وتبدأ تدريجياً. يصاب بعض الأشخاص بالعدوى ولكن لا تظهر عليهم أي أعراض ولا يشعرون بتوعك. يتعافى معظم الأشخاص (حوالي 80٪) من المرض دون الحاجة إلى علاج خاص. يصاب حوالي 1 من كل 6 أشخاص مصابين بـ COVID-19 بمرض خطير ويواجه صعوبة في التنفس. كبار السن وأولئك الذين يعانون من مشاكل طبية كامنة مثل ارتفاع ضغط الدم أو مشاكل في القلب أو السكري ، هم أكثر عرضة للإصابة بمرض خطير. والسعال وصعوبة التنفس يجب أن تطلب العناية الطبية. "},
    {id: 3, question:"coronavirus  ما هي  ", response: "الفيروسات التاجية هي مجموعة كبيرة من الفيروسات التي قد تسبب المرض في الحيوانات أو البشر. وفي البشر ، من المعروف أن العديد من الفيروسات التاجية تسبب التهابات في الجهاز التنفسي تتراوح من نزلات البرد إلى أمراض أكثر خطورة مثل متلازمة الشرق الأوسط التنفسية (MERS) ومتلازمة الجهاز التنفسي الحادة الوخيمة (SARS). أحدث فيروسات التاجية المكتشفة تسبب مرض فيروسات التاجية COVID-19. "},
    {id: 4, question: 'ماذا يمكنني أن أفعل لنفسي' , response: "ابق على علم بآخر المعلومات حول تفشي COVID-19 ، والمتوفرة على موقع منظمة الصحة العالمية على الإنترنت ومن خلال هيئة الصحة العامة الوطنية والمحلية. وشهدت دول حول العالم حالات إصابة بـ COVID-19 ، وشهدت العديد من حالات تفشي المرض. وقد نجحت السلطات في الصين وبعض الدول الأخرى في إبطاء أو وقف تفشيها. ومع ذلك ، لا يمكن التنبؤ بالوضع لذا تحقق بانتظام من آخر الأخبار. احتمالات الإصابة بالعدوى أو نشر COVID-19 عن طريق اتخاذ بعض الاحتياطات البسيطة:"},
    {id: 5, question: 'COVID-19  هل يجب أن أقلق بشأن ' ,  الرد: "المرض الناتج عن عدو, COVID-19 معتدل بشكل عام ، خاصة للأطفال والشباب. ومع ذلك ، يمكن أن يسبب مرضًا خطيرًا: حوالي 1 في كل يحتاج 5 أشخاص ممن يصابون به إلى رعاية في المستشفى ، لذلك من الطبيعي جدًا أن يقلق الناس بشأن كيفية تأثير تفشي COVID-19 عليهم وعلى أحبائهم. \ N يمكننا توجيه مخاوفنا إلى إجراءات لحماية أنفسنا وأحبائنا و أولاً وقبل كل شيء ، من هذه الإجراءات غسل اليدين بشكل منتظم وشامل والنظافة التنفسية الجيدة. ثانيًا ، ابق على اطلاع واتبع نصائح السلطات الصحية المحلية بما في ذلك أي قيود مفروضة على السفر والتنقل والتجمعات. \ n تعلم المزيد عن كيفية حماية نفسك على https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public "},
    //، {id: 6، question: 'Who ai in خطر الإصابة بمرض شديد "، الرد:" بينما ما زلنا نتعلم كيف يؤثر COVID-2019 على الأشخاص وكبار السن والأشخاص الذين يعانون من حالات طبية موجودة مسبقًا (مثل ارتفاع ضغط الدم أو أمراض القلب أو أمراض الرئة أو السرطان أو مرض السكري) تظهر عليهم الإصابة بمرض خطير أكثر من غيرهم. '} ،
    //، {id: 7، question: 'التدابير التالية ليست فعالة ضد COVID-2019 ويمكن أن تكون ضارة: 1 التدخين 2 ارتداء أقنعة متعددة 3 تناول المضادات الحيوية (انظر السؤال 10 "هل هناك أي أدوية للعلاجات التي يمكن أن تمنع أو شفاء COVID-19؟ ") 4 على أي حال ، إذا كنت تعاني من الحمى والسعال وصعوبة التنفس ، فاطلب الرعاية الطبية مبكرًا لتقليل خطر الإصابة بعدوى أكثر حدة وتأكد من مشاركة سجل سفرك الأخير مع مقدم الرعاية الصحية الخاص بك. '} ،
  ]


  


  messages : Array<any> ; 
  messages_en: Array<any> = [
    { text: "Hello there!😊", type: 'received' },
    { text: "Welcome to Amal-Assist", type: 'received' },
    { text: "I'm here to help you, ask me what you want about COVID-19!", type:"received"},

  ];
  messages_ar: Array<any> = [
    { text: "😊 مرحبًا بكم!", type: 'received' },
    { text: "Covid-Assist مرحبًا بك في ", type: 'received' },
    { text: " COVID-19! أنا هنا لمساعدتك ، اسألني ماذا تريد عن ", type:"received"},

  ];

  messages_fr: Array<any> = [
    { text: "Bonjour!😊", type: 'received' },
    { text: "Bienvenue chez Covid-Assist", type: 'received' },
    { text: "Je suis là pour vous aider, demandez-moi ce que vous voulez à propos de COVID-19!", type:"received"},

  ];

  lang  :String =  '' ; 
  container: HTMLElement;          
  constructor(
    private http :HttpClient ,
    //  stringSimilarity : String
    private os : Platform, 
    private conversationService:ConversationService,
    private language  : LanguageService,
    private events: Events
    )
     { 
        this.http.get('../../assets/json/code.json').subscribe(data=>{
          this.json = data['conversations'] ; 
          this.res =   (this.json).toString().split("\n-"); 
       //   console.log(this.res);       
        })

        events.subscribe('togglelang', () => {
          console.log("events received ") ; 
          this.messages = null  ; 
          this.load() ; 
        });
  
     }

  ngOnInit() {
    this.load() ;
      
    }
    load(){
      this.os.ready().then(()=>{
        this.ngAfterViewInit();
       // this.importdata()
       this.lang = this.language.selected; 
       if (this.lang=='fr')
      { this.questions = this.dt_fr ; this.messages = this.messages_fr ; } 
       else if (this.lang=='ar')
       { this.questions = this.dt_ar ; this.messages = this.messages_ar ; } 
      else 
      { this.questions = this.dt ; this.messages = this.messages_en ; } 

      
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
