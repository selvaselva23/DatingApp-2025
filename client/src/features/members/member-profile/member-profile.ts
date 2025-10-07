import { Component, HostListener, inject, OnDestroy, OnInit, signal, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditableMember, Member } from '../../../Types/member';
import { DatePipe } from '@angular/common';
import { MemberService } from '../../../Core/services/member-service';
import { FormsModule, NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { ToastService } from '../../../Core/services/toast-service';
import { AccountService } from '../../../Core/services/account-service';


@Component({
  selector: 'app-member-profile',
  imports: [DatePipe,FormsModule],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css'
})
export class MemberProfile  implements OnInit,OnDestroy{


  @ViewChild('editForm') editForm?:NgForm
@HostListener('window:beforeunload',['$event']) notify($event:BeforeUnloadEvent){
  if(this.editForm?.dirty){
    $event.preventDefault();
  }
}

  protected memberService = inject(MemberService)

  protected editableMember:EditableMember = {
    displayName:'',
    description:'',
    city:'',
    country:''
  }
  private toast = inject(ToastService)
  private accountService = inject(AccountService);


  constructor(){
   
  }

  ngOnInit(){
       this.editableMember ={
       displayName: this.memberService.member()?.displayName || '',
       description: this.memberService.member()?.description || '',
       city: this.memberService.member()?.city || '',
       country: this.memberService.member()?.country || '',
    }
  }

    updateProfile() {
      if(!this.memberService.member()) return;
      const updateMember = {...this.memberService.member(), ...this.editableMember}
      this.memberService.updateMember(this.editableMember).subscribe({
        next: () =>{
          const currentUser = this.accountService.currentUser();
          if(currentUser && updateMember.displayName !== currentUser?.displayName){
            currentUser.displayName = updateMember.displayName;
            this.accountService.setCurrentUser(currentUser);
          }
          this.toast.success('profile Updated successfully');
        
          this.memberService.editMode.set(false);
          this.memberService.member.set(updateMember as Member)
          this.editForm?.reset(updateMember);
        }
      })
    }

  ngOnDestroy(): void {
    if(this.memberService.editMode()){
      this.memberService.editMode.set(false);
    }
  }
  

}
