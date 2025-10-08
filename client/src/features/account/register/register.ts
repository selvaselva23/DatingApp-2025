import { Component, input,output,inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterCreds, User } from '../../../Types/User';
import { AccountService } from '../../../Core/services/account-service';
import { JsonPipe } from '@angular/common';
import { ValidatorFn } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';
import { TextInput } from '../../../shared/text-input/text-input';
import { FormBuilder } from '@angular/forms';
import { signal } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,JsonPipe,TextInput],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register  {


  private accountService = inject(AccountService);
   cancelRegister = output<boolean>();

   private fb = inject(FormBuilder);
    private router = inject(Router);
  protected creds = {} as RegisterCreds;
  protected credentialsForm: FormGroup;
  protected profileForm: FormGroup;
   protected currentStep = signal(1);
  protected validationErrors = signal<string[]>([]);

 

constructor(){
  this.credentialsForm  = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      displayName: ['', Validators.required],
      password: ['', [Validators.required,
      Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });
    this.credentialsForm.controls['password'].valueChanges.subscribe(()=>{
      this.credentialsForm.controls['confirmPassword'].updateValueAndValidity();
    })

    this.profileForm = this.fb.group({
      gender: ['male', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    })

}



 matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;
      if (!parent) return null;

      const matchValue = parent.get(matchTo)?.value;
      return control.value === matchValue ? null : { passwordMismatch: true }
    }
  }

  nextStep() {
    if (this.credentialsForm.valid) {
      this.currentStep.update(prevStep => prevStep + 1);
    }
  }

   prevStep() {
    this.currentStep.update(prevStep => prevStep - 1);
  }

  register(){
    
if (this.profileForm.valid && this.credentialsForm.valid) {
  const formData = { ...this.credentialsForm.value, ...this.profileForm.value };
  this.accountService.register(formData).subscribe({
        next: () => {
          this.router.navigateByUrl('/members');
        },
        error: error => {
          console.log(error);
          this.validationErrors.set(error)
        }
      })

}
}

   getMaxDate() {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split('T')[0];
  }

  cancel(){
    console.log('canselled');

    this.cancelRegister.emit(false);
  }
}
