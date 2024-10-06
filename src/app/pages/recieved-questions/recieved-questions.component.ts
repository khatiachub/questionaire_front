import { Component } from '@angular/core';
import { DataserviceService } from '../../core/dataservice.service';

@Component({
  selector: 'app-recieved-questions',
  templateUrl: './recieved-questions.component.html',
  styleUrl: './recieved-questions.component.css'
})
export class RecievedQuestionsComponent {
  usersArray:any=[]
  answers:any=[]
  constructor(private dataService: DataserviceService) {
    
  }

  ngOnInit(): void {
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

  fullname=''
  getAnswers(id:number):void{
    this.dataService.getAnswers(id).subscribe({
      next: (response) => {
        console.log(response);
        response.forEach((element: { fullName: string; }) => {
          this.fullname=element.fullName
        });
        console.log(this.fullname);
         
        this.answers=response
      },
      error: (error) => {
        console.log(error);   
      },
    });
  }

}
