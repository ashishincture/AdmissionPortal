import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isLoading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
}
