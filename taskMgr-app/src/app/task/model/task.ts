export class TaskModel{
      taskId:number;
      taskName:string;
      projectID:number;
      isParentTask:boolean;
       parentTask:number;
       priority:number;
      startDate:Date;
     endDate:Date;
      taskOwner:number;
      status:string;
}