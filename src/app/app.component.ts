import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { NotificationPayload } from '@firebase/messaging';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
  notifications: NotificationPayload[] = [];
  constructor(private firebase: FirebaseService) { }

  ngOnInit() {
    this.firebase.notifications.subscribe((payload: NotificationPayload) => {
      if(payload.body) this.notifications.push(payload);
    });
  }
}
