import { Pipe,PipeTransform } from '@angular/core';
import { User } from './user/model/user';
import { ProjectModel } from './project/model/project';
@Pipe({
name:'userFirstNameFilter'
})
export class UserFirstNameFilter {
    transform(users:User[],args){        
    var data=users;
    if (args && args.length>0)
        data = users.filter(u=>u.firstName.toLocaleLowerCase().startsWith(args.toLocaleString().toLocaleLowerCase()));
        return data;
    }
};
@Pipe({  name: 'orderBy' })
export class OrderByPipe implements PipeTransform {

    transform(data:any[], args?: any): any {       
        if(data) {
        return data.sort(function(a, b){
            if(a[args.property] < b[args.property]){
                return -1 * args.direction;
            }
            else if( a[args.property] > b[args.property]){
                return 1 * args.direction;
            }
            else{
                return 0;
            }
        });
    }
    else 
    return 0;
    };
}
@Pipe({
    name:'projectFilter'
    })
    export class ProjectFilter {
        transform(projects:ProjectModel[],args){        
        var data=projects;
        if (args && args.length>0)
            data = projects.filter(u=>u.project.toLocaleLowerCase().startsWith(args.toLocaleString().toLocaleLowerCase()));
            return data;
        }
    };