import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Task } from 'src/app/core/models/task.model';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  standalone: false,
})
export class TaskCreateComponent  {

  constructor(
    private taskService: TaskService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  async onSubmit(task: Task) {
    const loading = await this.loadingController.create({
      message: 'Creando tarea...',
    })
    await loading.present();

    this.taskService.addTask(task).subscribe({
      next: () => {
        loading.dismiss()
        this.presentToast('Tarea Creada Correctamente', 'success')
        this.router.navigate(['/home'])
      },
    })
  }

  onCancel() {
    this.router.navigate(['/home'])
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
