import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
      private appService: AppService,
      private dialogRef: MatDialogRef<DeleteComponent>,) { }

  ngOnInit(): void {
  }

  deleteEmployee() {
    this.appService.deleteEmployee(this.data).subscribe(res => {
      
    })
    this.onConfirm();
  }


  onConfirm(): void {
    this.dialogRef.close();
  }

}
