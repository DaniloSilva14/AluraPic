import { PlatformDetectorService } from './../../core/platform-detector/platform-detector';
import { SignUpService } from './signup.service';
import { NewUser } from './new-user';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { Router } from '@angular/router';
import { userNamePassword } from './username-password.validator';

@Component ({
  templateUrl: './signup.component.html',
  providers: [UserNotTakenValidatorService]
})

export class SignUpComponent implements OnInit {

  signupForm: FormGroup;
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;
  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signUpService: SignUpService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService
    ) {}

    ngAfterViewInit(): void {
      if(this.platformDetectorService.isPlatformBrowser()) {
       this.emailInput.nativeElement.focus();
     }
   }
  ngOnInit(): void {

      this.signupForm = this.formBuilder.group({
          email: ['',
              [
                  Validators.required,
                  Validators.email
              ]
          ],
          fullName: ['',
              [
                  Validators.required,
                  Validators.minLength(2),
                  Validators.maxLength(40)
              ]
          ],
          userName: ['',
              [
                  Validators.required,
                  lowerCaseValidator,
                  Validators.minLength(2),
                  Validators.maxLength(30)
              ],
              this.userNotTakenValidatorService.checkUserNameTaken()
          ],
          password: ['',
              [
                  Validators.required,
                  Validators.minLength(8),
                  Validators.maxLength(18)
              ]
          ]
      }, {
          validator: userNamePassword
      });
  }

  signup() {
    if(this.signupForm.valid && !this.signupForm.pending){
        const newUser = this.signupForm.getRawValue() as NewUser;
        this.signUpService
            .signup(newUser)
            .subscribe(
                () => this.router.navigate(['']),
                err => console.log(err)
            );
    }
    
  }
}
