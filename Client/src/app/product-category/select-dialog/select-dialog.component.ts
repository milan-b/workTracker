import { Component, Inject } from '@angular/core';
import { TreeNode } from 'src/app/shared';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-select-dialog',
  templateUrl: './select-dialog.component.html',
  styleUrls: ['./select-dialog.component.scss']
})
export class SelectDialogComponent {

  selectedItem: TreeNode | undefined;

  constructor(
    public dialogRef: MatDialogRef<SelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log(this.data, 'ovo je iz modala');
  }

  cancel(): void {
    this.dialogRef.close();
  }

  onSelect(selected: any): void{
   this.selectedItem = selected;
   console.log(selected, 'selected');
  }
  

}
