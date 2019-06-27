import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public menu: boolean = false;
  public homeIcon: boolean = true;
  public dirIcon: boolean = true;
  public logIcon: boolean = true;
  public userIcon: boolean = true;
  public menuIcon: boolean = true;
  public calIcon: boolean = true;
  public newIcon: boolean = true;
  constructor() { }

  ngOnInit() {
    var loged = JSON.parse(localStorage.getItem('login'))
    if (loged == null ){
      this.userIcon = false;
      this.calIcon = false;
      this.newIcon = false;
    } else {
      this.logIcon = false;
      this.homeIcon = false;
    }
  }

  menuResponsive() {
    window.innerWidth;
  }

  async toggleMenu(){
    await $("#menu").toggleClass('opened')
    $("#close").toggle()
  }

  

}
