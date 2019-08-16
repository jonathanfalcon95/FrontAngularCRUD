import { Component, OnInit,TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { GlobalService } from "../providers/global.service";

@Component({
    selector: 'software-cmp',
    moduleId: module.id,
    templateUrl: 'software.component.html'
    
})

export class SoftwareComponent implements OnInit{
    ngOnInit(){
        this.getSoftwares();
    }


  
    softwareList: any;
    bsModalRef: BsModalRef;
    software: any;
    titleModal: string="";
    save: boolean=false;
    edit: boolean=false;
    constructor(private globalService: GlobalService, private bsModalService: BsModalService) {
       this.software=[];
       
    }
    OpenSoftwareModal(template: TemplateRef<any>, option, index:number) {
      this.software=[]
      if(option==="save"){
        this.titleModal='Create Software';
        this.save=true;
      }else
      if(option==="edit"){
        this.titleModal='Edit Software';
        this.edit=true;
        console.log(this.softwareList[index])
        this.software=this.softwareList[index];
        console.log(this.software);
      }else
      if(option==='delete'){
        this.software=this.softwareList[index];

      }
      this.bsModalRef = this.bsModalService.show(template);
      
    }

    getSoftwares() {
        this.globalService.getModel("/software").then(
            result => {
              console.log(result);
              this.softwareList = result;
            },
            err => {
              console.log(err);
              //this.loader.dismiss();
            }
          );
    }
    
    
  
    deleteSoftware() {
      this.globalService.removeModel(this.software.id,"/software").then(
        result => {
          console.log(result);
          this.getSoftwares();
        },
        err => {
          console.log(err);
          
          //this.loader.dismiss();
        }
      );
      
      this.onClose()
    }
  
    editSoftware() {
      console.log(this.software)
      
      let postSoftware = {
        'id': this.software.id,
        'softwareName': this.software.softwareName,
        
      };
  
      this.globalService.updateModel(this.software.id,postSoftware, "/software").then(
        result => {
          console.log(result);
          this.getSoftwares();
        },
        err => {
          console.log(err);
          //this.loader.dismiss();
        }
      );
     
      this.onClose()
    }


    saveSoftware() {
      console.log(this.software)
      
      let postSoftware = {
        'softwareName': this.software.softwareName,
        
       
      };
  
      this.globalService.addModel(postSoftware, "/software").then(
        result => {
          console.log(result);
          this.getSoftwares();
        },
        err => {
          console.log(err);
          //this.loader.dismiss();
        }
      );
     
      this.onClose();
    }
  
    onClose() {
      this.edit=false;
      this.save=false;
      this.bsModalRef.hide();
    }
  
    
}
