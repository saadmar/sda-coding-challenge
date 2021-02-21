import { createAction, props } from '@ngrx/store';
import * as fromMeetings from './meetings.reducers';
import { Meeting } from 'src/app/_models/meeting.model';

export const loadState = createAction(
  '[App component] load State',
  props<{ initState: fromMeetings.MeetingsState }>()
);

export const addMeetingEvent = createAction(
  '[Meetings Page] Add Meting Event',
  props<{ meeting: Meeting }>()
);
