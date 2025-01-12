import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private historySubject = new BehaviorSubject<string[]>([]);
  history$ = this.historySubject.asObservable();

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    const history = await this.storage.get('scannedCodesHistory') || [];
    this.historySubject.next(history);
  }

  async addToHistory(detectedTexts: any[]) {
    const textValues = detectedTexts.map(item => item.text || item);  // Extrahování textu
    const currentHistory = this.historySubject.value;
    currentHistory.unshift(...textValues);
    await this.storage.set('scannedCodesHistory', currentHistory);
    this.historySubject.next(currentHistory);
  }

  async clearHistory() {
    await this.storage.remove('scannedCodesHistory');
    this.historySubject.next([]);
  }
}
