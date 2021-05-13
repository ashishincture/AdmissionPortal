import { FormControl, FormGroup, Validators } from '@angular/forms';


export class Data {
    sNo:number;
    Core:number;
    OE:number;
    PE:number;

  static asFormGroup(subject: any): FormGroup {
    const fg = new FormGroup({
        sNo: new FormControl(subject.sNo, Validators.required),
        Core: new FormControl(subject.Core, Validators.required),
        OE: new FormControl(subject.OE, Validators.required),
        PE: new FormControl(subject.PE, Validators.required)
    });
    return fg;
  }
}