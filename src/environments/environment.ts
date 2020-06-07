// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: 'AIzaSyA3WLabwpZmiGa0G6cXud22Qs8cJEJH51Q',
    authDomain: 'taxi-hospital.firebaseapp.com',
    databaseURL: 'https://taxi-hospital.firebaseio.com',
    projectId: 'taxi-hospital',
    storageBucket: 'taxi-hospital.appspot.com',
    appId: '1:843057200927:web:f59aa6f93541270c947a2a'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
