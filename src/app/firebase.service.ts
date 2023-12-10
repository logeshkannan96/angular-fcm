import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { NotificationPayload, getMessaging, getToken, onMessage } from "firebase/messaging";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
  };
  VAPID_KEY = "<ADD_PUBLIC_KEY_FROM_FIREBASE_WEB_PUSH_CERTIFICATES>";
  notifications = new BehaviorSubject<NotificationPayload>({});

  app = initializeApp(this.firebaseConfig);
  messaging = getMessaging(this.app);
  constructor() { 
    this.getFcmToken();
    this.setupMessageHandler();
  }

  async getFcmToken() {
    const fcmToken = await getToken(this.messaging, { vapidKey: this.VAPID_KEY });
    if (fcmToken) {
      console.log(fcmToken);
    }
  }

  setupMessageHandler() {
    onMessage(this.messaging, (payload) => {
      if (payload.notification) {
        this.notifications.next(payload.notification);
      }
    });
  };
}
