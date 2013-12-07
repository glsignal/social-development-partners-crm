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
  $routeProvider.when('/organisations', {templateUrl: 'partials/members.html', controller: 'organisationList'});
  $routeProvider.when('/contacts', {templateUrl: 'partials/contacts.html', controller: 'contactList'});
  $routeProvider.when('/contact/:id', {templateUrl: 'partials/contact.html', controller: 'singleOrganisation'});
  $routeProvider.when('/organisation/:id', {templateUrl: 'partials/member.html', controller: 'singleMember'});
  $routeProvider.otherwise({redirectTo: '/organisations'});
}]);

