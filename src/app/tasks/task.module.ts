import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { TaskListComponent } from "./components/task-list/task-list.component";
import { TaskDetailComponent } from "./components/task-detail/task-detail.component";
import { TaskCreateComponent } from "./components/task-create/task-create.component";
import { TaskEditComponent } from "./components/task-edit/task-edit.component";

const routes: Routes = [
    {
        path: "",
        component: TaskListComponent,
    },
    {
        path: "create",
        component: TaskCreateComponent,
    },
    {
        path: "detail/:id",
        component: TaskDetailComponent,
    },
    {
        path: "edit/:id",
        component: TaskEditComponent,
    }
]

@NgModule({
    declarations: [TaskListComponent, TaskDetailComponent, TaskCreateComponent, TaskEditComponent],
    imports: [
        IonicModule,
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],

})

export class TaskModule {}