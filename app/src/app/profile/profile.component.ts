import { Component, OnInit } from '@angular/core';
import { user_profile, ProfilService } from '../service_utilisateurs/profil.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FriendsService,friend } from './service_friends/friends.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  closeResult: string;
  private my_user : user_profile;
  private my_friends: friend[];
  constructor(private modalService: NgbModal, private profilService: ProfilService,private friendsService:FriendsService) {}
  ngOnInit() {
    this.my_user=this.profilService.getProfile();
    this.friendsService.getFriends().subscribe(data =>{
      this.my_friends=data;
    });
  }
  open(content) {
    this.modalService.open(content).result.then((result) => {
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
}
