import { ActivatedRoute, Router } from '@angular/router';
import { RegisterUser, addUserResponse } from './../../../shared/models/IGetUsers';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from './../../../shared/services/user/user.service';
import { debounceTime } from 'rxjs/operators';
import { Observable, merge, Subscription, fromEvent } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, FormControlName } from '@angular/forms';
import { ValidationMessage } from './../../../shared/helper/validation-message';
import { Component, OnInit, ElementRef, ViewChildren, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { IGetUser } from '../../../shared/models/IGetUsers'


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
 checked:boolean;
  user: IGetUser
  pageTitle: string = ''
  passVlid = null;
  private sub: Subscription;
  public readonly roles = [
    { id: 1 , name: "Admin"},
    { id: 2 , name: "User"}
   
   ]

   displayNavbar:string 



   /*passwordValidate(password){
    let valid;
    if(password == null){
     valid = [null] 
    }else{
       valid = [Validators.required ,  Validators.pattern(/^(?=.*[a-zšđčćž])(?=.*[A-ZŠĐČĆŽ])(?=.*[\d]).{7,}$/) ]
    }
     return valid
  }*/

  constructor(
    private readonly titleService: Title,
    private fb: FormBuilder,
     private userService: UserService ,
     private route: ActivatedRoute,
     private router: Router,
     private cd: ChangeDetectorRef
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
        required: 'Password is required.',
        pattern: 'Password must have at least one uppercase letter, lowercase letter and digit, 7 characters long'
       },
       role:{
        required: 'Role is required.'
       }
    }; 


    
   /*  if(this.passTached){
      this.addFormUser =  this.fb.group({

        name: ['',[
              Validators.required,
              Validators.pattern(/^[A-ZŠĐČĆŽ][a-zšđčćž]{3,24}(\s[A-ZŠĐČĆŽ][a-zšđčćž]{3,24})+$/) 
       ]],
       username: ['',[
               Validators.required ,
              Validators.pattern(/^[\w\-\@\+\?\!\.]{3,19}$/)  
       ]], 
       email: ['', [
        Validators.required, Validators.email
       ]],
       password: ['', [
       Validators.required ,  Validators.pattern(/^(?=.*[a-zšđčćž])(?=.*[A-ZŠĐČĆŽ])(?=.*[\d]).{7,}$/) 
        ]],
       role: ['', Validators.required]
  })
     }else{
      this.addFormUser =  this.fb.group({

        name: ['',[
              Validators.required,
              Validators.pattern(/^[A-ZŠĐČĆŽ][a-zšđčćž]{3,24}(\s[A-ZŠĐČĆŽ][a-zšđčćž]{3,24})+$/) 
       ]],
       username: ['',[
               Validators.required ,
              Validators.pattern(/^[\w\-\@\+\?\!\.]{3,19}$/)  
       ]], 
       email: ['', [
        Validators.required, Validators.email
       ]],
       password: [''],
       role: ['', Validators.required]
  })
     }*/

     this.addFormUser =  this.fb.group({

      name: ['',[
            Validators.required,
            Validators.pattern(/^[A-ZŠĐČĆŽ][a-zšđčćž]{3,24}(\s[A-ZŠĐČĆŽ][a-zšđčćž]{3,24})+$/) 
     ]],
     username: ['',[
             Validators.required ,
            Validators.pattern(/^[\w\-\@\+\?\!\.]{3,19}$/)  
     ]], 
     email: ['', [
      Validators.required, Validators.email
     ]],
     password: [''],
     role: ['', Validators.required]
})


  this.genericValidator = new ValidationMessage(this.validationMessages)

  }




  ngOnInit(): void {
      this.titleService.setTitle("Cinepal | Admin Panel - Users");
      this.checked = false
      this.displayNavbar = '0'
      this.sub = this.route.paramMap.subscribe(
        params => {
          const id = +params.get('id');
          this.getUser(id)
        }
      );
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

  showPass(){
    // this.addFormUser.get('password').touched
  
 this.displayNavbar = '1'
 this.checked = true;
 
    this.addFormUser =  this.fb.group({
 
     name: ['',[
           Validators.required,
           Validators.pattern(/^[A-ZŠĐČĆŽ][a-zšđčćž]{3,24}(\s[A-ZŠĐČĆŽ][a-zšđčćž]{3,24})+$/) 
    ]],
    username: ['',[
            Validators.required ,
           Validators.pattern(/^[\w\-\@\+\?\!\.]{3,19}$/)  
    ]], 
    email: ['', [
     Validators.required, Validators.email
    ]],
    password: ['', [
    Validators.required ,  Validators.pattern(/^(?=.*[a-zšđčćž])(?=.*[A-ZŠĐČĆŽ])(?=.*[\d]).{7,}$/) 
     ]],
    role: ['', Validators.required]
 })


   }


  getUser(id: number): void {
    this.userService.getUserEdit(id)
      .subscribe({
        next: (user: IGetUser) => this.displayProduct(user),
        error: err => this.error = err
      });
  }

  displayProduct(user: IGetUser): void {
    if (this.addFormUser) {
      this.addFormUser.reset();
    }
    this.user = user;

    if (this.user.id === 0) {
      this.pageTitle = 'Add User';
    } else {
      this.pageTitle = `Edit User: ${this.user.name}`;
    }



if (this.user.id > 0) {

  this.checked = true;

 this.addFormUser.patchValue({
  name: this.user.name,
  username: this.user.username,
  email: this.user.email,
  password: null,
  role: this.user.role['id'],
 })

   }

  }

  public ngDoCheck(): void { this.cd.detectChanges(); }
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
  
    if (this.addFormUser.valid) {
          const u = { ...this.user, ...this.addFormUser.value };
    
    console.log(u);
          if (u.id === 0) {
        
           //   const data = this.addFormUser.getRawValue();
                 this.userService.addUser(u).subscribe(
                   (res: addUserResponse) => {
                     this.addFormUser.reset();
                         this.message = res.message
                         console.log("User data is successfully added")
                         this.success = true;
                   },
                   (error: HttpErrorResponse) => {
                     this.error = error.status + " " + error.statusText;
                      this.message = this.error
                      this.success = false;
                   });
    
          } else{
           //   const data = this.addFormUser.getRawValue();
             this.userService.updateUser(u).subscribe(
              (res) => {
                this.addFormUser.reset();
                    this.message = "User data is successfully updated"
                    console.log("User data is successfully updated")
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

  deleteUser(){
    const u = { ...this.user };
          if(u.id === 0 ){
            if (confirm('If you want to delete user ,please click edit button before click button delete')) { 
            this.redirection();
            }
          }else{
     if (confirm(`Do you really delete the user:${this.user.name} - ${this.user.username}?`)) {      
        this.userService.deleteUser(u.id).subscribe(
          (res) => {
            this.addFormUser.reset();
                this.message = "User data is successfully deleted"
                console.log("User data is successfully deleted")
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
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  counter(i: number) {
    return new Array(i);
    }
  
    redirection(): void {
      // Reset the form to clear the flags
      this.addFormUser.reset();
      this.router.navigate(['/admin/users']);
    }


}
