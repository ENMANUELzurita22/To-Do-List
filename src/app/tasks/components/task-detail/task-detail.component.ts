import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { AlertController, LoadingController, ToastController } from "@ionic/angular"
import { Task } from "src/app/core/models/task.model"
import { TaskService } from "src/app/core/services/task.service"

@Component({
  selector: "app-task-detail",
  templateUrl: "./task-detail.component.html",
  styleUrls: ["./task-detail.component.scss"],
  standalone: false,
})
export class TaskDetailComponent implements OnInit {
  taskId = ""
  task: Task | null = null
  loading = true

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
  ) {}

  ngOnInit() {
    this.taskId = this.route.snapshot.paramMap.get("id") || ""
    if (this.taskId) {
      this.loadTask()
    } else {
      this.router.navigate(["/home"])
    }
  }

  async loadTask() {
    this.loading = true

    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task) => {
        this.task = task
        this.loading = false
      },
      error: (error) => {
        console.error("Error loading task:", error)
        this.loading = false
        this.presentToast("Error al cargar la tarea", "danger")
        this.router.navigate(["/home"])
      },
    })
  }

  onEdit() {
    if (this.task?.id) {
      this.router.navigate(["/home/edit", this.task.id])
    }
  }

  onToggleStatus() {
    if (!this.task?.id) return

    const loading = this.loadingController.create({
      message: `Marcando tarea como ${this.task.done ? "pendiente" : "completada"}...`,
      cssClass: "custom-loading",
    })

    loading.then((loader) => {
      loader.present()

      this.taskService.toggleTaskStatus(this.task!).subscribe({
        next: () => {
          this.task!.done = !this.task!.done
          loader.dismiss()
          this.presentToast(`Tarea marcada como ${this.task!.done ? "completada" : "pendiente"}`, "success")
        },
        error: (error) => {
          console.error("Error toggling task status:", error)
          loader.dismiss()
          this.presentToast("Error al cambiar el estado de la tarea", "danger")
        },
      })
    })
  }

  async onDelete() {
    if (!this.task) return

    const alert = await this.alertController.create({
      header: "Confirmar eliminación",
      message: `¿Estás seguro de que deseas eliminar la tarea "${this.task.title}"?`,
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Eliminar",
          handler: () => {
            this.deleteTask()
          },
        },
      ],
      cssClass: "custom-alert",
    })

    await alert.present()
  }

  deleteTask() {
    if (!this.task?.id) return

    const loading = this.loadingController.create({
      message: "Eliminando tarea...",
      cssClass: "custom-loading",
    })

    loading.then((loader) => {
      loader.present()

      this.taskService.deleteTask(this.task!.id!).subscribe({
        next: () => {
          loader.dismiss()
          this.presentToast("Tarea eliminada correctamente", "success")
          this.router.navigate(["/home"])
        },
        error: (error) => {
          console.error("Error deleting task:", error)
          loader.dismiss()
          this.presentToast("Error al eliminar la tarea", "danger")
        },
      })
    })
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: "bottom",
      cssClass: "custom-toast",
    })
    toast.present()
  }
}

