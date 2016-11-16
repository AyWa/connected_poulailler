import { Injectable , Inject} from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ProfilService } from '../service_utilisateurs/profil.service';
// Statics

@Injectable()
export class UserService {
  private loggedIn = false;
  constructor(private http: Http,private profilService: ProfilService) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }
  signin(newUser){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(newUser);
    return this.http
      .post('/signin',JSON.stringify({newUser}),{ headers })
      .map(res => res.json())
      .map((res) =>{
        if (res.success){
          console.log(res.msg);
        }
        return res.success
      });
  }
  login(login) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(
        '/authenticate',
        JSON.stringify({ login }),
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          console.log(res);
          localStorage.setItem('auth_token', res.token);
          this.loggedIn = true;
          this.profilService.reloadProfile();
        }

        return res.success;
      });
  }
  loginFacebook(token){
    localStorage.setItem('auth_token', token);
    this.loggedIn = true;
    this.profilService.reloadProfile();
  }
  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this.profilService.reloadProfile();
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
