import { Component, OnInit } from '@angular/core';
import { poule,PouleService } from './poule.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private my_poule : poule;
  private waiting:boolean;
  constructor(private pouleService:PouleService) {
      this.waiting=false;
      //this.actionDoor = this.actionDoor.bind(this);
  }

  ngOnInit() {
    this.my_poule=this.pouleService.getPoule();
  }
  onSave(){
    this.pouleService.savePoule();
  }
  actionDoor(){
    if(this.waiting) return;
    else{
      this.waiting=true;
      this.pouleService.controlDoor(this.my_poule.porte_ouverte);
      setTimeout(()=> { this.waiting=false;}, 8000);
    }
  }
}
