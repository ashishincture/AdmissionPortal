import { Component, OnInit, Inject } from '@angular/core';
import * as XLSX from 'xlsx';
import { ApiMarksUploadService } from '../data/api-marks-upload.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-marks-upload',
  templateUrl: './dialog-marks-upload.component.html',
  styleUrls: ['./dialog-marks-upload.component.css']
})

export class DialogMarksUploadComponent implements OnInit {
  file: any;
  fileName: any;
  arrayBuffer: any;

  aExcelData = [];
  disablePreviewButton = true;
  disableUploadButton = true;
  oSelectedFilterData = {};

  constructor(private _ApiMarksUploadService: ApiMarksUploadService, public dialogRef: MatDialogRef<DialogMarksUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.oSelectedFilterData = data.payloadD;

  }

  onDownloadRequest() {
    let oPayload = this.oSelectedFilterData;
    console.log(oPayload);

    var payload =
    {

      "reg_id": "R1",
      "dep_id": "CR0001",
      "ins_id": "IN0010",
      "sem_no": "1",
      "acad": "2021",
      "cur_no": "CR03",
      "sub_code": "R1IT002"

    };

    this._ApiMarksUploadService.getResponseBlob(payload).subscribe(data => {
      this.downloadFile(data, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "export.xlsx");

    });
  }

  downloadFile(blob: any, type: string, filename: string) {
    var binaryData = [];
    binaryData.push(blob);

    const url = window.URL.createObjectURL(new Blob(binaryData, { type: type })); // <-- work with blob directly

    // create hidden dom element (so it works in all browsers)
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);

    // create file, attach to hidden element and open hidden element
    a.href = url;
    a.download = filename;
    a.click();
  }

  addfile(event: any) {

    console.log(this.oSelectedFilterData);
    this.file = event.target.files[0];
    this.fileName = this.file.name;

    console.log(this.file.length);
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      // console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));    
      this.aExcelData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.dialogRef.componentInstance.data = { aExcelData: this.aExcelData }
      this.disablePreviewButton = false;
      this.disableUploadButton = false;

    }
  }

  uploadData() {

    this._ApiMarksUploadService.postExcelData(this.aExcelData).subscribe(data => {
      console.log(data);
      alert("Marks uploaded successfully");
    },
      error => alert(error));

  }


  ngOnInit(): void {
  }

}

