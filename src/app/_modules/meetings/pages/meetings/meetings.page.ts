import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Meeting } from 'src/app/_models';
import { AddMeetingComponent } from '../../components/add-meeting/add-meeting.component';
import { MeetingDataSource } from 'src/app/_types';

import { select, Store } from '@ngrx/store';
import * as fromMeetings from '../../_store/meetings.reducers';
import * as meetingsActions from '../../_store/meetings.actions';
import * as meetingsSelectors from '../../_store/meetings.selectors';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.page.html',
  styleUrls: ['./meetings.page.scss'],
})
export class MeetingsPage implements OnInit {
  constructor(
    private store: Store<fromMeetings.MeetingsState>,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  meetingsList$: Observable<MeetingDataSource[]>;
  columnDef = ['name', 'phoneNumber', 'date', 'address'];

  dateRange: FormGroup;

  GroupByOptions = GroupByOptions;
  groupBy: GroupByOptions = this.GroupByOptions.DEFAULT;
  get optionskeys() {
    return Object.keys(this.GroupByOptions);
  }

  ngOnInit(): void {
    this.initDateRange();
    this.meetingsList$ = this.store.pipe(select(fromMeetings.getMeetingsList));
  }

  addPerson() {
    const dialogRef = this.dialog.open(AddMeetingComponent, {
      width: '450px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe((meeting: Meeting) => {
      meeting &&
        this.store.dispatch(meetingsActions.addMeetingEvent({ meeting }));
    });
  }

  filterByDate() {
    const { startingDate, endingDate } = this.dateRange.value;
    this.meetingsList$ = this.store.pipe(
      select(meetingsSelectors.getMeetingListByDateRange, {
        startingDate,
        endingDate,
      })
    );
  }

  clearFilter() {
    this.meetingsList$ = this.store.pipe(select(fromMeetings.getMeetingsList));
    this.dateRange.reset();
  }

  group({ value }) {
    this.groupBy = this.GroupByOptions[value];

    switch (this.groupBy) {
      case this.GroupByOptions.DATE:
        this.columnDef = ['dateGroup', 'count', 'meetings'];
        this.meetingsList$ = this.store.pipe(
          select(meetingsSelectors.getGroupedByDate)
        );
        break;
      case this.GroupByOptions.PERSON:
        this.columnDef = ['person', 'countDates', 'meetingsByPerson'];
        this.meetingsList$ = this.store.pipe(
          select(meetingsSelectors.getGroupedByPerson)
        );
        break;
      default:
        this.columnDef = ['name', 'phoneNumber', 'date', 'address'];
        this.meetingsList$ = this.store.pipe(
          select(fromMeetings.getMeetingsList)
        );
    }
  }

  initDateRange() {
    this.dateRange = this.fb.group({
      startingDate: ['', Validators.required],
      endingDate: ['', Validators.required],
    });
  }
}

export enum GroupByOptions {
  DEFAULT = 'DEFAULT',
  PERSON = 'PERSON',
  DATE = 'DATE',
}
