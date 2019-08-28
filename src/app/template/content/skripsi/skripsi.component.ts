import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/api/service.service';
import { dataprofile } from 'src/app/const/setting';
import { Skripsi } from 'src/app/skripsi.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skripsi',
  templateUrl: './skripsi.component.html',
  styleUrls: ['./skripsi.component.scss']
})
export class SkripsiComponent implements OnInit {

  closeResult: string;
  listdata : any = [];
  fg : FormGroup;
  id:number = 0;
  level : number = 0;
  type:string = "save";
  dataprofile : any = dataprofile;
  itemdata : Skripsi;
  constructor(private modalService: NgbModal,private fb:FormBuilder,private api:ServiceService,private router:Router) {
    this.fg = this.fb.group({
      "judul":[null,[Validators.required,Validators.minLength(5)]],
      "deskripsi":"",
      "status":["ready",Validators.required]
    })
    var data = JSON.parse(localStorage.getItem('data'));
    this.dataprofile = data;
  }

  open(content,type,item) {
    console.log(item,type)
    this.type = type;

    if (type == "edit") {
      this.id = item.id_skripsi;
      this.fg = this.fb.group({
        "judul":[item.judul_skripsi,[Validators.required,Validators.minLength(5)]],
        "deskripsi":item.deskripsi,
        "status":[item.status,Validators.required]
      })
    }

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size:"xl"}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  ngOnInit() {
    this.getdata();
    this.getdetailsession();
  }
  getdetailsession(){
    var data = JSON.parse(localStorage.getItem("data"));
    if (data.d.level !== 1) {
      this.router.navigate(["/topik"]);
    }else{
      this.level = data.d.level;
    }
  }
  getdata(){
    this.api.getdataskripsibydosen(this.dataprofile.id).subscribe((result) => {
      if (result) {
        this.listdata = result.data;
      }else{
        this.listdata = [];
      }
    })
  }
  generatepublish(item,type){
    if (type == "class") {
      if (item == "ready") {
        return "text-success";
      }else{
        return "text-warning";
      }
    }else{
      if (item == "not_ready") {
        return "Belum Dipublis";
      }else{
        return "Published";
      }
    }
  }
  submitForm(value){
    if (this.type == "save") {
      this.api.addnewskripsi(value,this.dataprofile.id).subscribe((result)=> {
        if (result.status) {
          this.getdata();
        }
      })      
    }else{
      this.api.updateskripsi(value,this.dataprofile.id,this.id).subscribe((result)=> {
        if (result.status) {
          this.getdata();
        }
      })
    }
  }


  deleteskripsi(id){
    this.api.deleteskripsi(id).subscribe((result) => {
      if (result.status) {
        this.getdata();
      }
    })
  }
}
