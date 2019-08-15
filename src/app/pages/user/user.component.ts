import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { GlobalService } from "../providers/global.service";
import { EditUserComponent} from "./edit-user/edit-user.component"
import { AddUserComponent} from "./Add-user/Add-user.component"
import { DeleteUserComponent} from "./delete-user/delete-user.component"
@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
    
})

export class UserComponent implements OnInit{
    ngOnInit(){
        this.getUsers();
    }


    title = 'AngularCRUDExample';
    UserList: any;
    bsModalRef: BsModalRef;
  
    constructor(private globalService: GlobalService, private bsModalService: BsModalService) {
      
    }
  
    getUsers() {
        this.globalService.getModel("/users").then(
            result => {
              console.log(result);
             
              this.UserList = result;
             
      
            },
            err => {
              console.log(err);
              //this.loader.dismiss();
            }
          );
    }
  
    addNewUser() {
      this.bsModalRef = this.bsModalService.show(AddUserComponent);
      this.bsModalRef.content.event.subscribe(result => {
        if (result == 'OK') {
          this.getUsers();
        }
      });
    }
  
    deleteUser(UserId: number, title: string) {
    //   this.bsModalRef = this.bsModalService.show(DeleteUserComponent);
    //   this.bsModalRef.content.UserId = UserId;
    //   this.bsModalRef.content.title = title;
    //   this.bsModalRef.content.event.subscribe(result => {
    //     console.log("deleted", result);
    //     if (result == 'OK') {
    //       setTimeout(() => {
    //         this.UserList=[];
    //         this.getUsers();
    //       }, 5000);
    //     }
    //   });
    }
  
    editUser(UserId: number) {
    //   this.globalService.changeUserId(UserId);
  
    //   this.bsModalRef = this.bsModalService.show(EditUserComponent);
    //   this.bsModalRef.content.event.subscribe(result => {
    //     if (result == 'OK') {
    //       setTimeout(() => {
    //         this.getUsers();
    //       }, 5000);
    //     }
    //   });
    }
}
