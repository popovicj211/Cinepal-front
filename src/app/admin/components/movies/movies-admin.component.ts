import { MappingObjToArr } from './../../../shared/helper/mappingObjToArr';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup , FormControl, Validators , FormBuilder, FormArray , FormControlName } from '@angular/forms' 
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { ValidationMessage } from './../../../shared/helper/validation-message'
import { Observable, Subscription, merge, pipe , fromEvent } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { IGetActors } from 'src/app/shared/models/IGetActors';
import { IGetMovies } from './../../../shared/models/IGetMovies';
import { IGetCategories } from './../../../shared/models/IGetCategories';
import { CategoriesService } from './../../../shared/services/categories/categories.service';
import { MoviesService } from './../../../shared/services/movies/movies.service';
import { Link } from './../../../shared/models/IGetLinks';

@Component({
  selector: 'app-movies-admin',
  templateUrl: './movies-admin.component.html',
  styleUrls: ['./movies-admin.component.css']
})
export class MoviesAdminComponent implements OnInit , AfterViewInit , OnDestroy {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  


  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  private subscriptions: Array<Subscription> = new Array<Subscription>();

  public readonly years = [
    { id: 1 , year: 2020},
    { id: 2 , year: 2019},
    { id: 3 , year: 2018},
    { id: 4 , year: 2017},
    { id: 5 , year: 2016}
     ]

     public readonly actors: IGetActors[] = [
      { id: 1 , name: "Will Smith"},
      { id: 2 , name: "Will Smith"},
      { id: 3 , name: "Will Smith"},
      { id: 4 , name: "Will Smith"},
      { id: 5 , name: "Will Smith"}
     ]


   displayMessage: { [key: string]: string } = {};
   categories: IGetCategories[];   
   tehnologies: IGetCategories[];
    addFormMovie: FormGroup
  submitted: boolean = false 
 private validationMessages: {[key: string]: { [key: string]: string }}
 model: NgbDateStruct;
 date: {year: number, month: number}
 time = {hour: 13, minute: 30};
  error: string = ''
  allMovies: IGetMovies[];
  imgUrl: string;
  perPage: number = 4;
  page: number
  catPageId: number = 1;
 private genericValidator: ValidationMessage;
/*
 get movieActors(): FormArray {
  return this.addFormMovie.get('movieActors') as FormArray;
 }*/

  constructor(
    private movieService: MoviesService,
    private calendar: NgbCalendar,
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private readonly titleService: Title/*,
    private readonly serviceActors*/
  ) { 

    this.validationMessages = {
      addMovieImage:{
           required: 'Movie image is required.'
      },
      addMovieName: {
        required: 'Movie name is required.',
        minlength: 'Movie name must be at least three characters.',
        maxlength: 'Movie name cannot exceed 100 characters.'
      },
      addMovieDesc: {
        required: 'Movie description is required.',
        minlength: 'Movie description must be at least five characters.',
        maxlength: 'Movie description cannot exceed 2000 characters.'
      },
      addMovieReldate:{
        required: 'Movie release date is required.'
       },
       addMovieReltime: {
        required: 'Movie release time is required.'
       },
       addMovieYear:{
        required: 'Year of movie is required.'
       }/*,
       checkArrayGenre:{
           required: 'Genre of movie is required.'
       },
       checkArrayTehno:{
        required: 'Tehnology of movie is required.'
      },
      checkArrayActor:{
        required: 'Actor of movie is required.'
      }*/
    }; 

     
    this.addFormMovie =  this.fb.group({

         addMovieImage:  ['', Validators.required],  
         addMovieName: ['',[
                Validators.required,
                Validators.minLength(3),
                 Validators.maxLength(100)  
         ]],
         addMovieDesc: ['',[
                 Validators.required ,
                 Validators.minLength(5),
                 Validators.maxLength(2000)   
         ]], 
         addMovieReldate: ['',  Validators.required],
         addMovieReltime: ['', Validators.required],
         addMovieYear: ['', Validators.required]/*,
          checkArrayGenre: this.fb.array([] ,[ Validators.required]),
          checkArrayTehno: this.fb.array([] ,[ Validators.required]),
          checkArrayActor: this.fb.array([] ,[ Validators.required]),
            movieActors: this.fb.array([] ,[ Validators.required])*/
    })


  this.genericValidator = new ValidationMessage(this.validationMessages)

  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  ngOnInit(): void {
    this.titleService.setTitle("Cinepal | Admin Panel - Movies");
     

    this.imgUrl = this.movieService.urlImg; 


     this.subscriptions.push(
     /* this.categoryService.getCategories().subscribe(data => {
        setTimeout(() => {         
      this.categories = data;
        }, 500);
     }, (error: HttpErrorResponse) => {
      this.error = error.status + " " + error.statusText;
      
      }),
      this.categoryService.getTehnologies().subscribe(data => {
        setTimeout(() => {   
       this.tehnologies = data;
        },500);
    }, (error: HttpErrorResponse) => {
      this.error = error.status + " " + error.statusText;
      
      }),*/ this.movieService.getAllMovies(this.perPage , this.catPageId).subscribe( data => {
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

    })
     )

  }

  Paginate(page){
    this.catPageId = page;
    this.movieService.getAllMovies(this.perPage , this.catPageId).subscribe( data => {
      setTimeout(() => {
    this.allMovies = data['data'];  
     const pag = Math.ceil(data['count'] / this.perPage)  
        this.page = pag;
      }, 500);
           
}, (error: HttpErrorResponse) => {
this.error = error.status + " " + error.statusText;
if(error.status == 404){
this.error = "No movies" 
}

})


   }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
       console.log(this.formInputElements);
    merge(this.addFormMovie.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.addFormMovie);
         console.log(this.displayMessage)
         console.log(value)
    });
  }

  onCheckboxChange(e , checkArrayGTA ) {
    const checkArray: FormArray = this.addFormMovie.get(checkArrayGTA) as FormArray;
  
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
      console.log(checkArray.value)
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  } 

  get f(){
    return this.addFormMovie.controls
}

addMovie(){
  if(this.addFormMovie.invalid)
      return
    else
    console.log(this.addFormMovie.value);
 //  console.log(this.form.value)
}

ngOnDestroy(): void {
  this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
}

counter(i: number) {
  return new Array(i);
  }

}
