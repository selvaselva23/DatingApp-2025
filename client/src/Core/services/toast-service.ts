import { Injectable } from '@angular/core';
import { appConfig } from '../../app/app.config';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(){
    this.createToastContainer();
  }

  private createToastContainer(){

    if(!document.getElementById('toast-container')){
      const container = document.createElement('div')
      container.id='toast-container';
      container.className='toast toast-bottom toast-end';
      document.body.appendChild(container)

    }
  }

  private createToastElement(message: string, alertClass:string, duration= 5000){
    const tosatContainer= document.getElementById('toast-container');

    if(!tosatContainer) return;

    const toast = document.createElement('div');
    toast.classList.add('alert',alertClass ,'shadow-lg');
    toast.innerHTML=`
    <span>${message}</span>
    <button class="ml-4 btn btn-sm btn-ghost">x</button>
    `


    toast.querySelector('button')?.addEventListener('click',() => {
      tosatContainer.removeChild(toast);
    })

    tosatContainer.append(toast);

    setTimeout(()=>{
      if(tosatContainer.contains(toast)){
        tosatContainer.removeChild(toast);
      }
    },duration)
  }

  success(message:string,duration?:number){
    this.createToastElement(message,'alert-success',duration);
  }

  error(message:string,duration?:number){
    this.createToastElement(message,'alert-error',duration);
  }

  warning(message:string,duration?:number){
    this.createToastElement(message,'alert-warning',duration);
  }

  info(message:string,duration?:number){
    this.createToastElement(message,'alert-info',duration);
  }
  
}
