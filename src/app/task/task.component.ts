import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskupdateComponent } from '../taskupdate/taskupdate.component';
import { DataServiceService } from '../service/data-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from '../models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() tasks: any;

  priority: any;

  strikeOutAll: boolean = false;

  constructor(
    public dialog: MatDialog,
    private taskservice: DataServiceService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.priority = this.tasks?.taskPriority;
  }

  openDialog(data: any): void {
    console.log(data);
    this.dialog.open(TaskupdateComponent, {
      data: data,
    });
  }

  deleteTask(id: number) {
    console.log(id);

    this.taskservice.deleteTask(id).subscribe(() => {
      this._snackBar.open('Your Task Is Deleted Successfully!', 'success', {
        duration: 5000,
        panelClass: ['mat-toolbar', 'mat-primary'],
      });
    });
    location.reload();
  }

  onArchive(tasks:Task){
    this.strikeOutAll = !this.strikeOutAll;
    this.taskservice.archiveTask(tasks);
    this.taskservice.updateTask(tasks,tasks.id).subscribe(() => {
    this._snackBar.open('Your task is completed successfully', 'Close', {
      duration: 3000, 
      panelClass: ['mat-toolbar', 'mat-primary']
    });
    });
    location.reload();
  }
   toggleStrikeOutAll() {
    this.strikeOutAll = !this.strikeOutAll;
  }
}
