import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { setting } from '../const/setting';
import { AngularFirestore } from '@angular/fire/firestore';
import { Skripsi } from 'src/app/skripsi.model';
const httpHeaders = new HttpHeaders ({
  'Content-Type': 'application/json',
});

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  private url = setting.url;

  constructor(private http : HttpClient,private firestore: AngularFirestore) { }

  getlistjudulskripsi() : Observable<any>{

    return this.http.get(this.url + "",{headers:httpHeaders});
  
  }

  login(data) : Observable<any>{
    return this.http.post(this.url + "authldap",data);
  }


  getPolicies() {
    return this.firestore.collection('skripsi').snapshotChanges();
  }
  getp(){
    return this.firestore.doc('skripsi/8fQ7wa0Mrktga9rV2Vr4').collection('skripsi/8fQ7wa0Mrktga9rV2Vr4');
  }
  createPolicy(skripsi: Skripsi){
    return this.firestore.collection('skripsi').add(skripsi);
  }
  updatePolicy(skripsi: Skripsi){
    this.firestore.doc('skripsi/' + skripsi.id).update(skripsi).catch(error => console.log(error));;
  }
  updateOwner(data) : Observable<any>{
    return this.http.put(this.url + "updateownerskripsi",JSON.stringify(data),{headers:httpHeaders});
  }
  getdataskripsibydosen(id) : Observable<any>{
    return this.http.get(this.url+"getlistskripsibydosen?publiser="+id,{headers:httpHeaders});
  }
  addnewskripsi(datas,publiser) : Observable<any>{
    var data = Object.assign(datas,{publiser:publiser});
    return this.http.post(this.url + "addskripsi",JSON.stringify(data),{headers:httpHeaders});
  }
  updateskripsi(datas,publiser,id) : Observable<any>{
    var data = Object.assign(datas,{publiser:publiser},{id_skripsi:id});
    console.log(data);
    return this.http.post(this.url + "updateskripsi",JSON.stringify(data),{headers:httpHeaders});
  }

  deleteskripsi(id) : Observable<any>{
    return this.http.post(this.url + "deleteskripsi",JSON.stringify({id_skirpsi:id}),{headers:httpHeaders});
  }

  getsetting() : Observable<any>{
    return this.http.get(this.url + "setting",{headers:httpHeaders});
  }

  getlisttopik(nama = "") : Observable<any>{
    return this.http.get(this.url + "getlisttopik?nama="+nama,{headers:httpHeaders});
  }


  export(param) {
    return this.http.get("http://capstone.stei.itb.ac.id/assets/file/"+param, 
        {responseType: 'blob',headers:httpHeaders});
  }
}
