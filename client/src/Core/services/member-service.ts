import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Member, Photo } from '../../Types/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private http = inject(HttpClient)
  private baseUrl = environment.apiUrl


  getMembers(){
    return this.http.get<Member[]>(this.baseUrl+'/members');
  }

  getMember(id: string){
    return this.http.get<Member>(this.baseUrl +'/members/'+id)
  }


  getMemberPhotos(id:string){
    return this.http.get<Photo[]>(this.baseUrl +'/members/'+id+ '/photos');
  }

  
}
