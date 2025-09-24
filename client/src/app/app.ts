import { Component, signal,inject ,OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected  title = 'Dating App';
  protected members = signal<any>([]);

  async ngOnInit(){
    this,this.members.set(await this.getMembers())
    
  }


 async getMembers(){
   try{
      return lastValueFrom(this.http.get("https://localhost:5001/api/members")) ;
    }
    catch(error){
    console.log(error);
    throw error;
    }
  }

}
