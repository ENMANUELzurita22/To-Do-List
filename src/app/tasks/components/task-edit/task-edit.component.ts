import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Task } from 'src/app/core/models/task.model';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  standalone: false,
})
export class TaskEditComponent  implements OnInit {

  taskId= ""
  task: Task | null = null
  loading = true

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit(){
      this.taskId = this.route.snapshot.paramMap.get("id") || ""
      if (this.taskId){
        this.loadTask()
      } else {
        this.router.navigate(["/home"])
      }
  }

  async loadTask(){
    const loading = await this.loadingController.create({
      message: "Cargando Tarea..."
    })
    await loading.present()

    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task) => {
        this.task = task
        this.loading = false
        loading.dismiss()
      },
      error: (error) => {
        console.error(error)
        this.loading = false
        loading.dismiss()
        this.presentToast("Error al cargar la tarea", "danger")
        this.router.navigate(["/home"])
      }
    })
  }

  async onSubmit(task: Task) {
    const loading = await this.loadingController.create({
      message: "Actualizando Tarea..."
    })
    await loading.present()

    this.taskService.updateTask(task).subscribe({
      next: () => {
        loading.dismiss()
        this.presentToast("Tarea Actualizada Correctamente", "sucsses")
        this.router.navigate(["/home"])
      },
      error: (error)=>{
        console.error("error updating task:", error)
        loading.dismiss()
        this.presentToast("Error al actualizar la tarea", "danger")
      }
    })
  }

  onCancel(){
    this.router.navigate(["/home"])
  }

  async presentToast(message: string, color: string){
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    })
    toast.present()
  }

}
