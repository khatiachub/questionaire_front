import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataserviceService } from '../../core/dataservice.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit {
  editForm:boolean=false;
  questionForm:FormGroup;
  editQuestionForm:FormGroup;
  usersArray:any=[]
  questions:any=[]
  constructor(private fb: FormBuilder,private dataService: DataserviceService) {
    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
      required:[false as boolean|number, [Validators.required]],
    });
    this.editQuestionForm = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
      required: [false as boolean|number, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.dataService.getQuestions().subscribe({
      next: (response) => {
        console.log(response); 
        this.questions=response;
      },
      error: (error) => {
        console.log(error);   
      },
    });
    this.dataService.getUsers().subscribe({
      next: (response) => {
        this.usersArray= [...new Map(response.map((user: { fullName: any; })=> [user.fullName, user])).values()];

        console.log(this.usersArray); 
      },
      error: (error) => {
        console.log(error);   
      },
    });
  }


  addQuestion():void{
  console.log(this.questionForm.value);
  if(this.questionForm.value.required===true){
    this.questionForm.value.required=1
  }else{
    this.questionForm.value.required=0
  }
  this.questions.push({...this.questionForm.value});
  console.log(this.questions);
  
    this.dataService.addQuestion(this.questionForm.value).subscribe({
      next: (response) => {
        console.log(response); 
        window.location.reload();
      },
      error: (error) => {
        console.log(error);   
      },
    });
  }

  question:any={};
  questionId=0;
  editQuestions(id:number):void{
    this.questionId=id;
    this.editForm=true;
    this.dataService.getQuestion(id).subscribe({
      next: (response) => {
        this.editQuestionForm.patchValue({
          question:response.question,
          required: response.required,
          answer:response.answer
        });
        this.question=response
      },
      error: (error) => {
        console.log(error);   
      },
    });
  }
  setQuestion(value:string):void{
    this.editQuestionForm.value.question=value;
  }
  setAnswer(value:string):void{
    this.editQuestionForm.value.answer=value;

  }
  setRequired(value:boolean|number):void{
    if(value===true){
      value=1
    }else{
      value=0
    }
    
    this.editQuestionForm.value.required=value;
  }

  updateQuestion():void{
    console.log(this.questionForm.value);
    console.log(this.editQuestionForm.value);
    
    this.dataService.UpdateQuestion(this.editQuestionForm.value,this.questionId).subscribe({
      next: (response) => {
        console.log(response); 
        this.editQuestionForm.reset();
        window.location.reload()
      },
      error: (error) => {
        console.log(error);   
      },
    });
  }
}
