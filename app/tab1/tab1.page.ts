import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Component } from '@angular/core';
import { Ocr, TextDetections } from '@capacitor-community/image-to-text';
import { HistoryService } from '../services/history.service';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonItem,
  IonLabel,
  IonList
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  imports: [
    CommonModule,
    IonLabel,
    IonItem,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList
  ]
})
export class Tab1Page {
  textDetections: any[] = [];

  constructor(private historyService: HistoryService) {}

  async scanNow() {
    try {
      console.log("Scanning started...");
      
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });
  
      console.log("Image taken:", photo);
  
      const data: TextDetections = await Ocr.detectText({
        filename: photo.path!,
      });
  
      console.log("OCR result:", data);
  
      if (data?.textDetections?.length) {
        this.textDetections = data.textDetections;
        await this.historyService.addToHistory(this.textDetections);
        console.log("Text detected:", this.textDetections);
      } else {
        console.log("No text was detected.");
      }
    } catch (error) {
      console.error("Scanning failed:", error);
    }
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
