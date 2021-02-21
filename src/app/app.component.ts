import { Component, HostListener } from '@angular/core';

import { select, Store } from '@ngrx/store';
import * as fromMeetings from './_modules/meetings/_store/meetings.reducers';
import * as meetingsActions from './_modules/meetings/_store/meetings.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sda-coding-challenge';

  private _stateKey = '_appState';
  constructor(private store: Store<fromMeetings.MeetingsState>) {
    // realode the state at app statup
    const initState = JSON.parse(
      localStorage.getItem(this._stateKey)
    ) as fromMeetings.MeetingsState;
    initState && this.store.dispatch(meetingsActions.loadState({ initState }));
  }

  @HostListener('window:beforeunload') // save the state before refresh
  saveState() {
    this.store.pipe(select(fromMeetings.getState)).subscribe((state) => {
      localStorage.setItem(this._stateKey, JSON.stringify(state));
    });
  }
}
