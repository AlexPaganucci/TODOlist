import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  taskId: string = '';
  task: Task | undefined;
  editingMode: boolean = false;

  constructor(private route: ActivatedRoute, private taskSrv: TaskService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.taskSrv.getTaskById(id).subscribe(
        task => {
          this.task = task;
        },
        error => {
          console.log('Errore durante il recupero dei dettagli dell\'attività:', error);
        }
      );
    }
  }

  toggleEditingMode() {
    this.editingMode = !this.editingMode;
  }

}
