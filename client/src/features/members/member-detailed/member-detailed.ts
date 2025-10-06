import { Component,inject, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-member-detailed',
  imports: [ RouterLink,RouterLinkActive,RouterOutlet,AgePipe],
  templateUrl: './member-detailed.html',
  styleUrl: './member-detailed.css'
})
export class MemberDetailed implements OnInit {
 
  private memberService = inject(MemberService);

  private route = inject(ActivatedRoute)
  protected member =signal<Member | undefined>(undefined);
  private router = inject(Router);
  protected title = signal<string | undefined>('Profile');

   ngOnInit(): void {
  
  this.route.data.subscribe({
    next: data => this.member.set(data['member'])
  })
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
