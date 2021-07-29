import { OnInit, Inject } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injectable,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { CalendarEvent, CalendarEventTitleFormatter, CalendarViewPeriod } from 'angular-calendar';
import { WeekViewHourSegment } from 'calendar-utils';
import { fromEvent } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { addDays, addHours, addMinutes, endOfWeek } from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
// import { addDays, addHours, startOfDay } from 'date-fns';


import { colors } from '../demo-utils/colors';
import { DOCUMENT } from '@angular/common';


function floorToNearest(amount: number, precision: number) {
  return Math.floor(amount / precision) * precision;
}
interface Semester {
  num: string;
}

export interface TimetableDetails {
  eventId: number;
  subject_name: string;
  subject_code: number;
  venue: string;
  facultyName: string;
  subFacultyName: string;
  start: string;
  end: string;
}

const TIME_METADATA: TimetableDetails[] = [];

function ceilToNearest(amount: number, precision: number) {
  return Math.ceil(amount / precision) * precision;
}

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  weekTooltip(event: CalendarEvent, title: string): any {
    if (!event.meta.tmpEvent) {
      return super.weekTooltip(event, title);
    }
  }

  dayTooltip(event: CalendarEvent, title: string): any {
    if (!event.meta.tmpEvent) {
      return super.dayTooltip(event, title);
    }
  }
}

@Component({
  selector: 'app-timetable-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './timetable-view.component.html',
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
  styleUrls: ['./timetable-view.component.css', './timetable-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimetableViewComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  viewDate = new Date();

  events: CalendarEvent[] = [];

  excludeDays: number[] = [0];

  dragToCreateActive = false;

  weekStartsOn: 0 = 0;

  details_data: TimetableDetails[] = [];


  // {
  //   eventId: number;
  //   subject_name: string;
  //   subject_code: number;
  //   venue: string;
  //   facultyName: string;
  //   subFacultyName: string;
  // };

  semester: Semester[] = [
    { num: '1' },
    { num: '2' },
    { num: '3' },
    { num: '4' }
  ];
  selectedCourse: string = "";
  selectedBranch: string = "";
  selectedSemester: any = "";
  modalData: {
    venue: string;
    event: CalendarEvent;
    staff: string;
    contact: string;
  };

  p: TimetableDetails[] = [

    {
      eventId: 0,
      subject_name: "",
      subject_code: 0,
      venue: "",
      facultyName: "",
      subFacultyName: "",
      start: "",
      end: ""
    }

  ];

  selectedEvent: TimetableDetails[] = [

    {
      eventId: 0,
      subject_name: "",
      subject_code: 0,
      venue: "",
      facultyName: "",
      subFacultyName: "",
      start: "",
      end: ""
    }

  ];

  currentId: number;
  currentStart: string;
  currentEnd: string;
  noOfHours: number;
  eventExists: boolean = false;


  private readonly darkThemeClass = 'dark-theme';
  constructor(private cdr: ChangeDetectorRef, private modal: NgbModal, @Inject(DOCUMENT) private document) { }

  ngOnInit(): void {
    this.document.body.classList.add(this.darkThemeClass);
  }
  // this.details_data = [...deta]
  startDragToCreate(
    segment: WeekViewHourSegment,
    mouseDownEvent: MouseEvent,
    segmentElement: HTMLElement,
    // segmentEnd: CalendarViewPeriod

  ) {
    const dragToSelectEvent: CalendarEvent = {
      id: this.events.length,
      title: 'New Subject',
      start: segment.date,
      end: addMinutes(segment.date, 15),
      meta: {
        tmpEvent: true,
      },
    };
    this.events = [...this.events, dragToSelectEvent];
    const segmentPosition = segmentElement.getBoundingClientRect();
    this.dragToCreateActive = true;
    const endOfView = endOfWeek(this.viewDate, {
      weekStartsOn: this.weekStartsOn,
    });

    fromEvent(document, 'mousemove')
      .pipe(
        finalize(() => {
          delete dragToSelectEvent.meta.tmpEvent;
          this.dragToCreateActive = false;
          this.refresh();
        }),
        takeUntil(fromEvent(document, 'mouseup'))
      )
      .subscribe((mouseMoveEvent: MouseEvent) => {
        const minutesDiff = ceilToNearest(
          mouseMoveEvent.clientY - segmentPosition.top,
          15
        );

        const daysDiff =
          floorToNearest(
            mouseMoveEvent.clientX - segmentPosition.left,
            segmentPosition.width
          ) / segmentPosition.width;

        const newEnd = addDays(addMinutes(segment.date, minutesDiff), daysDiff);
        if (newEnd > segment.date && newEnd < endOfView) {
          dragToSelectEvent.end = newEnd;
        }
        this.refresh();
      });
  }

  hourSegmentClicked(date: Date) {
    console.log(date);
    // this.selectedDayViewDate = date;
    // this.addSelectedDayViewClass();
  }

  handleEvent(venue: string, event: CalendarEvent, staff: string, contact: string): void {
    debugger;
    this.modalData = { venue, event, staff, contact };
    this.currentId = Number(event.id);

    let pipe = new DatePipe('en-US');


    var temp = event.end.getTime() - event.start.getTime(); //milliseconds
    this.noOfHours = Number((temp / (1000 * 60 * 60)) % 24);  //convert milliseconds to hours
    // console.log(this.noOfHours,"this.noOfHours");

    this.currentStart = pipe.transform(event.start, 'shortTime');
    this.currentEnd = pipe.transform(event.end, 'shortTime');


    for (var i = 0; i < this.details_data.length; i++) {
      if (this.details_data[i].eventId == event.id) {
        this.selectedEvent[0] = this.details_data[i];
        this.p[0] = this.details_data[i];//CHANGE
        break;
      }
    }
    this.modal.open(this.modalContent, { size: 'lg' });


    console.log(event);

  }

  addEvent() {
    

    const event:  CalendarEvent = {
        id: this.events.length,
        start: new Date(2021, 7, 29, 10, 30, 0, 0),
        end: new Date(2021, 7, 29, 11, 30, 0, 0),
        title: "newEvent",
        meta: {
          tmpEvent: true

        }

      }

      this.events = [...this.events, event];
  }

  deleteEvent() {
    this.details_data = this.details_data.filter((iEvent) => iEvent.eventId !== this.currentId);
    this.events = this.events.filter((iEvent) => iEvent.id !== this.currentId);
    this.modal.dismissAll();

    console.log(this.details_data);
    this.selectedEvent[0] = {
      eventId: 0,
      subject_name: "",
      subject_code: 0,
      venue: "",
      facultyName: "",
      subFacultyName: "",
      start: "",
      end: ""
    }

  }


  closeDialog() {
    debugger;
    // this.p[0].eventId = this.currentId;
    // this.p[0].start = this.currentStart;
    // this.p[0].end = this.currentEnd;


    // console.log(this.p[0]);
    // let index = 0;

    // for (var i = 0; i < this.events.length; i++) {
    //   if (this.events[i].id == this.currentId) {
    //     this.events[i].title = this.p[0].subject_name + " " + this.p[0].venue;
    //     break;
    //   }}

    // for (var i = 0; i < this.details_data.length; i++) {
    //   if (this.details_data[i].eventId == this.currentId) {
    //     index = i;
    //     this.eventExists = true;
    //     break;

    //   }}

    // if (this.eventExists) {
    //   this.events[index].title = this.p[0].subject_name + " " + this.p[0].venue;
    //   this.eventExists = false;
    // }
    // else {
    //   // this.events[index].title = this.p[0].subject_name + " " + this.p[0].venue;
    //   this.details_data.push(this.p[0]);

    // }


    // this.selectedEvent[0] = {
    //   eventId: 0,
    //   subject_name: "",
    //   subject_code: 0,
    //   venue: "",
    //   facultyName: "",
    //   subFacultyName: "",
    //   start: "",
    //   end: ""
    // }

    // this.modal.dismissAll();
    // console.log(this.details_data);

    this.p[0].eventId = this.currentId;
    this.p[0].start = this.currentStart;
    this.p[0].end = this.currentEnd;

    console.log(this.p[0]);
    let index = 0;

    for (var i = 0; i < this.events.length; i++) {
      if (this.events[i].id == this.currentId) {
        this.events[i].title = this.p[0].subject_name + " " + this.p[0].venue;
        // this.events[i].start = new Date();
        // this.events[i].end = new Date();

        this.events[i].start = new Date(this.p[0].start);



        break;
      }
    }

    for (var i = 0; i < this.details_data.length; i++) {
      if (this.details_data[i].eventId == this.currentId) {
        index = i;
        this.eventExists = true;
        break;

      }
    }

    if (this.eventExists) {
      this.details_data[index] = this.p[0];
      this.eventExists = false;
    }
    else {
      // this.events[index].title = this.p[0].subject_name + " " + this.p[0].venue;
      this.details_data.push(this.p[0]);

    }
    this.p[0] = {
      eventId: 0,
      subject_name: "",
      subject_code: 0,
      venue: "",
      facultyName: "",
      subFacultyName: "",
      start: "",
      end: ""
    }

    this.selectedEvent[0] = {
      eventId: 0,
      subject_name: "",
      subject_code: 0,
      venue: "",
      facultyName: "",
      subFacultyName: "",
      start: "",
      end: ""
    }

    this.modal.dismissAll();
    console.log(this.details_data);


  }

  onChangeDetails($event) {
    debugger;
    console.log($event.target.name);
    console.log($event.target.value);

    this.p[0][$event.target.name] = $event.target.value;

    // if ($event.target.name === "venue") {
    //   this.p[0].venue = $event.target.value;
    // }

    // else if ($event.target.name === "subject_name") {
    //   this.p[0].subject_name = $event.target.value;
    // }
    // else if ($event.target.name === "subject_code") {
    //   this.p[0].subject_code = $event.target.value;
    // }
    // else if ($event.target.name === "facultyName") {
    //   this.p[0].facultyName = $event.target.value;
    // }
    // else if ($event.target.name === "subFacultyName") {
    //   this.p[0].subFacultyName = $event.target.value;
    // }
    // else if ($event.target.name === "start") {
    //   this.p[0].start = $event.target.value;
    // }
    // else if ($event.target.name === "end") {
    //   this.p[0].end = $event.target.value;
    // }

    // console.log(this.details_data);

  }

  private refresh() {
    this.events = [...this.events];
    this.cdr.detectChanges();
  }

}
