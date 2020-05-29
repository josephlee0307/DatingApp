import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() dataFromParent: any;
  @Output() registerCancelled = new EventEmitter();
  model: any = {};
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-blue'
    };
    // this.registerForm = new FormGroup({
    //   name: new FormControl('', Validators.required),
    //   password: new FormControl('',
    //     [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('',
    //     Validators.required)
    // }, this.passwordMatchValidator);

    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      name: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(fg: FormGroup) {
    return fg.get('password').value === fg.get('confirmPassword').value ? null : { mismatch: true };
  }

  register() {
    // console.log(this.registerForm.value);

    if (this.registerForm.valid) {
        this.user = Object.assign({}, this.registerForm.value);

        this.authService.register(this.user).subscribe(
          () => {
            this.alertifyService.success('Registraion successful');
          },
          error => {
            this.alertifyService.error(error);
          },
          () => {
            this.authService.login(this.user).subscribe(
              () => {
                this.router.navigate(['/members']);
              }
            );
          }
        );
    }

    // console.log(this.model);
    // this.authService.register(this.model).subscribe(() => {
    //     this.alertifyService.success('registration successful');
    //   },
    //   error => {
    //     this.alertifyService.error(error);
    //   }
    // );
  }

  cancel() {
    this.registerCancelled.emit(false);
  }

}
