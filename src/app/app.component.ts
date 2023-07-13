import { Component } from '@angular/core';
import { PushNotificationsService } from './services/push-notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private _pushNotifService: PushNotificationsService) {}
}
