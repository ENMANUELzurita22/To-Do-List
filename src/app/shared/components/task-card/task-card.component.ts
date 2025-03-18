import { Component, EventEmitter, Input, Output } from "@angular/core"
import { Task } from "src/app/core/models/task.model"

@Component({
  selector: "app-task-card",
  templateUrl: "./task-card.component.html",
  styleUrls: ["./task-card.component.scss"],
  standalone: false
})
export class TaskCardComponent {
  @Input() task!: Task
  @Output() toggleStatus = new EventEmitter<Task>()
  @Output() editTask = new EventEmitter<Task>()
  @Output() deleteTask = new EventEmitter<Task>()

  onToggleStatus(): void {
    this.toggleStatus.emit(this.task)
  }

  onEditTask(): void {
    this.editTask.emit(this.task)
  }

  onDeleteTask(): void {
    this.deleteTask.emit(this.task)
  }

  getPriorityClass(): string {
    const titleLength = this.task.title.length

    if (titleLength > 20) {
      return "high"
    } else if (titleLength > 10) {
      return "medium"
    } else {
      return "low"
    }
  }
}

