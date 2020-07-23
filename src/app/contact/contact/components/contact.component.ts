import { ValidationMessage } from './../../../shared/helper/validation-message';
import { contactResponse } from './../../../shared/models/IGetContact';
import { Subscription , Observable , merge, pipe , fromEvent } from 'rxjs';
import { ContactService } from './../../../shared/services/contact/contact.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, AfterViewInit, OnDestroy , ViewChildren , ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators , FormBuilder ,FormControlName } from "@angular/forms";
import { Contact } from 'src/app/shared/models/IGetContact';
import { HttpErrorResponse } from "@angular/common/http";
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, AfterViewInit ,OnDestroy {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  private subscriptions: Array<Subscription> = new Array<Subscription>();
  public error: string = null;
  public message: string = ''
  public success = null;
  private validationMessages: {[key: string]: { [key: string]: string }}
  private genericValidator: ValidationMessage;
  public displayMessage: { [key: string]: string } = {};

  public readonly contactForm: FormGroup = new FormGroup({
    contName: new FormControl(null, Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(250)
    ])) ,
    contEmail: new FormControl(null, [Validators.required, Validators.email]),
      contSubject: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(3)
     ])),
      contMessage: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(5)
]))      
  });


  constructor(
    private readonly titleService: Title,
    private readonly contactService: ContactService
  ) {

    this.validationMessages = {
      contName:{
         required: 'Contact name is required.',
         minlength: 'Contact name have min 3 characters',
         maxlength: 'Contact name have max 250 characters'
      },
      contEmail: {
       required: 'Email is required.',
       email: 'Email is not valid'
     },
     contSubject:{
      required: 'Subject is required.',
      minlength: 'Subject must have min 3 characters'
    },
    contMessage: {
       required: 'Message is required.',
       minlength: 'Message must have min 5 characters'
     }
   }; 


   this.genericValidator = new ValidationMessage(this.validationMessages)

   }

  ngOnInit(): void {
    this.titleService.setTitle('Cinepal | Contact');
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
       console.log(this.formInputElements);
    merge(this.contactForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.contactForm);
         console.log(this.displayMessage)
         console.log(value)
    });
  }


  public contact(): void {
    if (this.contactForm.valid) {
      const data: Contact = this.contactForm.getRawValue();
        this.subscriptions.push(
        this.contactService.sendContact(data).subscribe(
          (res: contactResponse) => {
            this.contactForm.reset();
            // @ts-ignore
          //  M.toast({ html: message, classes: "success", displayLength: 1750 });
                this.message = res.message
                console.log("Contact data is successfully send")
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
