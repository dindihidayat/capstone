import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/api/service.service';
import { Router } from '@angular/router';
import { SockService } from 'src/app/api/Sock.service';
import { Skripsi } from 'src/app/skripsi.model';
import { dataprofile } from 'src/app/const/setting';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private api : ServiceService,private route:Router) { }
  name : any = "";
  statustime : boolean = true;
  data : any = [];
  dataprofile : any = dataprofile
  dataskripsi : Skripsi[];
  settingtime : string = "";
  ngOnInit() {
    this.getdataskripsi();
    this.api.getPolicies().subscribe(data => {
      this.dataskripsi = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Skripsi;
      })
    });
    var data = JSON.parse(localStorage.getItem("data"));
    this.dataprofile = data;
    this.getsetting();
  }
  getsetting(){
    this.api.getsetting().subscribe((result) => {
      if(result.status){
        this.settingtime = result.data.tanggaljammulai;
      }
    })
  }
  create(skripsi: Skripsi){
    var d = skripsi;
    var istrue = false;
    for(var key in this.dataskripsi){
      var k = this.dataskripsi[key];
      // console.log(k.owner,this.dataprofile.group);
      if (k.owner !== null && k.owner == this.dataprofile.group) {
        Swal.fire('Info', 'Anda Sudah Memilih Judul Skripsi "'+k.judul_skripsi+'"', 'info')
        istrue = true;
        break;
      }
    }
    // return false;
    if (!istrue) {
      Object.assign(d,{owner:this.dataprofile.group,username:this.dataprofile.username +"("+this.dataprofile.nama_group+")"});
      this.api.updateOwner({owner:this.dataprofile.group,id_skripsi:d.id_skripsi}).subscribe((result) => {
        if (result.status) {
          this.api.updatePolicy(d);  
        }else{
          Swal.fire('Oops', 'Terjadi Kesalahan Pada saat menyimpan data', 'error');
        }
      })
    }
  }
  addscripsiintofirebase(skripsi : Skripsi){
    var d = skripsi;
    Object.assign(d,{owner:null,username:null});
    this.api.createPolicy(skripsi);
  }
  getMyStyles(status,owner){
    if(status || owner !== null || owner || this.dataprofile.type_in_group == 'anggota'){
      let item = {
        'cursor':'not-allowed'
      }
      return item;
    }else{
      let item = {
        'cursor':'pointer'
      }
      return item  
    }
  }
  getMyStylesclass(status,owner){
    if(status || owner !== null || owner || this.dataprofile.type_in_group == 'anggota'){
      return "btn-danger";
    }else{
      return "btn-info"  
    }
  }
  getdataskripsi() {
    this.api.getlistjudulskripsi().subscribe((result) => {
      if (result.status) {
        this.data = result.data;
      }else{
        this.data = [];
      }
    })
  }
  generatedeskripsi(deskripsi){
    return deskripsi.substring(0,50) + "...";
  }
  onFinished(){
    this.statustime = false;
  }
}
