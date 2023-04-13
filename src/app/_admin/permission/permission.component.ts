import {Component, Input, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import { ToastrManager } from 'ng6-toastr-notifications'
import {ApiService} from '../../_services'
import { load } from '@angular/core/src/render3/instructions';
import swal from 'sweetalert2';
@Component({
  selector: 'app-permission-contact',
  templateUrl: './permission.component.html',
  styleUrls: [
    './permission.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss'
  ]
})



export class PermissionComponent implements OnInit {
  public data: any;
  public rowsOnPage = 5;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';


  public permissions:any={};
  public result:any={};
  public status:any=[];
  

  @Input('modalDefault') modalDefault: any;

  constructor(public http: Http,public apiService:ApiService,public toastr: ToastrManager) { }

  ngOnInit() {
    
    this.permissions.PERMISSION_ID=null;
      this.apiService.getAllPermission().subscribe(
        (data) => {
          console.log("data==>",data);
          this.data=data;
        })
  }



  getRoles(){
    this.apiService.getAllPermission().subscribe(
      (data) => {
        //console.log("data==>",data);
        this.data=data;
      })
  }

  add(){
    this.permissions={};
    this.permissions.PERMISSION_ID=null;
  }

  update(permissions,e){

    this.permissions=permissions;

    this.save(e);
  }

  edit(data){
    console.log("edit data==>",data);
   // this.toastrService.success('Hello world!', 'Toastr fun!');
    this.permissions=data;
  }

  save(e){

    if(!this.permissions.PERMISSION_NAME || !this.permissions.PERMISSION_DESC )
   {
    this.toastr.errorToastr('please Fill All fields', 'Oops!',{ position: 'top-center' });
    return false;
   } 

    console.log("save");
    console.log("this.user==>",this.permissions);
    this.permissions.PERMISSION_STATUS=true;
    this.apiService.createPermission(this.permissions).subscribe(
      data => {
        this.closeMyModal(e);
        this.getRoles();
        this.result=data;
        console.log("msg==>",this.result.message);
        this.toastr.successToastr(this.result.message, 'Success!',{ position: 'top-center' });
      })

  }

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  openMyModalData(event) {
    
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
  
  onChange(data) {
    this.permissions={};
    this.permissions=data;
    
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
    this.apiService.createPermission(this.permissions).subscribe(
      data => {        
        this.getRoles();
        console.log("data==>",data);
      })
    }else{        
      this.permissions.PERMISSION_STATUS=this.permissions.PERMISSION_STATUS == true ? false:true;
    }      
  });
}
}
