import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Snapshot } from '../models/snapshot';

type ConnState = 'idle' | 'connecting' | 'open' | 'closed' | 'error';

@Injectable({ providedIn: 'root' })
export class WsUsageService {
   private socket?: WebSocket;

  private currentSubject = new BehaviorSubject<Snapshot | null>(null);
  current$ = this.currentSubject.asObservable();

  private statusSubject = new BehaviorSubject<'closed'|'opening'|'open'|'error'>('closed');
  status$ = this.statusSubject.asObservable();

  constructor(private zone: NgZone) {}
  
  connect(phone: string) {
    this.disconnect();
    this.currentSubject.next(null);

    const base = environment.WS_BASE;
    const url = `${base}/ws/usage?phone_number=${encodeURIComponent(phone)}`;

    this.statusSubject.next('opening');
    this.socket = new WebSocket(url);

    this.socket.onopen = () => this.zone.run(() => this.statusSubject.next('open'));

    this.socket.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        console.log('WS msg:', msg);
        if (msg?.type === 'snapshot') {
          this.zone.run(() => this.currentSubject.next(msg as Snapshot));
        } else if (msg?.type === 'error') {
          this.zone.run(() => this.statusSubject.next('error'));
        }
      } catch (e) {
        console.error(e);
      }
    };

    this.socket.onerror = () => this.zone.run(() => this.statusSubject.next('error'));
    this.socket.onclose  = () => this.zone.run(() => {
      this.statusSubject.next('closed');
      this.currentSubject.next(null);
    });
  }

  disconnect() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.close();
    }
    this.socket = undefined;
    
    this.currentSubject.next(null);
    this.statusSubject.next('closed');
  }
}
