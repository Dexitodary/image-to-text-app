import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../services/history.service';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';
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

  constructor(
    private historyService: HistoryService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.historyService.history$.subscribe(history => {
      this.scannedTextsHistory = history;
    });
  }

  async copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Text copied to clipboard:', text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }

  async confirmClearHistory() {
    const alert = await this.alertController.create({
      header: 'Confirm Clear History',
      message: 'Are you sure you want to clear the scanned texts history?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Clear history cancelled');
          }
        },
        {
          text: 'Clear',
          role: 'destructive',
          handler: async () => {
            await this.historyService.clearHistory();
            console.log('History cleared');
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteItem(index: number) {
    const updatedHistory = this.scannedTextsHistory.slice();
    updatedHistory.splice(index, 1);
    await this.historyService.updateHistory(updatedHistory);
  } 
}
