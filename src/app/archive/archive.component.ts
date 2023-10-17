import { Component } from '@angular/core';
import { Task } from '../models/task';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../service/data-service.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})

export class ArchiveComponent {
  archivedTasks:Task[]=[];
  strikeOutAll:boolean=true;
 
  constructor(private taskService:DataServiceService,private _snackBar:MatSnackBar){}
  
  ngOnInit() {
    this.taskService.getTask().subscribe((archivedTasks:Task[]) => {
      this.archivedTasks = archivedTasks.filter(task=>task.taskStatus === true);
    });
  }
  
  deleteTask(id:number){
    this.taskService.deleteTask(id).subscribe(()=>{
      this._snackBar.open('Your Task Is Deleted Sucessfully!', 'success', {
        duration: 5000,
        panelClass: ['mat-toolbar', 'mat-primary']})},
    );
    window.location.reload();
    }  
}
