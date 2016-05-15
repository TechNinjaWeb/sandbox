var paths = require('./paths');

module.exports = {
    angular: {
        path: paths.node + 'angular/angular.js',
        exports: 'angular',
        depends: ['jquery']
    },
    'angular-route': {
        path: paths.node + 'angular-ui-router/release/angular-ui-router.js',
        exports: 'ui.router',
        depends: ['angular']
    },
    'angular-resource': {
        path: paths.node + 'angular-resource/release/angular-resource.js',
        exports: 'ngResource',
        depends: ['angular']
    },
    jquery: {
        path: paths.node + 'jquery/dist/jquery.js',
        exports: ['jQuery', '$']
    },
    toastr: {
        path: paths.node + 'toastr/toastr.js',
        exports: 'toastr'
    }
}