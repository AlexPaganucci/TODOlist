import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[] = [];
  private tasksUpdated = new BehaviorSubject<Task[]>([]);

  constructor() { }

  getTasks(): Observable<Task[]> {
    return this.tasksUpdated.asObservable();
  }

  getTaskById(taskId: string): Observable<Task | undefined> {
    const task = this.tasks.find(task => task.id === taskId);
    return of(task);
  }

  addTask(task: Task): void {
    this.tasks.push(task);
    this.tasksUpdated.next(this.tasks);
  }

  removeTask(task: Task): void {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
    this.tasksUpdated.next(this.tasks);
  }

  updateTask(task: Task): void {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index > -1) {
      this.tasks[index] = task;
      this.tasksUpdated.next(this.tasks);
    }
    console.log(task);

  }

  markTaskAsCompleted(task: Task): void {
    task.completed = true;
    this.tasksUpdated.next(this.tasks);
  }

  getTotalTasks(): number {
    return this.tasks.length;
  }

  getCompletedTasks(): number {
    return this.tasks.filter(task => task.completed).length;
  }
}
