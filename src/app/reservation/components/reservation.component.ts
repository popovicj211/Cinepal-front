import { ActivatedRoute } from '@angular/router';
import { MoviesService } from './../../shared/services/movies/movies.service';
import { IGetMovies } from './../../shared/models/IGetMovies';
import { GetSeatchecker } from './../../shared/models/IGetSeatchecker';
import { SeatcheckerService } from './../../shared/services/seatchecker/seatchecker.service';
import { ResResponse, SendReservation } from './../../shared/models/IGetReservation';
import { HttpErrorResponse } from '@angular/common/http';
import { ReservationService } from './../../shared/services/reservation/reservation.service';
import { debounceTime, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { ValidationMessage } from './../../shared/helper/validation-message';
import { Subscription, Observable, merge, fromEvent } from 'rxjs';
import { FormControlName, FormGroup, FormControl, Validators, FormArray ,  FormBuilder, NumberValueAccessor } from '@angular/forms';
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit, AfterViewInit ,OnDestroy  {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  private subscriptions: Array<Subscription> = new Array<Subscription>();
  public error: string = null;
  public message: string = ''
  public messageSeat: string = ''
  public success = null;
  private validationMessages: {[key: string]: { [key: string]: string }}
  private genericValidator: ValidationMessage;
  public displayMessage: { [key: string]: string } = {};
   public freeSeatChecker: GetSeatchecker[];

   public reservationForm: FormGroup
 public selectedLevel;

 public quantities: number[] = [1,2,3,4,5]
 public movies: IGetMovies[];
 public movie: IGetMovies;
 public arrPricesTehno: any[] = [];

public movieIdValue: number;

public arrSeat: number[] = [];

 public checkArray:FormArray
 /* public readonly reservationForm: FormGroup = new FormGroup({
    movieId: new FormControl(null, Validators.required ),
    qty: new FormControl(null, Validators.required),
  //  number: new FormControl(null, Validators.required) ,
    number: new FormArray([])

  });*/


  constructor(
    private readonly titleService: Title,
    private readonly reservationService: ReservationService ,
    private readonly seatcheckerService: SeatcheckerService ,
    private readonly moviesService: MoviesService,
    private fb: FormBuilder,
     private readonly route: ActivatedRoute
  ) {
  
    this.validationMessages = {

       number: {
         required: 'Number of seat is required.',
       },
       priceOfTehno: {
           required: 'Price of tehnology is required.'
       }
     }; 
  
  
    
  
     const defaultQuantity = 1;
     this.movieIdValue = +this.route.snapshot.params['id'];
     console.log(this.movieIdValue)
     this.reservationForm =  this.fb.group({
  
      movieId:  [this.movieIdValue, Validators.required],  
      qty: [defaultQuantity , Validators.required],
       number: this.fb.array([] ,[ Validators.required]),
       priceOfTehno: ['', Validators.required] 
  })
  
  
     this.genericValidator = new ValidationMessage(this.validationMessages)


   }

  ngOnInit(): void {

    this.titleService.setTitle('Cinepal | Reservation');
    this.subscriptions.push(
    this.seatcheckerService.getSeatchecker(1).subscribe( (res: GetSeatchecker[]) => {

      setTimeout(() =>{
          this.freeSeatChecker = res; 
            console.log(this.freeSeatChecker)
      }, 500)          
}),
this.moviesService.getAllMovies(null , null).subscribe( (res: IGetMovies[]) => {
  setTimeout(() =>{
      this.movies = res['data']; 
        console.log(this.movies)
  }, 500)          
}),
this.moviesService.getMovieDetail(this.movieIdValue).subscribe(res => {
       setTimeout(() => {
            const arrPrices =  Object.values(res['price']);
            const arrTehno =  Object.values(res['tehnologies']);
              for(const i in arrPrices){
                 this.arrPricesTehno.push({ price: arrPrices[i], tehnology: arrTehno[i]});
              }
                    console.log(this.arrPricesTehno)
          },500) 
}) 

    );


  }

  ngAfterViewInit(): void {

    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
       console.log(this.formInputElements);
    merge(this.reservationForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.reservationForm);
         console.log(this.displayMessage)
         console.log(value)
    });
  }

 

  onCheckboxChange(e , checkArrayGTA ) {
    const checkArray: FormArray = this.reservationForm.get(checkArrayGTA) as FormArray;
   //checkArray = this.reservationForm.get(checkArrayGTA) as FormArray;
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
     this.arrSeat = checkArray.value;
  console.log(checkArray.value);
  } 


  public reservation(): void {
    if (this.reservationForm.valid) {
      const free = 1;
      const reserved = 0;
      const dataSeatChecker = { number: this.arrSeat , free: reserved }
     const data: SendReservation = this.reservationForm.getRawValue();
        this.reservationService.sendReservation(data).subscribe(
          (res: ResResponse) => {
            this.reservationForm.reset();
                this.message = res.message
                console.log("Reservation data is successfully send")
                this.success = true;
        //   this.updateSeat( free, dataSeatChecker);
          },
          (error: HttpErrorResponse) => {
            this.error = error.status + " " + error.statusText;
             this.message = this.error
             this.success = false;
          });
    }
  }
/*
  updateSeat(reserved: number, data){
      this.seatcheckerService.updateSeatchecker(reserved ,data).subscribe(res => {
        console.log("Seat data is successfully updated")
      });
  }*/

  selected(){
    console.log(this.selectedLevel)
  }

    ngOnDestroy(): void {
      this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    }

}
