import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { UserModel } from './user.model';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  formValue !: FormGroup;
  userModelObject : UserModel = new UserModel();
  userData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formBuilder : FormBuilder, 
    private api : ApiService) { 
    }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: ['']
    })
    this.getAllUsers();
  }

  clickAddUser(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }


  postUserData(){
    this.userModelObject.firstName = this.formValue.value.firstName;
    this.userModelObject.lastName = this.formValue.value.lastName;
    this.userModelObject.email = this.formValue.value.email;
    this.userModelObject.password = this.formValue.value.password;

    this.api.postUser(this.userModelObject)
    .subscribe(res=>{
      console.log(res);
      alert("User is added Successufully")
      let ref = document.getElementById('close')
      ref?.click();
      this.formValue.reset();
      this.getAllUsers();
    },
    err=>{
      alert("Something went wrong");
    })
  }

  getAllUsers(){
    this.api.getUser()
    .subscribe(res=>{
        this.userData = res;
    })
  }

  deleteUser(row : any){
    this.api.deleteUser(row.id)
    .subscribe(res=>{
      alert("User is deleted!")
      this.getAllUsers();
    })
  }

  editUser(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.userModelObject.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName)
    this.formValue.controls['lastName'].setValue(row.lastName)
    this.formValue.controls['email'].setValue(row.email)
    this.formValue.controls['password'].setValue(row.password)
  }

  updateUser(){
    this.userModelObject.firstName = this.formValue.value.firstName;
    this.userModelObject.lastName = this.formValue.value.lastName;
    this.userModelObject.email = this.formValue.value.email;
    this.userModelObject.password = this.formValue.value.password;

    this.api.updateUser(this.userModelObject,this.userModelObject.id)
    .subscribe(res=>{
      alert("Updated successfully!")
      let ref = document.getElementById('close')
      ref?.click();
      this.formValue.reset();
      this.getAllUsers();
    })
  }
}
