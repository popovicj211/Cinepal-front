
import { error } from 'protractor';
import { IGetCategories } from './../../../shared/models/IGetCategories';
import { CategoriesService } from './../../../shared/services/categories/categories.service';
import { MoviesService } from './../../../shared/services/movies/movies.service';
import { IGetMovies } from './../../../shared/models/IGetMovies';
import { Component, OnInit , Inject , AfterViewInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from "@angular/common/http";
import { RouterLinkActive } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { stringify } from 'querystring';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, AfterViewInit {

  public allMovies: IGetMovies[];
  public categories: IGetCategories[];
   public tehnologies: IGetCategories[];
   private subcat: number; 
   private id: number;
   public error: string = ''

    public imgUrl: string;
   public perPage: number = 5;
     public page: number
     public catPageId: number;
     
     public showSlider: boolean;
  constructor(
    private readonly moviesService: MoviesService,
     private readonly route: ActivatedRoute,
     private readonly router: Router,
     private readonly catService: CategoriesService,
     private readonly titleService: Title
     ) {}


     catFilter(catFilt: number , subids: number){

               this.id = catFilt;
               this.subcat = subids;
               console.log(this.id)
                console.log(this.subcat);
              this.moviesService.getMoviesCategory(this.subcat, this.id ).subscribe(data => {
                        console.log(data['movies'])
                        setTimeout(() => {
                              this.allMovies = data['movies'];
                              const pag = Math.ceil(data['count'] / this.perPage)
                              this.page = pag;

                        }, 1000);
              }, (error: HttpErrorResponse) => {
                   this.error = error.status + " " + error.statusText;
                   
              })
              
     } 

  ngOnInit(): void {
  /*  console.log(this.router.url)
    if(this.router.url == '/'){
       this.showSlider = true
    }else{
      this.showSlider = false
    }*/
     this.titleService.setTitle("Cinepal | Movies");
    this.imgUrl = this.moviesService.urlImg; 
    const id = +this.route.snapshot.params['page'];
     if(isNaN(id)){
      this.catPageId = 1;
     }else{
       this.catPageId = id;
     }
    // const id = 1;
    this.moviesService.getAllMovies(this.perPage ,id).subscribe( data => {
                     setTimeout(() => {
                      console.log(id)
                   this.allMovies = data['movies'];  
                    const pag = Math.ceil(data['count'] / this.perPage)  
                         console.log(pag)
                       this.page = pag;
                     }, 1500);
                          
    }, (error: HttpErrorResponse) => {
      this.error = error.status + " " + error.statusText;
       if(error.status == 404){
              this.error = "No movies" 
       }
      
     })

 
    this.catService.getCategories().subscribe( data => {
     // console.log(data)
                  setTimeout(() => {
                   this.categories = data;    
                  }, 1500);           
    }, (error: HttpErrorResponse) => {
      this.error = error.status + " " + error.statusText;
      
      })

    this.catService.getTehnologies().subscribe( data => {
    //  console.log(data)
                 setTimeout(() => {
                   this.tehnologies = data;     
                 }, 1500);          
    }, (error: HttpErrorResponse) => {
      this.error = error.error.status + " " + error.statusText;
      
    })


  }

 

   ngAfterViewInit(): void {

    const id = +this.route.snapshot.params['page'];
    if(isNaN(id)){
     this.catPageId = 1;
    }else{
      this.catPageId = id;
    }
   this.moviesService.getAllMovies(this.perPage ,this.catPageId).subscribe( data => {
                    setTimeout(() => {
                     console.log(id)
                  this.allMovies = data['movies'];  
                   const pag = Math.ceil(data['count'] / this.perPage)  
                        console.log(pag)
                      this.page = pag;
                    }, 1500);
                         
   }, (error: HttpErrorResponse) => {
     this.error = error.status + " " + error.statusText;
      if(error.status == 404){
             this.error = "No movies" 
      }
     
    })


   }

   counter(i: number) {
    return new Array(i);
    }


}
