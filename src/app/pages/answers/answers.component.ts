import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataserviceService } from '../../core/dataservice.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrl: './answers.component.css'
})
export class AnswersComponent implements OnInit {

  questions:any=[];
  answersForm!:FormGroup;
  answerObject!:FormGroup;
  constructor(private fb: FormBuilder,private dataService: DataserviceService) {
    this.answersForm = this.fb.group({
      answers: this.fb.array([]) ,
      fullname: ['', Validators.required]          
    });
    this.addQuestionsToForm();
  }
  addQuestionsToForm() {
    const ans = this.questions.map((question: {
      question: any; id: any }) => {
      return this.fb.group({
        answer: ['', Validators.required],      
        question_id: [question.id, Validators.required],
      });
    });
    
    this.answersForm.setControl('answers', this.fb.array(ans));
  }
  get getAnswers(): FormArray {
    return this.answersForm.get('answers') as FormArray;
  }

  ngOnInit(): void {
    this.dataService.getQuestions().subscribe({
      next: (response) => {
        this.questions=response;
        this.addQuestionsToForm();
      },
      error: (error) => {
        console.log(error);   
      },
    });
  }


  sendAnswers():void{
    if (this.answersForm.valid) {
      const fullname = this.answersForm.value.fullname; 
      const data = this.getAnswers.value.map((answer: any) => {
        return {
          ...answer,        
          fullname: fullname 
        };
      });  
      this.dataService.addAnswers(data).subscribe({
        next: (response) => {
          this.answersForm.reset()
        },
        error: (error) => {
          console.log(error);   
        },
      });
    }else{
      this.answersForm.markAllAsTouched();
    }
  }
}
