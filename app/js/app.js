'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'firebase',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'listMembers'});
  $routeProvider.when('/view2/:id', {templateUrl: 'partials/contact.html', controller: 'singleContact'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

