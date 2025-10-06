import { Component, signal,inject ,OnInit} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import {Nav} from '../layout/nav/nav';
import { AccountService } from '../Core/services/account-service';
import { Home } from "../features/home/home";

@Component({
  selector: 'app-root',
  imports: [Nav, Home,RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  {

  protected router = inject(Router);


}
