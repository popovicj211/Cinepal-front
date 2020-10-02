import { HttpErrorResponse } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';
import { Subscription, Observable, merge, fromEvent } from 'rxjs';
import { ActorsService } from './../../../shared/services/actors/actors.service';
import { Title } from '@angular/platform-browser';
import { ValidationMessage } from './../../../shared/helper/validation-message';
import { FormControl, FormBuilder, FormArray, FormGroup, FormControlName } from '@angular/forms';
import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChildren } from '@angular/core';
import { IGetActors } from 'src/app/shared/models/IGetActors';

@Component({
  selector: 'app-admin-actors',
  templateUrl: './admin-actors.component.html',
  styleUrls: ['./admin-actors.component.css']
})
export class AdminActorsComponent implements OnInit , AfterViewInit , OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  private subscriptions: Array<Subscription> = new Array<Subscription>();
  addFormActor: FormGroup;
  private validationMessages: {[key: string]: { [key: string]: string }}
  private genericValidator: ValidationMessage;
  displayMessage: { [key: string]: string } = {};
actors: IGetActors[];
perPage: number = 10;
page: number
  catPageId: number = 1;
error: string = ''
  get addActor(): FormArray {
    return this.addFormActor.get('addActor') as FormArray;
   }

  constructor(
    private actorsService: ActorsService,
    private readonly titleService: Title,
    private fb: FormBuilder
  ) {
    this.validationMessages = {
    
      addActor: {
        minlength: 'Actor must be at least three characters.',
        maxlength: 'Actor cannot exceed 100 characters.'
      }
    };
    this.addFormActor =  this.fb.group({
       addActor: this.fb.array([] ),
 })


this.genericValidator = new ValidationMessage(this.validationMessages)
   }

  ngOnInit(): void {
    this.titleService.setTitle("Cinepal | Admin Panel - Actors");
    this.subscriptions.push(
      this.actorsService.getActors(this.perPage , this.catPageId ).subscribe( data => {
        setTimeout(() => {
      this.actors = data['data'];  
      const pag = Math.ceil(data['count'] / this.perPage)  
       console.log(pag)
       this.page = pag;
        }, 500);
             
     }, (error: HttpErrorResponse) => { 
        this.error = error.status + " " + error.statusText;
         if(error.status == 404){ 
                 this.error = "No Actors" 
          }

    })
    )
  }

  
  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
       console.log(this.formInputElements);
    merge(this.addFormActor.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.addFormActor);
         console.log(this.displayMessage)
         console.log(value)
    });
  }


  Paginate(page){
    this.catPageId = page;
    this.actorsService.getActors(this.perPage , this.catPageId).subscribe( data => {
      setTimeout(() => {
    this.actors = data['data'];  
     const pag = Math.ceil(data['count'] / this.perPage)  
          console.log(this.actors)
        this.page = pag;
      }, 500);
           
}, (error: HttpErrorResponse) => {
this.error = error.status + " " + error.statusText;
if(error.status == 404){
this.error = "No movies" 
}

})


   }

  addAct(): void {
    this.addActor.push(new FormControl());
  }
 
  deleteAct(index: number): void {
    this.addActor.removeAt(index);
    this.addActor.markAsDirty();
  }

  addformAc(){
    console.log(this.addFormActor.value);
  }

  counter(i: number) {
    return new Array(i);
    }



  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

}
