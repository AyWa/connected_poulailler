import { Injectable } from '@angular/core';
import { HttpClient } from '../service_login/http-client.service';
import { Http, Headers } from '@angular/http';

@Injectable()
export class PouleService {
  timing_ouverture: any;
  timing_fermeture: any;
  constructor(private httpClient: HttpClient,private http: Http) {

  }
  saveTiming(tmpOuverture,tmpFermeture){
    console.log(tmpOuverture);
    console.log(tmpFermeture);

  }
  getTimingOuverture(){
    this.timing_ouverture={hour: 7, minute: 30};
    return this.timing_ouverture;
  }
  getTimingFermeture(){
    this.timing_fermeture={hour: 19, minute: 30};
    return this.timing_fermeture;
  }
  getTiming(){
    this.httpClient
      .get('/timing')
      .map(res=>res.json())
      .map((res) => {
        return res;
      }).subscribe((data)=>{
        this.timing_ouverture=data.timing_ouverture;
        this.timing_fermeture=data.timing_fermeture;
      },(error)=>{
        console.log('mes errors'+error);
      })
  }
}
