import { Link } from './../../shared/models/IGetLinks';
import { Component, OnInit ,  AfterViewInit , ViewChildren , ElementRef } from '@angular/core';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit  {
 

  public readonly links: Link[] = [
    { name: 'Users', path: 'users' },
    { name: 'Movies', path: 'movies'},
    { name: 'Categories', path: 'categories'},
    { name: 'Actors', path: 'actors'}
  ];

  constructor(){}

  ngOnInit(): void {
        
  }

}
