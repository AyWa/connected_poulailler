import { Injectable } from '@angular/core';
import { HttpClient } from '../service_login/http-client.service';
import { Http, Headers } from '@angular/http';

export class user_profile {
  firstName : string;
  lastName: string;
  city?: string;
  phone?: string;
  birthDay?: string;
  gender: string;
  age?: string;
  image?: string;
}
@Injectable()
export class ProfilService {
  
  my_user: user_profile;
  constructor(private httpClient: HttpClient,private http: Http){
    this.my_user=new user_profile();
    this.reloadProfile();
  }
  handleSomething() {
    console.log('handle something execute');
    return this.httpClient
    .get('/memberinfo')
    .map(res => res.json())
    .map((res) => {
      //console.log(res);
      return res;
    });
  }
  getProfile(){
      return this.my_user;
  }
  reloadProfile(){
    this.httpClient
      .get('/privateprofile')
      .map(res=>res.json())
      .map((res) => {
        return res;
      }).subscribe((data)=>{
          console.log(data);
          this.build_profile(data.user);
          //console.log(this.my_user)
      },(error)=>{
        console.log('mes errors'+error);
        this.reset_profile();
      })
  }
  build_profile(user){
    this.my_user.firstName=user.firstName;
    this.my_user.lastName=user.lastName;
    this.my_user.city=user.city;
    this.my_user.phone=user.phone;
    this.my_user.birthDay=user.birthDay;
    this.my_user.gender=user.gender;
    this.my_user.age=user.age;
    this.my_user.image=user.image;
  }
  reset_profile(){
    this.my_user.firstName='';
    this.my_user.lastName='';
    this.my_user.city='';
    this.my_user.phone='';
    this.my_user.birthDay='';
    this.my_user.gender='';
    this.my_user.age='';
    this.my_user.image='';
  }
  edit_profile(new_user_profile){
    this.httpClient
      .post('/editprofile',JSON.stringify({ new_user_profile }))
      .map(res=>res.json())
      .map((res)=>{
        return res;
      }).subscribe((data)=>{
        console.log(data);
        if(data.success==true){
          this.build_profile(data.user_updated.profile);
        }
      },(error)=>{
        console.log('mes errors'+error);
      })
      return true;
  }
}
