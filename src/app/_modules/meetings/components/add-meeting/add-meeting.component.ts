import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fromEvent, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  mergeMap,
  pluck,
  take,
} from 'rxjs/operators';

import { MatDialogRef } from '@angular/material/dialog';

import { select, Store } from '@ngrx/store';
import * as fromMeetings from '../../_store/meetings.reducers';
import * as meetingsSelectors from '../../_store/meetings.selectors';

import { Person } from 'src/app/_models';
import { GeoCodingService } from 'src/app/_services/geo-coding.service';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.scss'],
})
export class AddMeetingComponent implements OnInit, AfterViewInit {
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddMeetingComponent>,
    private store: Store<fromMeetings.MeetingsState>,
    private geoCodingService: GeoCodingService
  ) {}

  @ViewChild('username', { static: false }) usernameInput: ElementRef;

  personSuggestions$: Observable<Person[]>;

  meetingForm: FormGroup;
  get meetingformControls() {
    return this.meetingForm.controls;
  }

  ngOnInit(): void {
    this.initMeetingForm();
  }

  ngAfterViewInit() {
    this.personSuggestions$ = fromEvent(
      this.usernameInput.nativeElement,
      'keyup'
    ).pipe(
      pluck('target', 'value'),
      filter((keyword: string) => keyword.length > 2),
      debounceTime(0),
      distinctUntilChanged(),
      mergeMap((query) =>
        this.store.pipe(
          select(meetingsSelectors.getPersonSuggestions, { query })
        )
      )
    );
  }

  fillOtherFields(person) {
    this.meetingformControls.person.patchValue(person);
  }

  initMeetingForm() {
    this.meetingForm = this.fb.group({
      person: this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        phoneNumber: ['', Validators.pattern('[0-9]*')],
      }),
      date: ['', [Validators.required]],
      address: ['', Validators.required],
    });
  }

  locateMe() {
    this.geoCodingService
      .getCurrentPosition()
      .pipe(take(1))
      .subscribe((address) => {
        this.meetingformControls.address.setValue(address);
      });
  }

  save() {
    this.meetingForm.valid && this.dialogRef.close(this.meetingForm.value);
  }
}
