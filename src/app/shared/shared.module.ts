import { NgModule } from "@angular/core";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TaskCardComponent } from "./components/task-card/task-card.component";
import { TaskFormComponent } from "./components/task-form/task-form.component";
import { DateFormatPipe } from "./pipes/date-format.pipe";

@NgModule({
    declarations: [TaskCardComponent, TaskFormComponent, DateFormatPipe],
    imports: [
        CommonModule, IonicModule, FormsModule, ReactiveFormsModule, ],
    exports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        TaskCardComponent,
        TaskFormComponent,
        DateFormatPipe,
    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
})

export class SharedModule {}