import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../common/task';
import { TaskService } from '../../services/task.service';  // Import your TaskService

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
  imports: [CommonModule, FormsModule],
})
export class EditModalComponent implements OnInit {
  constructor(public bsModalRef: BsModalRef, private taskService: TaskService) {}

  @Input() confirmationMessage!: string;
  @Input() task!: Task;
  @Output() confirmation: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() editForm: EventEmitter<any> = new EventEmitter<any>();

  form = {
    title: '',
    description: '',
  };

  ngOnInit(): void {
    // Set the form values from the task input
    this.form = { ...this.task };
  }

  confirm() {
    console.log('Before HTTP request');

   
    this.task.title=this.form.title
    this.task.description=this.form.description
    this.taskService.updateTask(this.task).subscribe(
      (updatedForm: any) => {
        console.log('Form updated successfully:', updatedForm);
        
        this.editForm.emit(updatedForm);
      },
      (error: any) => {
        console.error('Error updating form:', error);
      }
    );

    this.confirmation.emit(true);
    this.bsModalRef.hide();
    console.log('After HTTP request');
  }

  cancel() {
    this.confirmation.emit(false);
    this.bsModalRef.hide();
  }
}
