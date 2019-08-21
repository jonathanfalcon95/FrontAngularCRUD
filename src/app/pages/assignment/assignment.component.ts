import { Component, OnInit,TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { GlobalService } from "../providers/global.service";

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {


  ngOnInit(){
    this.getAss();
}


title = 'AngularCRUDExample';
UserList: any;
HardwareList: any;
SoftwareList: any;
AssList : any;
assignment:any;
bsModalRef: BsModalRef;
user: any;
titleModal: string="";
save: boolean=false;
edit: boolean=false;
constructor(private globalService: GlobalService, private bsModalService: BsModalService) {
   this.user=[];
   this.assignment=[];
   this.AssList=[];
}
OpenAssModal(template: TemplateRef<any>, option, index:number) {
  this.user=[];
  this.assignment=[];
  this.AssList=[];
  if(option==="save"){
    this.titleModal='Assignment';
    this.save=true;
  }else
  if(option==="edit"){
    this.titleModal='Assignment';
    this.save=true;
    console.log(this.UserList[index])
    this.user=this.UserList[index];
    this.assignment.UserID=this.user.id
    this.showAss();
    console.log(this.user);
  }else
  if(option==='delete'){
   
    this.assignment=this.AssList[index]
  }
  this.bsModalRef = this.bsModalService.show(template);
  
}

getAss() {
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


      this.globalService.getModel("/hardware").then(
        result => {
          console.log(result);
          this.HardwareList= result;
        },
        err => {
          console.log(err);
          //this.loader.dismiss();
        }
      );
      this.globalService.getModel("/software").then(
        result => {
          console.log(result);
          this.SoftwareList = result;
        },
        err => {
          console.log(err);
          //this.loader.dismiss();
        }
      );
}

showAss(){
console.log("done");
  this.globalService.getModel("/assignment/user/"+this.assignment.UserID).then(
    result => {
      console.log(result);
      this.AssList= result;
    },
    err => {
      console.log(err);
      //this.loader.dismiss();
    }
  );


}

deleteAss() {

  let postAss = {
    "userID": this.assignment.UserID,
    "softwareID": this.assignment.SoftwareID,
    "hardwareID": this.assignment.HardwareID,
   };

  this.globalService.addModel(postAss,"assignment/delete").then(
    result => {
      console.log(result);
      this.getAss();
    },
    err => {
      console.log(err);
      
      //this.loader.dismiss();
    }
  );
  
  this.onClose()
}

editAss(index) {
  console.log(this.user)
  
  let postUser = {
    'id': this.user.id,
    'userName': this.user.userName,
    'Name': this.user.name,
    'lastName': this.user.lastName,
    'Age': this.user.age,
    'lastSessionDateTime': '2019-08-05T15:02:29.393'
  };

  this.globalService.updateModel(this.user.id,postUser, "/users").then(
    result => {
      console.log(result);
      this.getAss();
    },
    err => {
      console.log(err);
      //this.loader.dismiss();
    }
  );
 
  this.onClose()
}


saveAss() {
  console.log(this.assignment)
  
  let postAss = {
   "userID": this.assignment.UserID,
   "softwareID": this.assignment.SoftwareID,
   "hardwareID": this.assignment.HardwareID,
  };
console.log(postAss);

  this.globalService.addModel(postAss, "/assignment").then(
    result => {
      console.log(result);
      //this.getAss();
      this.showAss();
    },
    err => {
      console.log(err);
    }
  );
 this.assignment.SoftwareID=null;
 this.assignment.HardwareID=null;
 
}

onClose() {
  this.edit=false;
  this.save=false;
  this.bsModalRef.hide();
}


}
