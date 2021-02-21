import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GeoCodingService {
  constructor() {
    this.geoCoder = new google.maps.Geocoder();
  }
  private geoCoder: google.maps.Geocoder;

  private geoCodeSubject = new BehaviorSubject<string>('');

  /**
   * Returns the current location as a string.
   * This is used to abstract location retrival logic so other developers won't
   * have to work with callbacks, as we transformed it to an Observable
   * @returns {Observable<string>} location
   */
  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { longitude, latitude } = coords;
      this.geoCoder.geocode(
        {
          location: {
            lat: +latitude,
            lng: longitude,
          },
        },
        (results, status) =>
          status === google.maps.GeocoderStatus.OK &&
          results &&
          results[0] &&
          this.geoCodeSubject.next(results[0].formatted_address)
      );
    });
    // we return this Observable to avoid working with callbacks in our components
    return (
      this.geoCodeSubject
        .asObservable()
        // omit the empty string
        .pipe(filter((address) => address.length > 0))
    );
  }
}
