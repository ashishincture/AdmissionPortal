import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA ,MatDialogRef} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Globals } from '../globals';
@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.css']
})
export class DialogExampleComponent implements OnInit {
  public sum : number
  public dataQuotaArray = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private toastr: ToastrService, private dialogRef: MatDialogRef<DialogExampleComponent>,
  ) {
    this.sum = 0;
   }  ;
    
  
  Quota_name: string;
  Quota_percentage: string;
  //  sum: number
  ngOnInit(): void {
  }
  onPressAddQuota(){
   let dataTemplate={
      Quota_name:this.Quota_name,
      Quota_percentage:this.Quota_percentage
    };
    this.sum=this.sum + parseInt(this.Quota_percentage);
    if(this.sum===100)
    { this.dataQuotaArray.push(dataTemplate);
      this.dialogRef.close(this.dataQuotaArray);}
      else if(this.sum>100){
        this.toastr.error('Sum of percentage should not exeed 100%', 'Error');
        this.sum=this.sum - parseInt(this.Quota_percentage);
        this.Quota_percentage="";
        this.Quota_name="";
      }
  else{
    this.dataQuotaArray.push(dataTemplate);
  }
    
  }
  onPressCloseDialog(){

  }
}
