import { Component, OnInit } from '@angular/core';
import { RouterOutlet,RouterLink} from '@angular/router';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from './services/task.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule,CommonModule,FormsModule,ReactiveFormsModule ,RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  ngOnInit(): void {  

    
  }
  constructor(private _formBuilder: FormBuilder,private TaskServicesService:TaskService,public http:HttpClient){}
  title = 'FrontToDoAngular';
  actionss: Array<any>=[
    {title:"ToDo Tasks ","route":"/to-dotasks"},
    {title:"Complete Tasks ","route":"/completedtasks"}
  ]
  router: any;
  currentAction:any;
  taskForm= this._formBuilder.group({
    title:[''],
    description:['']

  })
  
  saveForm() {
    console.log('Form data is ', this.taskForm.value);
    this.TaskServicesService.createTask(this.taskForm.value).subscribe(
      (response: any) => {
        console.log('Task created successfully:', response);
        this.TaskServicesService.updateTasks(response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  setCurrentAction(action: any){
    this.currentAction=action;
  }
  
  response:any;
  
 
}
