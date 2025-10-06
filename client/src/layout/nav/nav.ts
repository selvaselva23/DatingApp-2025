import {inject,signal, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../Core/services/account-service';
import { RouterLink } from '@angular/router';
import { RouterLinkActive} from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../../Core/services/toast-service';
import { themes } from '../theme';


@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav implements OnInit{

  protected accountService = inject(AccountService)
  protected creds: any = {}
  private router = inject(Router)
  private toast = inject(ToastService)
  protected selectedTheme = signal<string>(localStorage.getItem('theme') || 'light');

  protected themes = themes;


    ngOnInit(): void {
    document.documentElement.setAttribute('data-theme', this.selectedTheme());
  }


  handleSelectTheme(theme:string){
    this.selectedTheme.set(theme);
    localStorage.setItem('theme',theme)
    document.documentElement.setAttribute('data-theme', theme);
    const element = document.activeElement as HTMLDivElement;
    if(element) element.blur();
  }


  login(){
    console.log("test method");
    this.accountService.login(this.creds).subscribe(
      {
        next : () =>{

         this.router.navigateByUrl('/members');
         this.toast.success('Logged in success')
         this.creds={};
        },
        error : erros => {
          console.log(erros);

          this.toast.error(erros.error)

        }   
      }
    )
  }


  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }

}
