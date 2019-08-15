import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { GlobalService } from '../../providers/global.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  moduleId: module.id,
  
})
export class AddUserComponent implements OnInit {


  user: any;


  constructor(private builder: FormBuilder, private globalService: GlobalService, private bsModalRef: BsModalRef) {
    this.user = [];
  }

  SaveUser() {
    console.log(this.user)

    let postUser = {
      'userName': this.user.userName,
      'Name': this.user.name,
      'lastName': this.user.lastName,
      'Age': this.user.age,
      'lastSessionDateTime': '2019-08-05T15:02:29.393'
    };

    this.globalService.addModel(postUser, "/users").then(
      result => {
        console.log(result);

      },
      err => {
        console.log(err);
        //this.loader.dismiss();
      }
    );
  }

  onClose() {
    this.bsModalRef.hide();
  }

  ngOnInit() {
  }

}