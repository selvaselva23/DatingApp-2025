import { Component, input,output,inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds, User } from '../../../Types/User';
import { AccountService } from '../../../Core/services/account-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  private accountService = inject(AccountService);
   cancelRegister = output<boolean>();

  protected creds = {} as RegisterCreds;

  register(){
    console.log(this.creds);
    this.accountService.register(this.creds).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error => console.log(error)
      
    })
  }

  cancel(){
    console.log('canselled');

    this.cancelRegister.emit(false);
  }
}
