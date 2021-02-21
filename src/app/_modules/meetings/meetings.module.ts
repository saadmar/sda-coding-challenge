import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';

import { MeetingsPage } from './pages/meetings/meetings.page';
import { MeetingsRoutingModule } from './meetings-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { MeetingsListComponent } from './components/meetings-list/meetings-list.component';
import { AddMeetingComponent } from './components/add-meeting/add-meeting.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [MeetingsPage, MeetingsListComponent, AddMeetingComponent],
  imports: [
    CommonModule,
    MeetingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    /* Material modules */
    MatTableModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
  ],
})
export class MeetingsModule {}
