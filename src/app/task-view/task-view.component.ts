import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../models/task';
import { TaskAddComponent } from '../task-add/task-add.component';
import { DataServiceService } from '../service/data-service.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent {
  tasks:Task[]=[];

  imagePath: string = 'assets/images/noun-task-list-5597010.png';

    constructor(private task:DataServiceService,
    public dialog: MatDialog){}
  
    ngOnInit() {
      this.task.getTask().subscribe((archivedTasks:Task[]) => {
        this.tasks = archivedTasks.filter(task=>task.taskStatus === false);
      });
      
    }
  openDialog() {
    const dialogRef = this.dialog.open(TaskAddComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  
  searchtask(title: string) {
  this.task.getTask().subscribe((data) => {
    this.tasks = data.filter(
      (task) =>
        task.taskTitle.toLowerCase().includes(title.toLowerCase()) ||
        task.taskDescription.toLowerCase().includes(title.toLowerCase())|| 
        task.taskCategory.toLowerCase().includes(title.toLowerCase())
    );
  });
}

  



currentPage = 1;
tasksPerPage = 5; 

onPageChange(pageNumber: number) {
  this.currentPage = pageNumber;
}

get startIndex(): number {
  return (this.currentPage - 1) * this.tasksPerPage;
}

get endIndex(): number {
  return this.startIndex + this.tasksPerPage;
}


get displayedTasks(): Task[] {
  return this.tasks.slice(this.startIndex, this.endIndex);
}

 get totalPages(): number {
    return Math.ceil(this.tasks.length / this.tasksPerPage);
  }

  getPageNumbers(): number[] {
    const pageNumbers = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  getLimitedPageNumbers(): number[] {
    const pageNumbers = [];
    const maxAdjacentPages = 2;
  
    for (let i = this.currentPage - maxAdjacentPages; i <= this.currentPage + maxAdjacentPages; i++) {
      if (i >= 1 && i <= this.totalPages) {
        pageNumbers.push(i);
      }
    }
  
    return pageNumbers;
  }
  
sortByPriority(tasks: any[]): any[] {
  return tasks.slice().sort((a, b) => {
    if (a.taskPriority === 'High' && b.taskPriority !== 'High') {
      return -1;
    } else if (a.taskPriority !== 'High' && b.taskPriority === 'High') {
      return 1;
    } else if (a.taskPriority === 'Medium' && b.taskPriority === 'Low') {
      return -1;
    } else if (a.taskPriority === 'Low' && b.taskPriority === 'Medium') {
      return 1;
    } else {
      return 0;
    }
  });
}


sortByDate(tasks: any[]): any[] {
  return tasks.slice().sort((a, b) => {
    return new Date(a.taskDate).getTime() - new Date(b.taskDate).getTime();
  });
}
sortTasksByPriority() {
  const sortedTasks = this.sortByPriority(this.tasks);
  this.tasks = sortedTasks.filter((task) => task.taskStatus === false);
}

sortTasksByDate() {
  const sortedTasks = this.sortByDate(this.tasks);
  this.tasks = sortedTasks.filter((task) => task.taskStatus === false);
}


onSortChange(sortBy: string) {
  if (sortBy === 'date') {
    this.sortTasksByDate();
  } else if (sortBy === 'priority') {
    this.sortTasksByPriority();
  }else if (sortBy === 'noSort'){
    this.task.getTask().subscribe((archivedTasks:Task[]) => {
      this.tasks = archivedTasks.filter(task=>task.taskStatus === false);
    });
  }
}

searchText:string="";

showFilter(){
  this.task.getTask().subscribe((data)=>{
    this.tasks=data.filter(task=>task.taskPriority.startsWith(this.searchText) && task.taskStatus===false)
    console.log(this.searchText);
    console.log(this.tasks);
  })
}
show(){
  this.task.getTask().subscribe((data)=>{
    this.tasks=data.filter(task=>task.taskStatus===false);
  })
}

}

