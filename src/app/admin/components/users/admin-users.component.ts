import { ActivatedRoute } from '@angular/router';
import { error } from 'protractor';
import { RegisterUser } from './../../../shared/models/IGetUsers';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from './../../../shared/services/user/user.service';
import { debounceTime } from 'rxjs/operators';
import { Observable, merge, Subscription, fromEvent } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, FormControlName } from '@angular/forms';
import { ValidationMessage } from './../../../shared/helper/validation-message';
import { Component, OnInit, ElementRef, ViewChildren, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit , AfterViewInit , OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  private subscriptions: Array<Subscription> = new Array<Subscription>();
  displayMessage: { [key: string]: string } = {};
  addFormUser: FormGroup
  upFormUser: FormGroup
  private validationMessages: {[key: string]: { [key: string]: string }}
  perPage: number = 10;
  page: number
  catPageId: number = 1;
  error: string = ''
  users: RegisterUser[];
  public success = null;
  public message: string = ''
 private genericValidator: ValidationMessage;

  public readonly roles = [
    { id: 1 , name: "Admin"},
    { id: 2 , name: "User"}
   
   ]

  constructor(
    private readonly titleService: Title,
    private fb: FormBuilder,
     private userService: UserService ,
     private route: ActivatedRoute
  ) { 
    this.validationMessages = {
 
      name: {
        required: 'Name is required.',
         pattern: 'Name is not valid'
      },
      username: {
        required: 'Username is required.',
        pattern: 'Username is not valid'
      },
      email:{
        required: 'Email is required.',
         email: 'Email is not valid'
       },
       password: {
        required: 'Password is required.'
       },
       role:{
        required: 'Role is required.'
       }
    }; 

     
    this.addFormUser =  this.fb.group({

          name: ['',[
                Validators.required,
                Validators.pattern(/^[A-Z][a-z]{3,24}(\s[A-Z][a-z]{3,24})+$/) 
         ]],
         username: ['',[
                 Validators.required ,
                Validators.pattern(/^[\w\-\@\+\?\!\.]{3,19}$/)  
         ]], 
         email: ['', [
          Validators.required, Validators.email
         ]],
         password: ['',[ Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d]).{7,}$/) ]],
         role: ['', Validators.required]
    })

    this.upFormUser =  this.fb.group({

      name: ['',[
            Validators.required,
            Validators.pattern(/^[A-Z][a-z]{3,24}(\s[A-Z][a-z]{3,24})+$/) 
     ]],
     username: ['',[
             Validators.required ,
            Validators.pattern(/^[\w\-\@\+\?\!\.]{3,19}$/)  
     ]], 
     email: ['', [
      Validators.required, Validators.email
     ]],
     password: ['',[ Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d]).{7,}$/) ]],
     role: ['', Validators.required]
})

  this.genericValidator = new ValidationMessage(this.validationMessages)

  }

  ngOnInit(): void {
      this.titleService.setTitle("Cinepal | Admin Panel - Users");

      
     this.subscriptions.push(
   this.userService.getUsers(this.perPage , this.catPageId).subscribe( data => {
         setTimeout(() => {
       this.users = data['data'];  
       const pag = Math.ceil(data['count'] / this.perPage)  
           this.page = pag;
         
         }, 500);
              
      }, (error: HttpErrorResponse) => { 
         this.error = error.status + " " + error.statusText;
          if(error.status == 404){ 
                  this.error = "No users" 
           }
     })
      )
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
       console.log(this.formInputElements
        );
    merge(this.addFormUser.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.addFormUser);
         console.log(this.displayMessage)
         console.log(value)
    });
  }

  onCheckboxChange(e , checkArrayGTA ) {
    const checkArray: FormArray = this.addFormUser.get(checkArrayGTA) as FormArray;
  
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

  Paginate(page){
    this.catPageId = page;
    this.userService.getUsers(this.perPage , this.catPageId).subscribe( data => {
      setTimeout(() => {
    this.users = data['data'];  
     const pag = Math.ceil(data['count'] / this.perPage)  
        this.page = pag;
        console.log(pag)
      }, 500);
           
}, (error: HttpErrorResponse) => {
this.error = error.status + " " + error.statusText;
if(error.status == 404){
this.error = "No Users" 
}

})


   }

  addUser(){
    if(this.addFormUser.invalid)
        return
      else{
      console.log(this.addFormUser.value);
   
      this.userService.addUser(this.addFormUser.value)
          .subscribe(data =>{
            this.message = data.message
            this.success = true;
            console.log(this.message)
          }, (error: HttpErrorResponse) => {
            this.error = error.status + " " + error.statusText;
            this.message = this.error;
            this.success = false;
         });
  
    }
  }

  upUser(){
    const id = +this.route.snapshot.params['id'];
    this.userService.updateUser(this.addFormUser.value , id);
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  counter(i: number) {
    return new Array(i);
    }
  

}
