import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from '../models/task';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataServiceService } from '../service/data-service.service';

@Component({
  selector: 'app-taskupdate',
  templateUrl: './taskupdate.component.html',
  styleUrls: ['./taskupdate.component.css']
})
export class TaskupdateComponent implements OnInit {

  tasks: Task = {
    taskTitle: "",
    taskCategory: "",
    taskDescription: "",
    taskPriority: "",
    taskStatus: false,
    taskDate: null,
    id: 0
  }

  register: FormGroup;
  constructor(private taskService: DataServiceService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<TaskupdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task) {
    this.register = this._fb.group({
      id: 0,
      taskTitle: "",
      taskCategory: "",
      taskDescription: "",
      taskPriority: "",
      taskDate: null
    });
    this.minDate.setDate(this.minDate.getDate());
  }
  minDate = new Date();
  ngOnInit(): void {
    this.register.patchValue(this.data);
    console.log(this.data)
    console.log(this.data.id);
    this.taskService.getTaskById(this.data.id).subscribe(
      (task4) => {
        this.tasks = task4;

        console.log(this.data);
      }
    );
  }


  onSubmit() {
    console.log("Trying to update the data");
    console.log(this.register.value)
    console.log(this.data.id)
    console.log(this.register.valid)
    if (this.register.valid) {
      {
        this.taskService.updateTask(this.register.value, this.data.id).subscribe(() => {
          console.log("calling service method")
          this._snackBar.open('Your Task Is Updated Sucessfully!', 'success', {
            duration: 5000,
            panelClass: ['mat-toolbar', 'mat-primary']
          }),
            this._dialogRef.close(true);
          location.reload();
        },
        )
      };

    }
  }
}
