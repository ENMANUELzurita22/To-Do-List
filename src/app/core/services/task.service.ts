import { Injectable, inject } from '@angular/core';
import {
    Firestore,
    collection,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    collectionData,
    docData,
} from '@angular/fire/firestore';
import { Observable, from, map } from "rxjs";
import { Task } from '../models/task.model';

@Injectable({
    providedIn: "root",
})
export class TaskService {
    private firestore = inject(Firestore); // ✅ Usa `inject(Firestore)`

    constructor() {} // 🔥 No necesitas el constructor

    // Obtener todas las tareas
    getTasks(): Observable<Task[]> {
        const taskCollection = collection(this.firestore, "tasks");
        return collectionData(taskCollection, { idField: "id" }) as Observable<Task[]>;
    }

    // Obtener tarea por id
    getTaskById(id: string): Observable<Task> {
        const taskDocRef = doc(this.firestore, `tasks/${id}`);
        return docData(taskDocRef, { idField: "id" }) as Observable<Task>;
    }

    // Crear Tarea
    addTask(task: Task): Observable<string> {
        const taskCollection = collection(this.firestore, "tasks");
        return from(
            addDoc(taskCollection, {
                title: task.title,
                description: task.description,
                date: task.date,
                done: task.done,
            })
        ).pipe(map((docRef) => docRef.id));
    }

    // Actualizar tarea
    updateTask(task: Task): Observable<void> {
        const taskDocRef = doc(this.firestore, `tasks/${task.id}`);
        return from(
            updateDoc(taskDocRef, {
                title: task.title,
                description: task.description,
                date: task.date,
                done: task.done,
            })
        );
    }

    // Eliminar Tarea
    deleteTask(id: string): Observable<void> {
        const taskDocRef = doc(this.firestore, `tasks/${id}`);
        return from(deleteDoc(taskDocRef));
    }

    // Cambiar estado de tarea
    toggleTaskStatus(task: Task): Observable<void> {
        const taskDocRef = doc(this.firestore, `tasks/${task.id}`);
        return from(
            updateDoc(taskDocRef, {
                done: !task.done,
            })
        );
    }
}
