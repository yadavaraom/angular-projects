import {Injectable} from '@angular/core';
import { ApiService,HighchartsService } from "../../_services";
export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}




@Injectable()
export class MenuItems {

  children_data:any=[];
  role_name:any={};
  admin_data:any={};
  constructor(public apiService:ApiService){

    this.admin_data= {
      label: 'Masters',
      main: [
        {
          state: 'master',
          short_label: 'A',
          name: 'User Management',
          type: 'sub',
          icon: 'feather icon-gitlab',
  
          children: [
            {
              state: 'user',
              name: 'User',
              type: 'link',
              icon: 'feather icon-users',
            },
            {
              state: 'role',
              name: 'Role',
              type: 'link',
              icon: 'feather icon-users'
            },
            {
              state: 'permission',
              name: 'Permission',
              type: 'link',
              icon: 'feather icon-users'
            }  
          ]
        }
      ]
    };

    this.apiService.getMenuItems().subscribe(data=>{
   
      console.log("data====>",data);

      
      
      data.forEach(element => {
      this.role_name=element.ROLE_NAME;

        let state_url=element.PERMISSION_NAME.split(' ').join('_')
          this.children_data.push(
            {
              state: state_url,
              name: element.PERMISSION_NAME,
              type: 'link',
              icon: 'feather icon-users',
            }
          );

        }); 

        let menu_data:any= {
          label: 'Reports',
          main: [
            {
              state: 'report',
              short_label: 'A',
              name: 'Reports',
              type: 'sub',
              icon: 'feather icon-gitlab',
              children:this.children_data
            }]
          }

          
          this.MENUITEMS.push(menu_data);
            if(this.role_name=='CEO'){
              this.MENUITEMS.push(this.admin_data);
            }
    });
  }

  MENUITEMS = [
    {
      label: 'Dashboard',
      main: [
        {
          
          state: 'dashboard',
          name: 'Dashboard',
          type: 'link',
          icon: 'icon-mobile',
          target: false
      }
      ]
    },
    {
      label: 'chart bot',
      main: [
        {
          
          state: 'chartbot',
          name: 'chartbot',
          type: 'link',
          icon: 'icon-mobile',
          target: false
      }
      ]
    }
  ];


  

  getAll(): Menu[] {
    //console.log("MENUITEMS===>",MENUITEMS); 
    return this.MENUITEMS;
  }
}
