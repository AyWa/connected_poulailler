import { Injectable } from '@angular/core';
import { HttpClient } from '../../service_login/http-client.service';
import { Http, Headers } from '@angular/http';

export class friend {
  firstName : string;
  lastName: string;
  id: string;
  image?: string;
}
@Injectable()
export class FriendsService {
  constructor(private httpClient: HttpClient,private http: Http) { }
  getFriends(){
    return this.httpClient
      .get('/myfriends')
      .map(res=>res.json())
      .map((res)=>{
        return res;
      })
  }
}
