import { Subscription } from 'rxjs';
import { error } from 'protractor';
import { IGetCategories } from './../../../shared/models/IGetCategories';
import { CategoriesService } from './../../../shared/services/categories/categories.service';
import { MoviesService } from './../../../shared/services/movies/movies.service';
import { IGetMovies } from './../../../shared/models/IGetMovies';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
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
export class MoviesComponent implements OnInit , OnDestroy {
  private subscriptions: Array<Subscription> = new Array<Subscription>();
  public allMovies: IGetMovies[];
  public categories: IGetCategories[];
   public tehnologies: IGetCategories[];
   private subcat: number; 
   private id: number;
   public error: string = ''

    public imgUrl: string;
   public perPage: number = 4;
     public page: number
     public catPageId: number = 1;
    

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
                        console.log(data['data'])
                        setTimeout(() => {
                              this.allMovies = data['data'];
                              const pag = Math.ceil(data['count'] / this.perPage)
                              this.page = pag;
                              console.log(this.page)
                        }, 1000);
              }, (error: HttpErrorResponse) => {
                   this.error = error.status + " " + error.statusText;
                   
              })
              
     } 



  ngOnInit(): void {

     this.titleService.setTitle("Cinepal | Movies");
    this.imgUrl = this.moviesService.urlImg; 
  
    this.subscriptions.push(
      this.moviesService.getAllMovies(this.perPage , this.catPageId).subscribe( data => {
        setTimeout(() => {
      this.allMovies = data['data'];  
      const pag = Math.ceil(data['count'] / this.perPage)  
            console.log(pag)
          this.page = pag;
        
        }, 500);
             
     }, (error: HttpErrorResponse) => {
             this.error = error.status + " " + error.statusText;
          if(error.status == 404){
               this.error = "No movies" 
        }

     }),    this.catService.getCategories().subscribe( data => {
           setTimeout(() => {
               this.categories = data;    
          }, 500);           
     }, (error: HttpErrorResponse) => {
       this.error = error.status + " " + error.statusText;

    }),
     this.catService.getTehnologies().subscribe( data => {
         setTimeout(() => {
          this.tehnologies = data;     
         }, 500);          
     }, (error: HttpErrorResponse) => {
        this.error = error.error.status + " " + error.statusText;

     })
)


  }



   Paginate(page){
    this.catPageId = page;
    this.moviesService.getAllMovies(this.perPage , this.catPageId).subscribe( data => {
      setTimeout(() => {
    this.allMovies = data['data'];  
     const pag = Math.ceil(data['count'] / this.perPage)  
          console.log(this.allMovies)
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
    ngOnDestroy(): void {
      this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    }

}
