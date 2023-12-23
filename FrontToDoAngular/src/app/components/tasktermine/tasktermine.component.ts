import { Component, OnInit } from '@angular/core';
import { Task } from '../../common/task';
import { TaskService } from '../../services/task.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-tasktermine',
  standalone: true,
  providers:[BsModalService],
  imports: [CommonModule],
  templateUrl: './tasktermine.component.html',
  styleUrl: './tasktermine.component.css'
})
export class TasktermineComponent implements OnInit{
  formModal:any;
  tasks: Task[] = [];
  ngOnInit():void {

    this.loadTasks();
   
  }
  constructor(private TaskServicesService:TaskService,private modalService:BsModalService){}
  loadTasks() {
    
      this.TaskServicesService.getAllTerminateTask();
      this.TaskServicesService.tasks$.subscribe(
        (tasks: Task[]) => {
          this.tasks = tasks;
        },
        error => {
          console.error('Error updating tasks:', error);
        }
      );
    
  }

  openConfirmationDialog(task: any) {
    console.log(task._id)
    const initialState = {
      task,
      confirmationMessage: 'Voulez-vous vraiment supprimer cette tâche?'
    };

   
    const modalRef: BsModalRef = this.modalService.show(ConfirmationModalComponent, { initialState });

    
    modalRef.content.confirmation.subscribe((result: boolean) => {
      if (result) {
        
        const taskId = task._id;
        this.TaskServicesService.deleteTask(taskId);
       
      }
    });
  }



  CheckIfTerminate(task: Task){
    task.isTerminate=!task.isTerminate;

  }
 

}
