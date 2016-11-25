import { Injectable } from '@angular/core';
import { HttpClient } from '../service_login/http-client.service';
import { Http, Headers } from '@angular/http';

export class poule {
  nombre_poules: number;
  nombre_inside: number;
  porte_ouverte: boolean;
  time_ouverture:{
    hour:number;
    minute:number;
  };
  time_fermeture:{
    hour:number;
    minute:number;
  };
}

@Injectable()
export class PouleService {
  my_poule:poule;
  constructor(private httpClient: HttpClient,private http: Http) {
    this.my_poule=new poule();
    this.getPouleInit();
  }
  savePoule(){
    console.log(this.my_poule);
    this.httpClient
      .post('/poulesave',JSON.stringify({ my_poule:this.my_poule }))
      .map(res=>res.json())
      .map((res)=>{
        return res;
      }).subscribe((data)=>{
        console.log(data);
        alert("Saved");
      },(error)=>{
        alert('probleme');
      })
      return true;
  }
  getPoule(){
    return this.my_poule;
  }
  getPouleRefresh(){
    this.httpClient
      .get('/poule')
      .map(res=>res.json())
      .map((res) => {
        return res;
      }).subscribe((data)=>{
        console.log(data);
        this.my_poule.nombre_poules=data.poule.nombre_poules;
        this.my_poule.nombre_inside=data.poule.nombre_inside;
        this.my_poule.porte_ouverte=data.poule.porte_ouverte;
        this.my_poule.time_ouverture=data.poule.time_ouverture;
        this.my_poule.time_fermeture=data.poule.time_fermeture;
      },(error)=>{
        alert('probleme');
      })
  }
  getPouleInit(){
    this.httpClient
      .get('/poule')
      .map(res=>res.json())
      .map((res) => {
        return res;
      }).subscribe((data)=>{
        console.log(data);
        this.my_poule.nombre_poules=data.poule.nombre_poules;
        this.my_poule.nombre_inside=data.poule.nombre_inside;
        this.my_poule.porte_ouverte=data.poule.porte_ouverte;
        this.my_poule.time_ouverture=data.poule.time_ouverture;
        this.my_poule.time_fermeture=data.poule.time_fermeture;
        console.log(this.my_poule);
      },(error)=>{
        alert('probleme');
      })
  }
  controlDoor(action){
    this.httpClient
      .post('/controldoor',JSON.stringify({ door:!this.my_poule.porte_ouverte }))
      .map(res=>res.json())
      .map((res)=>{
        return res;
      }).subscribe((data)=>{
        this.my_poule.porte_ouverte=data.door;
      },(error)=>{
        alert('probleme');
      })
  }
  changeNbrPoule(action){
    this.httpClient
      .post('/changepoule',JSON.stringify({ increment:action }))
      .map(res=>res.json())
      .map((res)=>{
        return res;
      }).subscribe((data)=>{
        this.my_poule.nombre_poules=data.nombre_poules;
      },(error)=>{
        alert('probleme');
      })
  }

}
