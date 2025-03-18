import { Component,   OnInit } from "@angular/core"
import   { Router } from "@angular/router"
import   { AlertController, LoadingController, ToastController } from "@ionic/angular"
import   { Task } from "src/app/core/models/task.model"
import   { TaskService } from "src/app/core/services/task.service"
import   { ThemeService } from "src/app/core/services/theme.service"

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"],
  standalone: false
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = []
  filteredTasks: Task[] = []
  loading = true
  today = new Date()
  currentFilter = "all"
  pendingTasksCount = 0
  isDarkMode = false
  searchTerm = ""

  constructor(
    private taskService: TaskService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private themeService: ThemeService,
  ) {}

  ngOnInit() {
    this.loadTasks()
    this.themeService.darkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark
    })
  }

  async loadTasks() {
    this.loading = true

    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks
        this.filterTasks()
        this.updatePendingCount()
        this.loading = false
      },
      error: (error) => {
        console.error("Error loading tasks:", error)
        this.loading = false
        this.presentToast("Error al cargar las tareas", "danger")
      },
    })
  }

  refreshTasks(event: any) {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks
        this.filterTasks()
        this.updatePendingCount()
        event.target.complete()
      },
      error: (error) => {
        console.error("Error refreshing tasks:", error)
        this.presentToast("Error al actualizar las tareas", "danger")
        event.target.complete()
      },
    })
  }

  filterTasks() {
    let result = [...this.tasks]

    // Apply status filter
    if (this.currentFilter === "pending") {
      result = result.filter((task) => !task.done)
    } else if (this.currentFilter === "completed") {
      result = result.filter((task) => task.done)
    }

    // Apply search filter if there's a search term
    if (this.searchTerm && this.searchTerm.trim() !== "") {
      const search = this.searchTerm.toLowerCase().trim()
      result = result.filter(
        (task) => task.title.toLowerCase().includes(search) || task.description.toLowerCase().includes(search),
      )
    }

    this.filteredTasks = result
  }

  updatePendingCount() {
    this.pendingTasksCount = this.tasks.filter((task) => !task.done).length
  }

  onCreateTask() {
    this.router.navigate(["/home/create"])
  }

  onEditTask(task: Task) {
    this.router.navigate(["/home/edit", task.id])
  }

  async onDeleteTask(task: Task) {
    const alert = await this.alertController.create({
      header: "Confirmar eliminación",
      message: `¿Estás seguro de que deseas eliminar la tarea "${task.title}"?`,
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "cancel-button",
        },
        {
          text: "Eliminar",
          handler: () => {
            this.deleteTask(task)
          },
          cssClass: "confirm-button",
        },
      ],
      cssClass: "custom-alert",
    })

    await alert.present()
  }

  deleteTask(task: Task) {
    if (!task.id) return

    this.loadingController
      .create({
        message: "Eliminando tarea...",
        cssClass: "custom-loading",
      })
      .then((loader) => {
        loader.present()

        this.taskService.deleteTask(task.id!).subscribe({
          next: () => {
            loader.dismiss()
            this.presentToast("Tarea eliminada correctamente", "success")
          },
          error: (error) => {
            console.error("Error deleting task:", error)
            loader.dismiss()
            this.presentToast("Error al eliminar la tarea", "danger")
          },
        })
      })
  }

  onToggleTaskStatus(task: Task) {
    if (!task.id) return

    this.taskService.toggleTaskStatus(task).subscribe({
      next: () => {
        this.presentToast(`Tarea marcada como ${task.done ? "pendiente" : "completada"}`, "success")
        this.updatePendingCount()
      },
      error: (error) => {
        console.error("Error toggling task status:", error)
        this.presentToast("Error al cambiar el estado de la tarea", "danger")
      },
    })
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: "bottom",
      cssClass: "custom-toast",
      buttons: [
        {
          icon: "close-outline",
          role: "cancel",
        },
      ],
    })
    toast.present()
  }

  getEmptyStateMessage(): string {
    switch (this.currentFilter) {
      case "pending":
        return "pendientes"
      case "completed":
        return "completadas"
      default:
        return this.searchTerm ? "encontradas" : "disponibles"
    }
  }

  getEmptyStateDescription(): string {
    if (this.searchTerm) {
      return `No se encontraron tareas que coincidan con "${this.searchTerm}"`
    }

    switch (this.currentFilter) {
      case "pending":
        return "¡Todas tus tareas están completadas!"
      case "completed":
        return "No has completado ninguna tarea todavía."
      default:
        return "Crea una nueva tarea para comenzar."
    }
  }

  trackByFn(index: number, task: Task): string {
    return task.id || index.toString()
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode()
  }
}

