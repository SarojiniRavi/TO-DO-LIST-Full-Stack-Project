import { Component} from '@angular/core';
import { TaskEditComponent } from '../task-edit/task-edit.component';
import { Task } from '../models/task';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataServiceService } from '../service/data-service.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent {
  task:Task={
    taskTitle: "",
    taskCategory: "",
    taskDescription: "",
    taskPriority: "",
    taskStatus: false,
    taskDate: null,
    id: 0,
  }
   minDate = new Date();
   
 
  constructor(
    private dataService:DataServiceService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar)
    {this.minDate.setDate(this.minDate.getDate());}
   
   
   addTask(){
     this.dataService.saveTask(this.task).subscribe(()=>{
       this._snackBar.open('Your Task is Added', 'success', {
         duration: 5000,
         panelClass: ['mat-toolbar', 'mat-primary']})},
         ()=>{alert("Failed to Add Task Due to Server Error !!")}
         );
         window.location.reload();
   }
   openDialog(): void {
     const dialogRef = this.dialog.open(TaskEditComponent, {
       data: {taskCategory:this.task.taskCategory},
     });
 
     dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed');
       this.task.taskCategory = result;
     });
   }
   
   
  
}


