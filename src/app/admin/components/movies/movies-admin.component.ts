import { Component, OnInit ,  AfterViewInit , ViewChildren , ElementRef } from '@angular/core';
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
export class MoviesAdminComponent implements OnInit , AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

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


  public displayMessage: { [key: string]: string } = {};
  public categories: IGetCategories[];   
  public tehnologies: IGetCategories[];
   public addFormMovie: FormGroup
 public submitted: boolean = false 
 private validationMessages: {[key: string]: { [key: string]: string }}
 model: NgbDateStruct;
 date: {year: number, month: number}
 time = {hour: 13, minute: 30};
 
 private genericValidator: ValidationMessage;

  constructor(
    private movieService: MoviesService,
    private calendar: NgbCalendar,
    private categoryService: CategoriesService,
    private fb: FormBuilder
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
         addMovieYear: ['', Validators.required],
          checkArrayGenre: this.fb.array([] ,[ Validators.required]),
          checkArrayTehno: this.fb.array([] ,[ Validators.required]),
          checkArrayActor: this.fb.array([] ,[ Validators.required])
    })


  this.genericValidator = new ValidationMessage(this.validationMessages)

  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  ngOnInit(): void {
      this.categoryService.getCategories().subscribe(data => {
                    
      this.categories = data;
      console.log(this.categories)
     })
      this.categoryService.getTehnologies().subscribe(data => {
       this.tehnologies = data;
     console.log(this.tehnologies)
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



}
