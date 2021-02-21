import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MeetingDataSource } from 'src/app/_types';

@Component({
  selector: 'app-meetings-list',
  templateUrl: './meetings-list.component.html',
  styleUrls: ['./meetings-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingsListComponent implements OnChanges {
  constructor() {}

  @Input() meetingsList: MeetingDataSource[] = [];
  @Input() hideHeader = false; // hide headers for nested tables

  @Input() columnDef: string[] = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<MeetingDataSource>;

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.meetingsList);
    this.dataSource.sort = this.sort;
  }
}
