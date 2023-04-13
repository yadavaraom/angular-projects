import {Component, Input, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import { ToastrManager } from 'ng6-toastr-notifications'
import {IOption} from 'ng-select';
import { filter } from 'rxjs/operators';
import swal from 'sweetalert2';
import {ApiService} from '../../_services/index'

@Component({
  selector: 'app-users-contact',
  templateUrl: './users.component.html',
  styleUrls: [
    './users.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss'
  ]
})



export class UsersComponent implements OnInit {
  public data: any;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';

  public user:any={};
  public roleList: any=[];
  public result:any={};  
  public userList: Array<IOption>;
  public permissionList: any=[];
  public permission:any={};
  public selectedList:any=[];
  public per_roles:any={};
  public rolePermissionList:any=[];

  public status:any=[];

  @Input('modalDefault') modalDefault: any;

  constructor(public http: Http,public apiService:ApiService,public toastr: ToastrManager) { }

  ngOnInit() {

    this.user.USER_ID=null;

      this.apiService.getAllRoles().subscribe(
        (data) => {
          this.roleList=data;
          console.log("this.roleList==>",this.roleList);
        })

        this.apiService.getAllUsers().subscribe(
          (data) => {
            console.log("data==>",data);
            this.data=data;
          })

          this.apiService.getAllPermission().subscribe(
            (data) => {
              console.log("data==>",data);
              this.permissionList=data;
            }) 

            this.apiService.getAllRolePermission().subscribe(
              (data) => {
                console.log("data==>",data);
                this.rolePermissionList=data;
              }) 


            
  }

  openConfirmsSwal() {
    swal({
      title: 'Are you sure?',
      text: 'You wont be able to revert',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });
  }

  role_per(){
    console.log("permission.ROLE_ID==>",this.permission.ROLE_ID);
    console.log("this.rolePermissionList==>",this.rolePermissionList);
    this.selectedList=[];
    this.rolePermissionList.filter(val =>{
      let value:any=val;  
      if(value.ROLE_ID === this.permission.ROLE_ID){
        console.log(value.PERMISSION_ID);  
        this.selectedList.push(value.PERMISSION_ID);
        return value.PERMISSION_ID;
        }
    });
  this.permission.PERMISSION_arr=this.selectedList;
      console.log("this.selectedList===>",this.selectedList);
  }

  getLoding(){
    this.apiService.getAllUsers().subscribe(
      (data) => {
        console.log("data==>",data);
        this.data=data;
      })
  }

  add(){
    this.user={};
    this.user.USER_ID=null;
  }
  edit(data){
    console.log("edit data==>",data);
    this.user=data;
  }

  update(user,e){
    console.log("data update==>",user);
 
    this.user=user;
    this.save(e);

  }


  save(e){
    this.user.USER_STATUS=true;
    if(!this.user.USER_NAME || !this.user.USER_PWD || !this.user.USER_FIRST_NAME || !this.user.USER_LAST_NAME || !this.user.ROLE_ID)
   {
    this.toastr.errorToastr('please Fill All fields', 'Oops!',{ position: 'top-center' });
    return false;
   } 
    console.log("save");
    console.log("this.user==>",this.user);
    this.apiService.register(this.user).subscribe(
      data => {
        this.closeMyModal(e);
        this.getLoding();
        this.result=data;
        console.log("msg==>",this.result.message);
        this.toastr.successToastr(this.result.message, 'Success!',{ position: 'top-center' });
      })

  }
  permission_save(e){
    //console.log("pppppppp==>",this.permission.PERMISSION_arr);
    if(!this.permission.PERMISSION_arr && !this.permission.ROLE_ID){
      
      this.toastr.errorToastr('please Fill All fields', 'Oops!',{ position: 'top-center' });      
      return false;
    }


    console.log("permissions===>",this.permission);
    this.apiService.createRolePermission(this.permission).subscribe(
      data => {
        this.closeMyModal(e);
        this.result=data;
        console.log("msg==>",this.result.message);
        this.toastr.successToastr(this.result.message, 'Success!',{ position: 'top-center' });
      })
  }

  onChange(data) {
    this.user={};
    this.user=data;

    swal({
      title: 'Are you sure?',
      //text: 'You wont be able to revert',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      if (result.value) {
        
    this.apiService.register(this.user).subscribe(
      data => {
      
        this.getLoding();
        this.result=data;
        console.log("msg==>",this.result.message);
        this.toastr.successToastr(this.result.message, 'Success!',{ position: 'top-center' });
      })
      }else{        
        this.user.USER_STATUS=this.user.USER_STATUS == true ? false:true;
      }      
    });
}

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  openMyModalData(event) {
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }



}
