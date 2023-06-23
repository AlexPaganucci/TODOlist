import { Component, OnInit } from '@angular/core';
import { Priority } from 'src/app/models/priority';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  newTaskTitle: string = '';
  newTaskDetails: string = '';
  newTaskPriority: Priority = Priority.Low;

  constructor(private taskSrv: TaskService) { }

  ngOnInit(): void {
  }

  addTask(): void {
    const newTask: Task = {
      id: this.generateUniqueId(),
      title: this.newTaskTitle,
      details: this.newTaskDetails,
      priority: this.newTaskPriority,
      completed: false
    };
    this.taskSrv.addTask(newTask);
    this.newTaskTitle = '';
    this.newTaskDetails = '';
  }

  private generateUniqueId(): string {
    let id = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
      id += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return id;
  }
}
