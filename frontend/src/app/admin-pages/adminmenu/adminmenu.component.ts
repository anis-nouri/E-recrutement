import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminmenu',
  templateUrl: './adminmenu.component.html',
  styleUrls: ['./adminmenu.component.scss']
})
export class AdminmenuComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }
  public logout(){
    localStorage.clear();
    this.router.navigate(['/admin']);
  }

}
