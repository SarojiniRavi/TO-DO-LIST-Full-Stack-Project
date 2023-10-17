import { Component } from '@angular/core';
import { Task } from '../models/task';
import { DataServiceService } from '../service/data-service.service';


@Component({
  selector: 'app-remainder',
  templateUrl: './remainder.component.html',
  styleUrls: ['./remainder.component.css']
})
export class RemainderComponent {
  tasks: Task[];
  noTasksMessage: string = ''; 

  constructor(private taskService: DataServiceService) { }

  ngOnInit(): void {
    this.taskService.getTask().subscribe(tasks => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      this.tasks = tasks.filter(task => {
        const taskDate = new Date(task.taskDate);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate.getTime() === today.getTime();
      });

      if (this.tasks.length === 0) {
        this.noTasksMessage = 'No tasks for today.';
      }
    });
  }
}
