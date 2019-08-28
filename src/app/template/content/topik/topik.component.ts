import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/api/service.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-topik',
  templateUrl: './topik.component.html',
  styleUrls: ['./topik.component.scss']
})
export class TopikComponent implements OnInit {
  level : number = 1;
  closeResult: string;
  fg : FormGroup;
  numrows : number = 0;
  listdata:any = [];
  constructor(private modalService: NgbModal,private fb:FormBuilder,private api:ServiceService) { 
    this.fg = this.fb.group({
      "judul":[null,[Validators.required,Validators.minLength(5)]],
      "deskripsi":"",
      "status":["ready",Validators.required]
    })
  }

  ngOnInit() {
    this.getlisttopik();
  }

  open(content) {
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

  getlisttopik(){
    this.api.getlisttopik().subscribe((result) => {
      if (result.status) {
        this.listdata = result.data;
        this.numrows = result.numrows;
      }
    })
  }
  submitForm(value) {
    console.log(value);
  }

  download(id)
  {
    window.location.href = "http://167.205.108.134/inv/upload/file/"+id;
  }

  exportPdf(param) {
    this.api.export(param).subscribe(data => saveAs(data, `pdf report.pdf`));
  }
}
