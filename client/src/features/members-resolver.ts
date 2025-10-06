import { ResolveFn, Router } from '@angular/router';
import { MemberService } from '../Core/services/member-service';
import { inject } from '@angular/core';
import { Member } from '../Types/member';
import { EMPTY } from 'rxjs';

export const membersResolver: ResolveFn<Member> = (route, state) => {

  const memberService = inject(MemberService);
  const router = inject(Router)
  const memberId = route.paramMap.get('id');
  if(!memberId){
    router.navigateByUrl('/not=found')
    return EMPTY;
  }

  

  return memberService.getMember(memberId)

};
