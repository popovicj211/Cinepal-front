import { Link } from './../../../../../shared/models/IGetLinks';
import { Component, OnInit } from '@angular/core';
import { transition, animate, state, style, trigger } from '@angular/animations';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  animations :[
    trigger('imgover', [
      state('initial', style({
      /*  opacity: 1,
        width: 150*/
        marginLeft: 0
      })),
      state('final', style({
       /* opacity: 0.7,
        width: 160*/
        marginLeft: 50
      })),
      transition('initial=>final', animate('1500ms')),
      transition('final=>initial', animate('1000ms'))
    ]) 
  ]
})
export class FooterComponent implements OnInit {
public year:number;


  public readonly links: Link[] = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/movies'},
    { name: 'Contact', path: '/contact'},
    { name: 'Admin', path: '/admin'}
  ];

  constructor() { }

  public currentState = 'initial';

  changeState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }

  ngOnInit(): void {
    const date = new Date();
    this.year = date.getFullYear();

  }

}
