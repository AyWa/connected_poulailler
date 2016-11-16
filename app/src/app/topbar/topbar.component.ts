import { Component, OnInit } from '@angular/core';
import { UserService } from '../service_login/user.service';
import { user_profile, ProfilService } from '../service_utilisateurs/profil.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  private isCollapsed = true;
  private my_user : user_profile;
  constructor(private userService: UserService,private profilService: ProfilService) {}
  
  ngOnInit() {
    this.my_user=this.profilService.getProfile();
  }

}
