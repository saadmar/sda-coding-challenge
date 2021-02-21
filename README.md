# SdaCodingChallenge

This app is developed with Angular v11, using Angular Material and NGRX, and Google maps apis for geoLocation.
Normally all the features required (including the optionals) are included.

Please note that there is no api calls here, everything is managed within the state, witch is persisted between refreshs.

In this exemple two entities with minimum required attributes are used, the Meeting entity and Person Entity.

## Development server

Run `npm run start` for a dev server and it will automatically lunch the app on your browser

## Test

The app is also hosted on an s3 bucket as a static website in case you want to try it, on http://sda-challenge.s3-website-us-east-1.amazonaws.com/

Please note that, since there is no sertificate on the domain, the geo location feature will not work, as it requires a secure origin. So if you want you can run it locally to test this feature.
