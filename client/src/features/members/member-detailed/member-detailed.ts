import { Component,computed,inject, OnInit } from '@angular/core';
import { MemberService } from '../../../Core/services/member-service';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { filter, Observable } from 'rxjs';
import { Member } from '../../../Types/member';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { AgePipe } from '../../../Core/pipes/age-pipe';
import { AccountService } from '../../../Core/services/account-service';

@Component({
  selector: 'app-member-detailed',
  imports: [ RouterLink,RouterLinkActive,RouterOutlet,AgePipe],
  templateUrl: './member-detailed.html',
  styleUrl: './member-detailed.css'
})
export class MemberDetailed implements OnInit {
 
  protected memberService = inject(MemberService);
  private accountService = inject(AccountService);

  private route = inject(ActivatedRoute)
  private router = inject(Router);
  protected title = signal<string | undefined>('Profile');

  protected isCurrentUser = computed(()=>{
 return this.accountService.currentUser()?.id === this.route.snapshot.paramMap.get('id');
  })

   ngOnInit(): void {
  
   
    this.title.set(this.route.firstChild?.snapshot.title);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe({
      next:() =>{
        this.title.set(this.route.firstChild?.snapshot?.title)
      }
    })

  }


}
