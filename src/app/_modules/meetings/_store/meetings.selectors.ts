import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MeetingsState } from './meetings.reducers';

import { Meeting, Person } from 'src/app/_models';
import { groupedByDate, groupedByPerson } from 'src/app/_types';

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

export const getGroupedByPerson = createSelector(
  getMeetingsList,
  (meetingsList: Meeting[]): groupedByPerson[] => {
    return Object.values(
      meetingsList.reduce((group, meeting) => {
        // we suppose here that phone number is unique and use it instad of theid
        group[meeting.person.phoneNumber] = group[meeting.person.phoneNumber]
          ? {
              person: meeting.person,
              meetings: [
                ...group[meeting.person.phoneNumber].meetings,
                meeting,
              ],
            }
          : { person: meeting.person, meetings: [meeting] };
        return group;
      }, {})
    );
  }
);

export const getGroupedByDate = createSelector(
  getMeetingsList,
  (meetingsList: Meeting[]): groupedByDate[] => {
    return Object.values(
      meetingsList.reduce((group, meeting) => {
        // we suppose here that phone number is unique and use it instad of theid
        const date = new Date(meeting.date).getTime();
        group[date] = group[date]
          ? {
              date: meeting.date,
              meetings: [...group[date].meetings, meeting],
            }
          : { date: meeting.date, meetings: [meeting] };
        return group;
      }, {})
    );
  }
);

export const getPersonList = createSelector(
  getMeetingsList,
  (meetingsList: Meeting[]) => meetingsList.map((meeting) => meeting.person)
);

export const getPersonSuggestions = createSelector(
  getPersonList,
  (personList: Person[], { query }) =>
    personList.filter((person) => person.firstname.includes(query))
);
