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
  cobalt: {
    api: 'https://apigateway.cobaltintelligence.com/v1/search',
    key: 'dGAKgkYegi8XgrqJSnAZgNmMwmT6rZqXzAF96C10'
  },
  stripe: 'pk_test_51MNOFpLE6JgchawPahk5ehVPkjixlIMajhDW7e1HDfcl1K88BktfF4OnIjIzWY6iWFp3YETpSp3coAWZhycebSIH00t5cxZkGr',
  google: {
    api: 'https://maps.googleapis.com/maps/api/',
    key: 'AIzaSyApXEkj7l2hEM4oo_59v-kpTEZI8jg03SE'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
