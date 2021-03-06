import { Link } from './../../../../../shared/models/IGetLinks';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 import{ trigger, transition , animate , style , state   } from '@angular/animations';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations:[
 
               trigger('ddmenuover' , [
                        state('initial' , style({
                                opacity: 0,
                        })),
                        state('final' , style({
                                opacity: 1
                        })),
                 transition('initial=>final' , animate('2000ms')),
                 transition('final=>initial' , animate('1000ms'))
               ]) ,  

               trigger('ddmenuout' , [
                state('initial' , style({
                        opacity: 1,
                })),
                state('final' , style({
                        opacity: 0
                })),
         transition('initial=>final' , animate('2000ms')),
         transition('final=>initial' , animate('1000ms'))
       ])   

  ]
})
export class HeaderComponent implements OnInit {
        public showSlider: boolean;
        public auth: boolean;

  public readonly links: Link[] = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/movies'},
    { name: 'Contact', path: '/contact'},
    { name: 'Admin', path: '/admin'}
  ];


 currentState = 'initial'
 submenu = false
  changeState() {
        this.currentState = this.currentState === 'initial' ? 'final' : 'initial'
        if(this.currentState == 'final'){
                this.submenu = true;
        }
  }

  state: boolean = false
  overDropdown($tf) {
       this.state = $tf 
}

   

  constructor(private router: Router) { }

  Logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/auth/signin']);
      }
    

  ngOnInit(): void {
       if(this.router.url == '/'){
        this.showSlider = true
     }else{
       this.showSlider = false
     }

      if(JSON.parse(localStorage.getItem('user')) == null){
                  this.auth = true 
      }else{
                 this.auth = false
      }

     
  }

}
