// confirmation-modal.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  @Input() confirmationMessage: string = 'Voulez-vous vraiment confirmer?';
  @Output() confirmation: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public bsModalRef: BsModalRef) {}

  confirm() {
    this.confirmation.emit(true);
    this.bsModalRef.hide();
  }

  cancel() {
    this.confirmation.emit(false);
    this.bsModalRef.hide();
  }
}
