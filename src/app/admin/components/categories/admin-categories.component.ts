import { HttpErrorResponse } from '@angular/common/http';
import { IGetCategories } from './../../../shared/models/IGetCategories';
import { debounceTime } from 'rxjs/operators';
import { Subscription, Observable,  merge, fromEvent } from 'rxjs';
import { ValidationMessage } from './../../../shared/helper/validation-message';
import { CategoriesService } from './../../../shared/services/categories/categories.service';
import { Title } from '@angular/platform-browser';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder, FormControlName } from '@angular/forms';
import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit , AfterViewInit , OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  private subscriptions: Array<Subscription> = new Array<Subscription>();
  addFormCategory: FormGroup
  private validationMessages: {[key: string]: { [key: string]: string }}
  private genericValidator: ValidationMessage;
  displayMessage: { [key: string]: string } = {};
  error: string = ''
  categories: IGetCategories[];
  tehnologies: IGetCategories[];
  get addCategory(): FormArray {
    return this.addFormCategory.get('addCategory') as FormArray;
   }
   get addTehnology(): FormArray {
    return this.addFormCategory.get('addTehnology') as FormArray;
   }
 


  constructor(
    private categoryService: CategoriesService,
     private readonly titleService: Title,
     private fb: FormBuilder
  ) { 
    this.validationMessages = {
    
      addCategory: {
        minlength: 'Category must be at least three characters.',
        maxlength: 'Category cannot exceed 100 characters.'
      },
      addTehnology: {
        minlength: 'Tehnology must be at least three characters.',
        maxlength: 'Tehnology cannot exceed 100 characters.'
      }
    }; 

    this.addFormCategory =  this.fb.group({
      addCategory: this.fb.array([] ),
       addTehnology: this.fb.array([])

 })


this.genericValidator = new ValidationMessage(this.validationMessages)

  }

  ngOnInit(): void {
    this.titleService.setTitle("Cinepal | Admin Panel - Categories");
    this.subscriptions.push(
      this.categoryService.getCategories().subscribe( data => {
        setTimeout(() => {
      this.categories = data;  
        }, 500);
             
     }, (error: HttpErrorResponse) => { 
        this.error = error.status + " " + error.statusText;
         if(error.status == 404){ 
                 this.error = "No Categories" 
          }

    }),
    this.categoryService.getTehnologies().subscribe( data => {
      setTimeout(() => {
    this.tehnologies = data;  
      }, 500);
           
   }, (error: HttpErrorResponse) => { 
      this.error = error.status + " " + error.statusText;
       if(error.status == 404){ 
               this.error = "No Tehnologies" 
        }

  })
    )


  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
       console.log(this.formInputElements);
    merge(this.addFormCategory.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.addFormCategory);
         console.log(this.displayMessage)
         console.log(value)
    });
  }

  addCat(): void {
    this.addCategory.push(new FormControl());
  }
 
  deleteCat(index: number): void {
    this.addCategory.removeAt(index);
    this.addCategory.markAsDirty();
  }
 

  addTehno(): void {
    this.addTehnology.push(new FormControl());
  }
 
  deleteTehno(index: number): void {
    this.addTehnology.removeAt(index);
    this.addTehnology.markAsDirty();
  }
 

  addformCat(){
    console.log(this.addFormCategory.value);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

}
