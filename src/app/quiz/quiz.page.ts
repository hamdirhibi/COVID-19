import { Component, OnInit, ApplicationRef } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {

  constructor() { }
  index = 0 ;

  questions = ['Do you Wash your hands frequently?', 
  'Do you often touch your eyes, nose and mouth?' ,
  'Do you cover your mouth and nose with your bent elbow or tissue when you cough or sneeze?',
  'Are you a patient of any Cardiovascular or Chronic respiratory disease, Diabetes, Hypertension or Cancer?',
  'If you find yourself with fever, cough or difficulty in breathing, do you know exactly what to do in the current scenario?'
 
] ;
  responseYes = ['Good, wash your hands frequently' , 
                'Avoid touching eyes, nose and mouth.',
                'Good, make sure you, and the people around you, follow good respiratory hygiene.',
                'Take care, you have a higher chance of complication if infected',
                "Good, if you're symptomatic, seeking medical care is the first thing to do."
];
  responseNo= ['You need to wash your hands more frequently', 
               'Good, avoid touching eyes, nose and mouth.',
               'Practice good respiratory hygiene.',
               'You have considerably lesser chance of complications',
               "Seek urgent medical care if you're symptomatic."
]; 

messages=[
  'Washing your hands frequently, regularly and thoroughly with soap and water or using alcohol-based hand rub kills viruses that may be on your hands.',
  "Hands touch many surfaces and can pick up viruses. Once contaminated, hands can transfer the virus to your eyes, nose or mouth. From there, the virus can enter your body and can make you sick.",
  "Cover your mouth and nose with your bent elbow or tissue when you cough or sneeze, then dispose of the used tissue immediately. Droplets spread virus. By following good respiratory hygiene you can protect the people around you from viruses such as cold, flu and COVID-19.",
  "The risk of fatality from Coronavirus is higher if you have any such pre-existing conditions. Take extra care if you fall into this category. Seek medical attention immediately if you experience the symptoms.",
  "If you have fever, cough and difficulty breathing, seek medical care as soon as possible. Stay home if you feel unwell. If you have a fever, cough and difficulty breathing, seek medical attention and call in advance. Follow the directions of your local health authority.National and local authorities will have the most up to date information on the situation in your area. Calling in advance will allow your health care provider to quickly direct you to the right health facility. This will also protect you and help prevent spread of viruses and other infections."
]

statusYes =[false,false,false,false,false];
statusNo = [false,false,false,false,false];

ngOnInit() {
  this.restart();
}

restart(){
  this.statusYes =[false,false,false,false,false];
  this.statusNo = [false,false,false,false,false];
  this.index=0;

}
  choose(value){
    if(value === 'Yes')
       {   
         this.statusYes[this.index] = true ; 
         this.statusNo[this.index] = false; 
       } else{
         this.statusYes[this.index] = false ; 
         this.statusNo[this.index] = true; 
         
       }

 } 

 next(){
   this.index++;
   alert(this.index);
}


}
