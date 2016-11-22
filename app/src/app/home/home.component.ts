import { Component, OnInit } from '@angular/core';
import { poule,PouleService } from './poule.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private my_poule : poule;
  constructor(private pouleService:PouleService) { }

  ngOnInit() {
    this.my_poule=this.pouleService.getPoule();
  }
  onSave(){
    this.pouleService.savePoule();
  }
}
function spacify(a){
    a.map((q) =>{
       return q + ' ';
    });
}
