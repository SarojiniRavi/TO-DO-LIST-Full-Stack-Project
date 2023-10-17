export type Task={
    
    id:number,
    taskTitle:string,
    taskDescription:string,
    taskCategory?:string,
    taskPriority:string,
    taskStatus:boolean,
    taskDate:Date
}