angular.module('shortly', [
  'shortly.services',
  'shortly.links',
  'shortly.shorten',
  'shortly.auth',
  'ngRoute'
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    // Your code here

    .when('/links', {
      templateUrl: 'app/links/links.html',
      controller: 'LinksController',
      authenticate: true
    })
    .when('/shorten', {
      templateUrl: 'app/shorten/shorten.html',
      controller: 'ShortenController',
      authenticate: true
    })
    .otherwise({
      redirectTo: '/links'
    });

  $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.shortly');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});
