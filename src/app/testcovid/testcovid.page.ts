import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-testcovid',
  templateUrl: './testcovid.page.html',
  styleUrls: ['./testcovid.page.scss'],
})
export class TestcovidPage implements OnInit {
  
  message =false;
  
  constructor() {
    
   }
  index = 0;
  score=0;
  
  alert= ""; 
  questions = ['Have you come into close contact with someone who has a laboratory confirmed COVID – 19 diagnosis? ', 
    'Do you have a fever ?' , 
    'In the past few days, do you have a cough or increase in your usual cough?' ,
    'Do you have a sore throat these past few days?' ,
    'In the past 24 hours, have you had diarrhea?' ,
    'Do you have  symptoms of lower respiratory illness such as  shortness of breath or difficulty breathing?'
 ] ; 
   scores = [2 , 2 , 2 , 1 , 1 , 1];  
   statusYes =[false,false,false,false,false,false];
   statusNo = [false,false,false,false,false,false];
  
  ngOnInit() {
    this.restart();
  }

  restart(){
    this.statusYes =[false,false,false,false,false,false];
    this.statusNo = [false,false,false,false,false,false];
    this.score= 0;
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
    if(!this.statusYes[this.index] && !this.statusNo[this.index]){
      this.message=true;
      return ;
    }
  this.index++;
  this.message=false;
   if(this.index === 6) 
  this.calculScore();
    
  }

  calculScore(){
    for(let i=0 ; i < 6;i++ )
    {
      this.score =  this.statusYes[i] ? this.score + this.scores[i]  : 0 ;
    }


  }

  return(){
    this.index--;
  }

}
