import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA ,MatDialogRef} from '@angular/material/dialog';
import { Globals } from '../globals';
@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.css']
})
export class DialogExampleComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DialogExampleComponent>,
  ) {
    
   }  ;
    
  
  Quota_name: string;
  Quota_percentage: string;
   
  ngOnInit(): void {
  }
  onPressAddQuota(){
   let dataTemplate={
      Quota_name:this.Quota_name,
      Quota_percentage:this.Quota_percentage
    };
    this.dialogRef.close(dataTemplate);
  }
  onPressCloseDialog(){

  }
}
