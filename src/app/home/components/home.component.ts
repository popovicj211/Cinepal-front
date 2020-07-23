
import { IGetMovies } from './../../shared/models/IGetMovies';
import { MoviesService } from './../../shared/services/movies/movies.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { error } from 'protractor';
import { HttpErrorResponse } from "@angular/common/http";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public arrCategory: any[] = [];
  public  objCat = { "id" : 2,  "name" : 2 }
  public newMovies: IGetMovies[];
     public error: string = '';
public imgUrl: string;

public showSlider: boolean;

  constructor(private readonly moviesService: MoviesService, private readonly route: ActivatedRoute,   private readonly titleService: Title , private readonly router: Router) { }

  ngOnInit(): void {
    console.log(this.router.url)
    if(this.router.url == '/'){
       this.showSlider = true
    }else{
      this.showSlider = false
    }
  
    this.titleService.setTitle("Cinepal | Home");
    this.moviesService.getNewMovies().subscribe( data => {
                                           
      console.log(data)
      setTimeout(() => {
      this.newMovies = data;
      }, 2500);  
          data.forEach(element => {
                 console.log(element.categories)
          
       });       
     }, (error: HttpErrorResponse) => {
             this.error = error.status + " " + error.statusText;
             if(error.status == 404){
              this.error = "No movies" 
             }
     })
  //  console.log(this.arrCategory)
  console.log(this.newMovies)
       this.imgUrl = this.moviesService.urlImg; 
  }

}
