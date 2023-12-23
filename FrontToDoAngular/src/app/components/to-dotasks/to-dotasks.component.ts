import { Component,  OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../common/task';
import { TaskService } from '../../services/task.service';
import { RouterLink} from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {  ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditModalComponent } from '../edit-modal/edit-modal.component';


@Component({
  selector: 'app-to-dotasks',
  standalone: true,
  providers:[BsModalService],
  imports: [CommonModule,FormsModule,RouterLink, ModalModule ],
  templateUrl: './to-dotasks.component.html',
  styleUrl: './to-dotasks.component.css'
})

export class ToDotasksComponent implements OnInit {
  formModal:any;
  tasks: Task[] = [];
  
  ngOnInit():void {
    this.loadTasks();
   
  }
  constructor(private TaskServicesService:TaskService,private modalService:BsModalService,private bsModalRef:BsModalRef){}
  loadTasks() {
    
      this.TaskServicesService.getAllTasks();
      this.TaskServicesService.tasks$.subscribe(
        (tasks: Task[]) => {
          this.tasks = tasks;
        },
        error => {
          console.error('Error updating tasks:', error);
        }
      );
    
  }
    
         
  
  
 
 


CheckIfTerminate(task: Task) {
  
  task.isTerminate = !task.isTerminate;
  console.log(task.isTerminate)
  console.log(task)
  this.TaskServicesService.updateTask(task).subscribe(
    (updatedTask: Task) => {
      console.log('Task updated successfully:', updatedTask);
      
      this.TaskServicesService.getAllTasks();
    },
    (error: any) => {
      console.error('Error updating task:', error);
      // Handle the error as needed
    }
  );
  
}

onCheckboxChange(task: Task) {
  
  task.isTerminate = !task.isTerminate;
  
}

  openConfirmationDialog(task: Task) {
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
  openEditModal(task: Task) {
    console.log(task._id);
    const initialState = {
      task,
      confirmationMessage: 'Voulez-vous modifier la tâche?'
    };
  
    // Ouvrir le modal
    const modalRef: BsModalRef = this.modalService.show(EditModalComponent, { initialState });
  

    modalRef.content?.editForm.subscribe((editedTask: Task) => {
      console.log('Edited task:', editedTask);
      this.TaskServicesService.updateTask(editedTask)
    });
  }
  
  
 
}


