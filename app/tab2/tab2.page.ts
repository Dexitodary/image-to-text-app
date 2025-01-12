import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../services/history.service';
import { CommonModule } from '@angular/common';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonItem,
    IonList,
    IonLabel
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  imports: [
    CommonModule,
    IonItem,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonLabel
  ]
})
export class Tab2Page implements OnInit {
  scannedTextsHistory: string[] = [];

  constructor(private historyService: HistoryService) {}

  ngOnInit() {
    this.historyService.history$.subscribe(history => {
      this.scannedTextsHistory = history;
    });
  }

  async clearHistory() {
    await this.historyService.clearHistory();
  }

  async copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Text copied to clipboard:', text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }
}
