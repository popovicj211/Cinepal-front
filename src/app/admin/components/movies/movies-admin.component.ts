

import { ActivatedRoute, Router } from '@angular/router';
import { IGetPrices } from './../../../shared/models/IGetPrices';
import { PricesService } from './../../../shared/services/prices/prices.service';
import { ActorsService } from './../../../shared/services/actors/actors.service';
import { MappingObjToArr } from './../../../shared/helper/mappingObjToArr';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup , FormControl, Validators , FormBuilder, FormArray , FormControlName } from '@angular/forms' 
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {  ValidationMessage } from './../../../shared/helper/validation-message'
import { Observable, Subscription, merge, pipe , fromEvent } from 'rxjs';
import { debounceTime, switchMap, map } from 'rxjs/operators';
import { IGetActors } from 'src/app/shared/models/IGetActors';
import { IGetMovies, addMovie, addMovieResponse } from './../../../shared/models/IGetMovies';
import { IGetCategories } from './../../../shared/models/IGetCategories';
import { CategoriesService } from './../../../shared/services/categories/categories.service';
import { MoviesService } from './../../../shared/services/movies/movies.service';



@Component({
  selector: 'app-movies-admin',
  templateUrl: './movies-admin.component.html',
  styleUrls: ['./movies-admin.component.css']
})
export class MoviesAdminComponent implements OnInit , AfterViewInit , OnDestroy {

  private sub: Subscription;
private movie: IGetMovies;
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  private subscriptions: Array<Subscription> = new Array<Subscription>();
fileValueName
  public readonly years = [
    { id: 1 , year: 2020},
    { id: 2 , year: 2019},
    { id: 3 , year: 2018},
    { id: 4 , year: 2017},
    { id: 5 , year: 2016}
     ]
   
   displayMessage: { [key: string]: string } = {};
   categories: IGetCategories[] = [];   
   tehnologies: IGetCategories[];
   prices: IGetPrices[];
    addFormMovie: FormGroup
  submitted: boolean = false 
 private validationMessages: {[key: string]: { [key: string]: string }}
 model: NgbDateStruct;
 date: {year: number, month: number}
 time = {hour: 13, minute: 30};
  error: string = ''
  allMovies: IGetMovies[];
  actors: IGetActors[];
  imgUrl: string;
  perPage: number = 4;
  page: number
  catPageId: number = 1;
 private genericValidator: ValidationMessage;
 message: string = "";
 pageTitle = 'Product Edit';
checked: boolean = false
 success = null;
 checkArray:any[] = []
 imageURL: string;
 
messageValidImageExt: string = ''

arr:any[] = []
  constructor(
    private movieService: MoviesService,
    private calendar: NgbCalendar,
    private categoryService: CategoriesService,
    private fb: FormBuilder,
 //    private fb: RxFormBuilder,
    private readonly titleService: Title,
    private serviceActors: ActorsService,
    private servicePrices: PricesService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private router: Router
  ) { 

    this.validationMessages = {
      addMovieImage:{
           required: 'Image of movie is required.'
      },
      addMovieName: {
        required: 'Name of movie is required.',
        minlength: 'Name of movie must be at least three characters.',
        maxlength: 'Name of movie cannot exceed 100 characters.'
      },
      addMovieDesc: {
        required: 'Description of movie is required.',
        minlength: 'Description of movie must be at least five characters.',
        maxlength: 'Description of movie cannot exceed 2000 characters.'
      },
      addMovieReldate:{
        required: 'Release date of movie is required.'
       },
       addMovieReltime: {
        required: 'Release time of movie is required.'
       },
       addMovieRuntime: {
        required: 'Runtime of movie is required.'
       },
       addMovieYear:{
        required: 'Year of movie is required.'
       },
       checkArrayGenre:{
           required: 'Genre of movie is required.'
       },
       checkArrayTehno:{
        required: 'Tehnology of movie is required.'
      },
      checkArrayActor:{
        required: 'Actor of movie is required.'
      }
    }; 

     
  /* this.addFormMovie =  this.fb.group({

         addMovieImage:  ['',[ RxwebValidators.required(), RxwebValidators.fileSize({maxSize:2000 })  , RxwebValidators.extension({extensions:["jpeg","jpg", "png"]})]],  
         addMovieName: ['',[
                RxwebValidators.required(),  
                 RxwebValidators.minLength({value:3}), RxwebValidators.maxLength({value:100})
         ]],
         addMovieDesc: ['',[
                 RxwebValidators.required() , 
                 RxwebValidators.minLength({value:5}), RxwebValidators.maxLength({value:2000})
         ]], 
         addMovieReldate: ['',  RxwebValidators.required()],
         addMovieReltime: ['', RxwebValidators.required()],
         addMovieRuntime: ['' , RxwebValidators.required()],
         addMovieYear: ['', RxwebValidators.required()],
          checkArrayGenre: this.fb.array([] , [RxwebValidators.required()]),    
          checkArrayTehno: this.fb.array([],[RxwebValidators.required()]),
          checkArrayActor: this.fb.array([], [RxwebValidators.required()])
    })*/


  this.addFormMovie =  this.fb.group({

      addMovieImage:  ['' ],  
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
      addMovieRuntime: ['' , Validators.required],
      addMovieYear: ['', Validators.required],
    //   checkArrayGenre: this.fb.array([] , [Validators.required]),    
    checkArrayGenre: new FormArray([]),  
       checkArrayTehno: new FormArray([]),
       checkArrayActor: new FormArray([])
 })

   /* ReactiveFormConfig.set({
      "validationMessage":{
    "required":"This field is required",
      "minLength":"minimum length is {{0}}",
      "maxLength":"allowed max length is {{0}}"
      }
    });*/



  /*  let movie = new Movie()
    movie.checkArrayGenre = new Array<Genre>();
    movie.checkArrayTehno = new Array<Tehnology>();
    movie.checkArrayActor = new Array<Actor>();
    let genre = new Genre();
    let tehnology = new Tehnology();
    let actor = new Actor();

    movie.checkArrayGenre.push(genre)
    this.addFormMovie = this.fb.formGroup(movie);*/

  this.genericValidator = new ValidationMessage(this.validationMessages)

  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  get f(){
    return this.addFormMovie.controls;
}
get genresArray(){
  return this.f.checkArrayGenre as FormArray;
}

get tehnologiesArray(){
  return this.f.checkArrayTehno as FormArray;
}

get actorsArray(){
  return this.f.checkArrayActor as FormArray;
}

  ngOnInit(): void {

    this.titleService.setTitle("Cinepal | Admin Panel - Movies");


    this.checked = false


    this.imgUrl = this.movieService.urlImg; 


     this.subscriptions.push(
      this.categoryService.getCategories().subscribe(data => {
        setTimeout(() => {         
      this.categories = data;
    /*  if (this.genresArray.length < this.categories.length) {
        for (let i = 0; i < this.categories.length; i++) {
  
      this.genresArray.push(
        this.fb.group({
          name: [null]
        })
      );
        }
      }*/

      

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
      
      }),
      this.serviceActors.getActors(0,null).subscribe(data => {
        setTimeout(() => {   
       this.actors = data['data'];
        },500);
    }, (error: HttpErrorResponse) => {
      this.error = error.status + " " + error.statusText;
      
      }),
      this.servicePrices.getPrices().subscribe((data: IGetPrices[]) => {
        setTimeout(() => {   
       this.prices = data;
        },500);
    }, (error: HttpErrorResponse) => {
      this.error = error.status + " " + error.statusText;
      
      }),
      this.movieService.getAllMoviesAdmin(this.perPage , this.catPageId).subscribe( data => {
        setTimeout(() => {
      this.allMovies = data['data'];  
      const pag = Math.ceil(data['count'] / this.perPage)  
            console.log(this.allMovies)
          this.page = pag;
        
        }, 500);
             
     }, (error: HttpErrorResponse) => { 
        this.error = error.status + " " + error.statusText;
         if(error.status == 404){ 
                 this.error = "No movies" 
          }

    })
     )

     this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getMovie(id)
      }
    );

  }

  get cat(){
      return this.categories
  }



  getMovie(id: number): void {
    this.movieService.editMovie(id)
      .subscribe({
        next: (movie: IGetMovies) => 
        this.displayMovie(movie),
        error: err => this.error = err
      });
  }

  editMovieRoute(id:number){
  //  this.sub = this.route.paramMap.subscribe(
    //  params => {
      //  const id = +params.get('id');
        this.router.navigate(["admin/movies",id,"edit"]);
   //   }
 //   );
  }



  displayMovie(movie: IGetMovies ): void {
    if (this.addFormMovie) {
      this.addFormMovie.reset();
    }
    this.movie = movie;
console.log(this.cat)
    if (this.movie.id === 0) {
      this.pageTitle = 'Add Movie';
    } else {
      this.pageTitle = `Edit Movie: ${this.movie.name}`;
    }
  

  const dateTime = new Date(this.movie.rel);
  const getDate = dateTime.getDate();
  const getMonth = dateTime.getMonth() + 1;
  const getYear = dateTime.getFullYear();
  const getHour = dateTime.getHours();
  const getMinute = dateTime.getMinutes();
  const getSecond = dateTime.getSeconds();

const dateObj = { year:getYear ,month:getMonth ,day:getDate}
const timeObj = { hour: getHour , minute:getMinute , second:getSecond }
 

function arrMapKey(data){

  const arrCat = []
      for(let i of data){
        arrCat.push(i.type)
      }   
      console.log(arrCat)
      return arrCat
}


if (this.movie.id > 0) {

  this.checked = true;


 this.addFormMovie.patchValue({
  addMovieImage: null,
 //addMovieImage: this.movie.img,
  addMovieName: this.movie.name,
  addMovieDesc: this.movie.desc,
  addMovieReldate: dateObj,
  addMovieReltime: timeObj,
  addMovieRuntime: this.movie.runtime,
  addMovieYear:  1,
  //checkArrayGenre:["3","5"]
 })

 
 this.addFormMovie.setControl("checkArrayGenre", this.fb.array(arrMapKey(new MappingObjToArr(this.movie.tehnologies).MapingObj())))
 this.addFormMovie.setControl("checkArrayTehno", this.fb.array(arrMapKey(new MappingObjToArr(this.movie.tehnologies).MapingObj())))
 this.addFormMovie.setControl("checkArrayActor", this.fb.array(arrMapKey(new MappingObjToArr(this.movie.actors).MapingObj())))

 this.imageURL = this.movieService.urlImg +  movie.img['link']

   }

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
    const checkArray: FormArray = this.addFormMovie.get(checkArrayGTA) as FormArray ;

   if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
      console.log(checkArray)
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



/*
  get genresArray() : FormArray{
    return this.addFormMovie.get('checkArrayGenre') as FormArray;
  }
  get tehnologiesArray() : FormArray{
    return this.addFormMovie.get('checkArrayTehno') as FormArray;
  }
  get actorsArray() : FormArray{
    return this.addFormMovie.get('checkArrayActor') as FormArray;
  }*/


sendMovieData(){
  if (this.addFormMovie.valid) {
  //  if (this.addFormMovie.dirty) {
      const p = { ...this.movie, ...this.addFormMovie.value };

console.log(p);
      if (p.id === 0) {
       
             this.movieService.addMovie(p).subscribe(
               (res: addMovieResponse) => {
                 this.addFormMovie.reset();
                     this.message = res.message
                     console.log("Movie data is successfully added")
                     this.success = true;
               },
               (error: HttpErrorResponse) => {
                 this.error = error.status + " " + error.statusText;
                  this.message = this.error
                  this.success = false;
               });

      } else{
      this.movieService.updateMovie(p).subscribe(
        (res) => {
          this.addFormMovie.reset();
              this.message = "Movie data is successfully updated"
              console.log("Movie data is successfully added")
              this.success = true;
        },
        (error: HttpErrorResponse) => {
          this.error = error.status + " " + error.statusText;
           this.message = this.error
           this.success = false;
        });
      }
  }

}


deleteMovie(){
  const u = { ...this.movie };
        if(u.id === 0 ){
          if (confirm('If you want to delete movie ,please click edit button before click button delete.')) { 
          this.redirection();
          }
        }else{
   if (confirm(`Do you really delete the movie: ${this.movie.name}?`)) {      
      this.movieService.deleteMovie(u.id).subscribe(
        (res) => {
          this.addFormMovie.reset();
              this.message = "Movie data is successfully deleted"
              console.log("Movie data is successfully deleted")
              this.success = true;
        },
        (error: HttpErrorResponse) => {
          this.error = error.status + " " + error.statusText;
           this.message = this.error
           this.success = false;
        });
      }
    }
}

ngOnDestroy(): void {
  this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe())
 // this.sub.unsubscribe();

}

counter(i: number) {
  return new Array(i);
  }


  fileValue(e: any){

 
 /* if (e.target.files.length > 0) {
   const file = (e.target as HTMLInputElement).files[0];
   this.addFormMovie.get('addMovieImage').setValue(file);
   const reader = new FileReader();
   reader.onload = () => { 
     this.imageURL = reader.result as string;
   }
   this.addFormMovie.patchValue({
    addMovieImage: file
   });
   this.addFormMovie.get('addMovieImage').updateValueAndValidity()
   reader.readAsDataURL(file)

  }*/
  const reader = new FileReader();
  if (e.target.files.length > 0) {
    const file = e.target.files[0];
   
   reader.readAsDataURL(file)
    reader.onload = () => { 
      this.imageURL = reader.result as string;
      this.addFormMovie.patchValue({
        addMovieImage: reader.result
       });
    }
    this.cd.markForCheck(); 
 
   }
}

redirection(): void {
  // Reset the form to clear the flags
  this.addFormMovie.reset();
  this.router.navigate(['/admin/movies']);
}


}
