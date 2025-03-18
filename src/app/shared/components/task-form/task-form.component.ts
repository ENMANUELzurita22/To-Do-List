import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: false,
})
export class TaskFormComponent  implements OnInit {

  @Input() task: Task | null = null;
  @Output() formSubmit = new EventEmitter<Task>();
  @Output() formCancel = new EventEmitter<void>();

  taskForm!: FormGroup;
  isEditMode = false;

  constructor( private fb: FormBuilder) { }

  ngOnInit() {
    this.isEditMode = this.task !== null;
    this.initForm();
  }

  initForm() {
    this.taskForm = this.fb.group({
      title: [this.task?.title || "", [Validators.required]],
      description: [this.task?.description || "", [Validators.required]],
      date: [this.task?.date ? this.formatDateForInput(this.task.date) : [Validators.required]],
      done: [this.task?.done || false],
    })
  }

  formatDateForInput(date : Date | any): string {
    if (!date) return "";

    if (date && typeof date.toDate === 'function') {
      date = date.toDate();
    }

    if (typeof date === 'string' ) {
      date = new Date(date);
    }

    const d = new Date(date)
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskDate: Task = {
        ...this.taskForm.value,
        date: new Date(this.taskForm.value.date),
      }

      if (this.isEditMode && this.task?.id){
        taskDate.id = this.task.id;
      }

      this.formSubmit.emit(taskDate);
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  onCancel(){
    this.formCancel.emit()
  }

}
