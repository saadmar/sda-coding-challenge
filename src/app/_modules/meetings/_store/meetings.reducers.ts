import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as meetingsActions from './meetings.actions';

import { Meeting } from 'src/app/_models/meeting.model';

export interface MeetingsState {
  meetings: Meeting[];
}
export const initialState: MeetingsState = {
  meetings: [],
};

export const getState = createFeatureSelector('meetings');

export const getMeetingsList = createSelector(
  getState,
  (state: MeetingsState) => state.meetings
);

export const getMeetingListByDateRange = createSelector(
  getMeetingsList,
  (meetingsList: Meeting[], { startingDate, endingDate }) =>
    meetingsList.filter((meeting) => {
      const date = new Date(meeting.date).getTime();
      return (
        date >= new Date(startingDate).getTime() &&
        date <= new Date(endingDate).getTime()
      );
    })
);

const _meetingsReducer = createReducer(
  initialState,
  on(meetingsActions.loadState, (state, { initState }) => initState),
  on(meetingsActions.addMeetingEvent, (state, { meeting }) => ({
    ...state,
    meetings: [...state.meetings, meeting],
  }))
);

export const meetingFeatureKey = 'meetings';
export function meetingsReducer(state, action) {
  return _meetingsReducer(state, action);
}
