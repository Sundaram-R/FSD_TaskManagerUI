import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user/user.component';
import {ProjectComponent} from './project/project.component';
import { TaskComponent } from './task/task.component';
import{ ViewTaskComponent } from './view-task/view-task.component';
const MAINMenu_Routes: Routes=[
    {path:'' , redirectTo:'/user', pathMatch:'full' },
    {path:'user', component:UserComponent },
    {path:'project', component:ProjectComponent},
    {path:'task', component:TaskComponent},
    {path:'view-task', component:ViewTaskComponent}
];
export const CONST_Routing=RouterModule.forRoot(MAINMenu_Routes);