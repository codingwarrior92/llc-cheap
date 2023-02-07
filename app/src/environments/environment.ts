// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'llc-cheap',
    appId: '1:561277295382:web:81091d50c8ebd37cc6ce37',
    storageBucket: 'llc-cheap.appspot.com',
    apiKey: 'AIzaSyDEFJj06w8xsN_VonyXvCywRI7H2YdVGrM',
    authDomain: 'llc-cheap.firebaseapp.com',
    messagingSenderId: '561277295382',
    measurementId: 'G-0GFLNFTX74',
  },
  production: false,
  stripe: 'pk_test_51MNOFpLE6JgchawPahk5ehVPkjixlIMajhDW7e1HDfcl1K88BktfF4OnIjIzWY6iWFp3YETpSp3coAWZhycebSIH00t5cxZkGr',
  google: {
    api: 'https://maps.googleapis.com/maps/api/',
    key: 'AIzaSyDEFJj06w8xsN_VonyXvCywRI7H2YdVGrM'
  },
  legalinc: {
    secret: 'MvfgueLiOycMcp',
    api: 'https://orders-uat.legalinc.com/api/v2/'
  },
  localApi: 'http://127.0.0.1:5001/llc-cheap/us-central1/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
