import { Component } from '@angular/core';
import { MemberService } from '../../../Core/services/member-service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../../../Types/member';
import { AsyncPipe } from '@angular/common';
import { MemberCard } from '../member-card/member-card';

@Component({
  selector: 'app-member-list',
  imports: [AsyncPipe,MemberCard],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css'
})
export class MemberList {

  private memberService = inject(MemberService)

  protected members$:Observable<Member[]>;

  constructor(){
    this.members$ = this.memberService.getMembers();
  }

}
