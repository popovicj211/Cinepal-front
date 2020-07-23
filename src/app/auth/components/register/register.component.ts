import { ValidationMessage } from './../../../shared/helper/validation-message';
import { AuthService } from './../../../shared/services/auth/auth.service';
import { RegisterUser, RegisterResponse } from './../../../shared/models/IGetUsers';
import { Component, OnInit, OnDestroy, AfterViewInit , ViewChildren , ElementRef } from '@angular/core';
import { Subscription , Observable, merge, pipe , fromEvent } from "rxjs";
import { FormControl, FormGroup, Validators , FormBuilder, FormControlName } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import { Title } from "@angular/platform-browser";
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit ,OnDestroy {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  private subscriptions: Array<Subscription> = new Array<Subscription>();
  public error: string = null;
  public message: string = ''
  public success = null;
  private validationMessages: {[key: string]: { [key: string]: string }}
  public displayMessage: { [key: string]: string } = {};
  private genericValidator: ValidationMessage;

  public readonly registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.compose([
            Validators.required,
            Validators.pattern(/^[A-Z][a-z]{3,24}(\s[A-Z][a-z]{3,24})+$/)
    ])) ,
    username: new FormControl(null, Validators.compose([
      Validators.required,
      Validators.pattern(/^[\w\-\@\+\?\!\.]{3,19}$/)
      ])),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.compose([
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/)
     ]))
  });


  constructor(
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly titleService: Title,
    private readonly formBuilder: FormBuilder
  ) {

    this.validationMessages = {
      name:{
         required: 'First and last name is required.',
         pattern: 'First name and last name must have first uppercase letter and other lowercase letters'
      },
      username:{
        required: 'Username is required.',
        pattern: 'Username must have '
      },
      email: {
       required: 'E-mail is required.',
       email: 'Email is not valid'
     },
     password: {
       required: 'Password is required.',
       pattern: 'Password must have at least one uppercase letter, lowercase letter and digit,minimal 7 characters long'
     }
   }; 


   this.genericValidator = new ValidationMessage(this.validationMessages)


  }

  ngOnInit(): void {
    this.titleService.setTitle('Cinepal | Register');
  }

  
  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
       console.log(this.formInputElements);
    merge(this.registerForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.registerForm);
         console.log(this.displayMessage)
         console.log(value)
    });
  }
  


  public register(): void {
    if (this.registerForm.valid) {
      const data: RegisterUser = this.registerForm.getRawValue();
        this.subscriptions.push(
        this.authService.register(data).subscribe(
          (res: RegisterResponse) => {
            this.registerForm.reset();
            // @ts-ignore
          //  M.toast({ html: message, classes: "success", displayLength: 1750 });
                this.message = res.message
                console.log("Register is successfully")
                this.success = true;
          },
          (error: HttpErrorResponse) => {
           /* switch (error.status) {
              case 409:
                this.error = error.error;
                break;
              case 422:
                this.error = error.error.errors.email[0];
                break;
            }*/
            // @ts-ignore
       //     M.toast({ html: this.error, classes: "error" });
            this.error = error.status + " " + error.statusText;
             this.message = this.error
             this.success = false;
          }
        )
      );
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
