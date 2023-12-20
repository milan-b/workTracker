import { Component, Inject, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WorkLogEntry } from '../work-log-entry.model';

import domToImage from 'dom-to-image';
import {jsPDF, jsPDFOptions} from 'jspdf';
import * as moment from 'moment';
import { WorkLog } from 'src/app/work-log/work-log.model';


@Component({
  selector: 'app-document-dialog',
  templateUrl: './document-dialog.component.html',
  styleUrls: ['./document-dialog.component.scss']
})
export class DocumentDialogComponent {

  @ViewChild('document')
  public document!: ElementRef;
  pdfName: string = '';

  constructor(
    public dialogRef: MatDialogRef<DocumentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {entries: WorkLogEntry[], workLog: WorkLog},
  ) {
    this.pdfName = moment().format('YYYY.MM.DD') + ' - ' + data.workLog.projectName;
  }

  cancel(){
    this.dialogRef.close();
  }

  public downloadAsPdf(): void {
    const width = this.document.nativeElement.clientWidth;
    const height = this.document.nativeElement.clientHeight + 40;

    domToImage
      .toPng(this.document.nativeElement, {
        width: width,
        height: height
      })
      .then(result => {
        let jsPdfOptions : jsPDFOptions = {
          orientation: 'p',
          unit: 'pt',
          format: [width + 50, height + 220]
        } ;
        const pdf = new jsPDF(jsPdfOptions);
        // pdf.setFontSize(48);
        // pdf.setTextColor('#2585fe');
        // pdf.text(this.pdfName.value ? this.pdfName.value.toUpperCase() : 'Untitled dashboard'.toUpperCase(), 25, 75);
         pdf.setFontSize(12);
        // pdf.setTextColor('#131523');
        pdf.text(moment().format('DD.MM.YYYY'), 25, 25);
        pdf.addImage(result, 'PNG', 25, 50, width, height);
        pdf.save(this.pdfName + '.pdf');
      })
      .catch(error => {
        console.error(error);
      });
  }


}