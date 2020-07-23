import { ValidationMessage } from './../../../shared/helper/validation-message';
import { debounceTime } from 'rxjs/operators';
import { LoginCredentials, LoginResponse, UserInfo } from './../../../shared/models/IGetUsers';
import { AuthService } from './../../../shared/services/auth/auth.service';
import { Component, OnInit , OnDestroy , AfterViewInit , ViewChildren , ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators ,  FormBuilder, FormArray, FormControlName} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { Title } from "@angular/platform-browser";
import { Observable, Subscription, merge, pipe , fromEvent } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  private subscriptions: Array<Subscription> = [];
  public error: string = null;
  public showSpinner = false;
  public message: string = ''
  public success = null;
  private validationMessages: {[key: string]: { [key: string]: string }}
  private genericValidator: ValidationMessage;
 public displayMessage: { [key: string]: string } = {};

 public readonly loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
     password: new FormControl(null, Validators.compose([
       Validators.required,
       Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/)
      ]))
 });

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly titleService: Title,
    private readonly route: ActivatedRoute,
  ) { 
   
    this.validationMessages = {

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
 /*   this.route.queryParamMap.subscribe((qs) => {
      const msg: string = qs.get('msg');
      if (msg !== null) {
        if (msg === 'already-activated') {
          // @ts-ignore
          M.toast({ html: 'You account has already been activated.', classes: "warning" });
        } else {
          // @ts-ignore
          M.toast({ html: 'Successfully activated account.', classes: "success" });
        }
      }
    });*/
    this.titleService.setTitle("Cinepal | Login");

  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
       console.log(this.formInputElements);
    merge(this.loginForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.loginForm);
         console.log(this.displayMessage)
         console.log(value)
    });
  }



  public login(): void {
    if (this.loginForm.valid) {
      const credentials: LoginCredentials = this.loginForm.getRawValue();
      this.subscriptions.push(
        this.authService.login(credentials).subscribe(
          (res: LoginResponse ) => {
            this.showSpinner = true;
            localStorage.setItem("token", res.token.access_token);
          //  localStorage.setItem("user", JSON.stringify(res.user));

            // @ts-ignore
         //   to.toast({ html: "Welcome back " + res.user.name, displayLength: 1750 });
                   this.message = res.message
            setTimeout(() => {
            //  this.router.navigateByUrl("/movies");
            console.log("Login is successfully")
            this.success = true;
            debounceTime(800)
            }, 2500);
          },
          (error: HttpErrorResponse) => {
        
            // @ts-ignore
          //  to.toast({ html: this.error, classes: "error" });
       //   this.message = this.error
               this.error = error.status + " " + error.statusText;
               this.message = this.error
               this.success = false;
          }
        ),
        this.authService.me().subscribe(
                  (data: UserInfo) => {
                    localStorage.setItem("user", JSON.stringify(data));         
                  }   
        )
      );
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }


}
