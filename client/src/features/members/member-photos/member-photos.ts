import { Component, inject, OnInit, signal } from '@angular/core';
import { MemberService } from '../../../Core/services/member-service';
import { ActivatedRoute } from '@angular/router';
import { Observable, single } from 'rxjs';
import { Member, Photo } from '../../../Types/member';
import { AsyncPipe } from '@angular/common';
import { ImageUpload } from '../../../shared/image-upload/image-upload';
import { AccountService } from '../../../Core/services/account-service';
import { User } from '../../../Types/User';
import { StarButton } from '../../../shared/star-button/star-button';
import { DeleteButton } from '../../../shared/delete-button/delete-button';

@Component({
  selector: 'app-member-photos',
  imports: [ImageUpload,StarButton,DeleteButton],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css'
})
export class MemberPhotos implements OnInit {

  protected memberService = inject(MemberService)
  private route = inject(ActivatedRoute);
protected accountSercei = inject(AccountService);
 
  protected photos = signal<Photo[]>([])

  protected loading = signal(false)


  ngOnInit(): void {
       const memberId = this.route.parent?.snapshot.paramMap.get('id');

    if(memberId){

      this.memberService.getMemberPhotos(memberId).subscribe({
        next: photos => this.photos.set(photos)
      });
    }
  }


  get photoMocks() {
     return Array.from({length:20},(_,i) =>({
      url:'/user.png'
     }))
  }

  onUploadImage(file:File){
    this.loading.set(true);

    this.memberService.uploadPhoto(file).subscribe({
      next: photo => {
        this.memberService.editMode.set(false);
        this.loading.set(false);
        this.photos.update(photos => [...photos,photo])
      },
      error: error =>{
        console.log('error uploading image ',error)
        this.loading.set(false);
      }
    })
  }


  setMainPhoto(photo: Photo){
    this.memberService.setMainPhoto(photo).subscribe({
    next: ()=>{
      const currentUser = this.accountSercei.currentUser();

      if(currentUser) currentUser.imageUrl = photo.url;
      this.accountSercei.setCurrentUser(currentUser as User);

      this.memberService.member.update(member => ({
        ...member,
        imageurl:photo.url
      }) as Member)
      }
    })
  }

deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe({
      next: () => {
        this.photos.update(photos => photos.filter(x => x.id !== photoId))
      }
    })
  }
}
