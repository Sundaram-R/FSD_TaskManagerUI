export class TaskModel{
      TaskId:number;
      Task:string;
      ProjectID:number;
      IsParentTask:boolean;
       ParentTask:number;
       Priority:number;
      StartDate:Date;
     EndDate:Date;
      TaskOwner:number;
      Status:string;
}