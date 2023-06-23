import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Priority } from 'src/app/models/priority';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  animations: [
    trigger('cardCreationAnimation', [
      state('void', style({ opacity: 0, transform: 'translateY(-100%)' })),
      transition(':enter', [
        animate('300ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('cardToggleAnimation', [
      state('false', style({ opacity: 1, transform: 'scale(1.1)' })),
      state('true', style({ opacity: 0.5, transform: 'scale(1)' })),
      transition('false <=> true', animate('300ms')),
    ])
  ],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  showCompletedTasks: boolean = true;
  showPendingTasks: boolean = true;
  filteredTasks: Task[] = [];
  @Output() taskToggleEvent = new EventEmitter<void>();
  previousToggleState: { [taskId: string]: boolean } = {};
  marker: string = "";

  constructor(private taskSrv: TaskService) {}

  ngOnInit() {
    this.taskSrv.getTasks().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
        // this.updateView();
      },
      error: (error) => {
        console.log('Errore durante il recupero delle attività:', error);
      }
    });
  }

  removeTask(task: Task): void {
    this.taskSrv.removeTask(task);
  }

  updateTask(task: Task): void {
    this.taskSrv.updateTask(task);
    const previousState = this.previousToggleState[task.id] || false;
    this.previousToggleState[task.id] = task.completed;
    if (previousState !== task.completed) {
      this.taskToggleEvent.emit();
    }
  }

  get totalTasks(): number {
    return this.taskSrv.getTotalTasks();
  }

  get completedTasks(): number {
    return this.taskSrv.getCompletedTasks();
  }

  updateView(): void {
    this.filteredTasks = this.tasks.filter((task) => {
      if (this.showCompletedTasks && this.showPendingTasks) {
        return true; // Mostra tutte le attività
      }
      if (this.showCompletedTasks && task.completed) {
        return true; // Mostra solo le attività completate
      }
      if (this.showPendingTasks && !task.completed) {
        return true; // Mostra solo le attività da completare
      }
      return false; // Nascondi le altre attività
    });
  }

  getPriorityMarkers(priority: string): string {
    switch (priority) {
      case 'Low':
        this.marker = '!';
        break;
      case 'Medium':
        this.marker = '!!';
        break;
      case 'High':
        this.marker = '!!!';
        break;
      default:
        this.marker = '';
        break;
    }
    return this.marker;
  }

  ngOnDestroy() {
    this.taskToggleEvent.unsubscribe();
  }
}
