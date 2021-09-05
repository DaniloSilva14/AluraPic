import { Component } from '@angular/core';
import { SignUpService } from './signup/signup.service';

@Component({
    templateUrl: './home.component.html',
    providers: [
      SignUpService
    ]
})
export class HomeComponent { }
