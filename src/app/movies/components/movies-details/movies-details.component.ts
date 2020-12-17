import { IGetCategories } from './../../../shared/models/IGetCategories';
import { MappingObjToArr } from './../../../shared/helper/mappingObjToArr';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Routes } from '@angular/router';
import { IGetMovies } from './../../../shared/models/IGetMovies';
import { MoviesService } from './../../../shared/services/movies/movies.service';
import { Component, OnInit , AfterViewInit } from '@angular/core';
import { concat } from 'rxjs';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.css']
})
export class MoviesDetailsComponent implements OnInit  {

  public movie: IGetMovies;
  private error: string;
  public urlImg: string;  
  public imgUrl: string;
  
  private  mappingCat: MappingObjToArr;
  private  mappingTehno: MappingObjToArr;
  private  mappingActors: MappingObjToArr;
  private  mappingPrices: MappingObjToArr;
  public categories: any[] = [];
  public tehnologies: any[] = [];
  public actors: any[] = [];
  public prices: any[] = [];

  constructor( private readonly moviesService: MoviesService,
    private readonly route: ActivatedRoute,
    private readonly titleService: Title
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Cinepal | Movie details");
    setTimeout(() => {
      const id = +this.route.snapshot.params['detail'];  
      this.imgUrl = this.moviesService.urlImg
      this.moviesService.getMovieDetail(id).subscribe( data => {
        this.movie = data;  
        this.urlImg = this.imgUrl + "" + this.movie.img['link']
           this.mappingCat = new MappingObjToArr(this.movie.categories);
          this.categories = this.mappingCat.MapingObj();
          this.mappingTehno = new MappingObjToArr(this.movie.tehnologies);
          this.tehnologies = this.mappingTehno.MapingObj();
          this.mappingActors = new MappingObjToArr(this.movie.actors);
          this.actors = this.mappingActors.MapingObj();
          this.mappingPrices = new MappingObjToArr(this.movie.price);
          this.prices = this.mappingPrices.MapingObj();
       
       

        console.log(this.movie)                 
       }, error => {
        this.error = error.message;
  
       })
    })
         
   /* const obj = {5.0: 10, 28.0: 14, 3.0: 6};

    const mapped = Object.keys(obj).map(key => ({type: key, value: obj[key]}));
    
    console.log(mapped);*/

  }
/*
  MapingObj(obj: Object){
    const mapped = Object.keys(obj).map(key => ({type: key, value: obj[key]}));
     return mapped;     
  }*/

   /* getDetailsCat(cat){
    const mappingCat = new MappingObjToArr(cat);
   const categories = mappingCat.MapingObj();
  return categories
  }*/

}
