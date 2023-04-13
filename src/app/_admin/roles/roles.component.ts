import {Component, Input, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {ApiService} from '../../_services'
  import { ToastrManager } from 'ng6-toastr-notifications'

@Component({
  selector: 'app-roles-contact',
  templateUrl: './roles.component.html',
  styleUrls: [
    './roles.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss'
  ]
})



export class RolesComponent implements OnInit {
  public data: any;
  public rowsOnPage = 5;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';


  public role:any={};
  public result:any={};
  
  

  @Input('modalDefault') modalDefault: any;

  constructor(public http: Http,public apiService:ApiService,public toastr: ToastrManager) { }

  ngOnInit() {
    this.role.ROLE_ID=null;
      this.apiService.getAllRoles().subscribe(
        (data) => {
          console.log("data==>",data);
          this.data=data;
        })
  }

  getRoles(){
    this.apiService.getAllRoles().subscribe(
      (data) => {
        //console.log("data==>",data);
        this.data=data;
      })
  }

  add(){
    this.role={};
    this.role.ROLE_ID=null;
  }

  update(role,e){

    console.log("data update==>",role);    
    this.role=role;
    this.save(e);
  }
  onChange(data,e) {
    this.role={};
    this.role=data;
    this.role.ROLE_STATUS=e.checked;
    this.apiService.createPermission(this.role).subscribe(
      data => {
        this.closeMyModal(e);
        this.getRoles();
        this.result=data;
        console.log("msg==>",this.result.message);
        this.toastr.successToastr(this.result.message, 'Success!');
      })

}

  save(e){

    if(!this.role.ROLE_NAME || !this.role.ROLE_DESC )
   {
    this.toastr.errorToastr('please Fill All fields', 'Oops!',{ position: 'top-center' });
    return false;
   } 

    console.log("save");
    console.log("this.user==>",this.role);
    this.role.ROLE_STATUS=true;
    this.apiService.createRole(this.role).subscribe(
      data => {
        this.closeMyModal(e);
        this.getRoles();
        this.result=data;
        console.log("msg==>",this.result.message);
        this.toastr.successToastr(this.result.message, 'Success!');
      })
    }

  edit(data){
    console.log("edit data==>",data);
    this.role=data;
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
